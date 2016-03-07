import 'isomorphic-fetch';
import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { pushState } from 'redux-router';
import {$} from 'zepto-browserify';
// window.$ = $;
const API_ROOT = 'http://ja.rrs-lab.com/api/';
const HTTP_STATUS_NOT_AUTHORIZED = 401;

//function serialize(params, obj, traditional, scope){
//  var type, array = $.isArray(obj);
//  obj.forEach( function(key, value) {
//    type = $.type(value)
//    if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']'
//    // handle data in serializeArray() format
//    if (!scope && array) params.add(value.name, value.value)
//    // recurse into nested objects
//    else if (type == "array" || (!traditional && type == "object"))
//      serialize(params, value, traditional, key)
//    else params.add(key, value)
//  })
//}
//
//function param(obj, traditional){
//  var params = []
//  params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
//  serialize(params, obj, traditional)
//  return params.join('&').replace(/%20/g, '+')
//}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callJaApi(endpoint, jsonRoot, method = 'GET', data) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  let fetchOptions = {
    credentials: 'include'
  };
  if (method.toUpperCase() != 'GET') {
    fetchOptions.method = method;
  }
  if (data && Object.keys(data).length) {
    fetchOptions.body = $.param(data);
    fetchOptions.headers = {
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    };
  }
  return fetch(fullUrl, fetchOptions).then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject({json, statusCode: response.status});
      }

      const camelizedJson = camelizeKeys(json);
      let transformedResponse = {};
      if (jsonRoot) {
        transformedResponse[jsonRoot] = camelizedJson;
      }
      else {
        transformedResponse = camelizedJson;
      }
      return Promise.resolve({json: transformedResponse});
    });
}


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
  const { requestMethod, types, requestData, jsonRoot } = callJaApiSymbol;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  
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

  return callJaApi(endpoint, jsonRoot, requestMethod || 'GET', requestData).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    (data) => {
      console.debug(data.statusCode);
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
