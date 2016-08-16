import {normalize} from 'normalizr';
import {camelizeKeys} from 'humps';
import 'whatwg-fetch';

const API_ROOT = 'https://api.github.com/';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export default function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then((response) => {
      return response.json().then((json) => {
        return {json, response};
      });
    }).then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);
      return Promise.resolve({...normalize(camelizedJson, schema)});
    })
    .then(
      (response) => {
        return {response};
      },
      (error) => {
        console.error('callApi error', error);
        return {error: error.message || 'Something bad happened'};
      }
    );
}
