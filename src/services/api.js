import {normalize} from 'normalizr';
import {camelizeKeys} from 'humps';
import 'whatwg-fetch';

const API_ROOT = 'http://ja.rrs-lab.com/';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export default function callApi(endpoint, schema, options = {method: 'GET'}) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  const fetchOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
    method: options.method.toUpperCase(),
    body: JSON.stringify(options.data),
  };

  return fetch(fullUrl, fetchOptions)
    .then((response) => {
      return response.json().then((json) => {
        return {json, response};
      });
    }).then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject({json, statusCode: response.status});
      }

      const camelizedJson = camelizeKeys(json);
      return Promise.resolve(camelizedJson ? {...normalize(camelizedJson, schema)} : {});
    })
    .then(
      (response) => {
        return {response};
      },
      (error) => {
        console.error('callApi error', error);
        return {
          statusCode: error.statusCode,
          error: error.json.message || 'Something bad happened',
        };
      }
    );
}
