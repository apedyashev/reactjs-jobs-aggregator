import * as ActionTypes from '../modules/Core/actions';
import merge from 'lodash/object/merge';
import paginate from './paginate';
//import {loginReducer} from './Login.js';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {} }, action) {
  if (action.response && action.response.json) {
    return merge({}, state, action.response.json);
  }

  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

// Updates the pagination data for different actions.
//const pagination = combineReducers({
//  starredByUser: paginate({
//    mapActionToKey: action => action.login,
//    types: [
//      ActionTypes.STARRED_REQUEST,
//      ActionTypes.STARRED_SUCCESS,
//      ActionTypes.STARRED_FAILURE
//    ]
//  }),
//  stargazersByRepo: paginate({
//    mapActionToKey: action => action.fullName,
//    types: [
//      ActionTypes.STARGAZERS_REQUEST,
//      ActionTypes.STARGAZERS_SUCCESS,
//      ActionTypes.STARGAZERS_FAILURE
//    ]
//  })
//});

// function loggedUser() {
//   return null;
// }


const rootReducer = combineReducers({
  entities,
  //pagination,
  errorMessage,
  routing: routerReducer,
  form: formReducer,
  //loginReducer
  // loggedUser
});

export default rootReducer;
