import 'isomorphic-fetch';
import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { pushState } from 'redux-router';

const API_ROOT = 'http://ja.rrs-lab.com/api/';
const HTTP_STATUS_NOT_AUTHORIZED = 401;

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callJaApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject({json, statusCode: response.status});
      }

      const camelizedJson = camelizeKeys(json);
      return Promise.resolve({
        entities:{
          jobs: camelizedJson
        }
      });
    });
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

const jobSchema = new Schema('jobs', {
  idAttribute: 'id'
});

export const JaSchemas = {
  JOB: jobSchema,
  JOB_ARRAY: arrayOf(jobSchema)
};

// Action key that carries API call info interpreted by this Redux middleware.
// ES6 Symbol https://github.com/lukehoban/es6features#symbols
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Symbol
export const JA_CALL_API = Symbol('JA Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callJaApiSymbol = action[JA_CALL_API];
  if (typeof callJaApiSymbol === 'undefined') {
    return next(action);
  }

  let { endpoint } = callJaApiSymbol;
  const { schema, types } = callJaApiSymbol;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.');
  // }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[JA_CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callJaApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    (data) => {
      if (data.statusCode == HTTP_STATUS_NOT_AUTHORIZED) {
        next(pushState(null, `/login`));
      }
      else {
        next(actionWith({
          type: failureType,
          error: data.json.message || 'Something bad happened'
        }))
      }
    }
  );
};
