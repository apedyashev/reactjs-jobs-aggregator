import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import * as job from 'actions/Job';
import auth from './Login';
import requests from './requests';

// TODO: refactoring required
function defaultEntitiesReducer(state, action) {
  if (action.response && action.response.entities) {
    return {
      ...state,
      ...action.response.entities,
    };
  }
  return state;
}
function entities(state = {users: {}}, action) {
  switch (action.type) {
    case job.actionTypes.getJobs.SUCCESS: {
      const newState = {
        ...defaultEntitiesReducer(state, action),
      };
      if (action.subscriptionId) {
        newState.subscriptionJobs = {
          ...newState.subscriptionJobs,
          [action.subscriptionId]: action.response.result,
        };
      }
      return newState;
    }
    default:
      return defaultEntitiesReducer(state, action);
  }
}

const rootReducer = combineReducers({
  entities,
  requests,
  auth,
  routing: routerReducer,
});

export default rootReducer;
