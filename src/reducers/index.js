import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './Login';
import requests from './requests';

function entities(state = {users: {}, repos: {}}, action) {
  if (action.response && action.response.entities) {
    return {
      ...state,
      ...action.response.entities,
    };
  }
  return state;
}

const rootReducer = combineReducers({
  entities,
  requests,
  auth,
  routing: routerReducer,
});

export default rootReducer;
