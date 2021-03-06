import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './Login';
import requests from './requests';

import entities from './entities';

// TODO: refactoring required
// function defaultEntitiesReducer(state, action) {
//   if (action.response && action.response.entities) {
//     return {
//       ...state,
//       ...action.response.entities,
//     };
//   }
//   return state;
// }
// function entities(state = {users: {}}, action) {
//   switch (action.type) {
//     case job.actionTypes.getJobs.SUCCESS: {
//       const newState = {
//         ...state,
//         jobs: {
//           ...state.jobs,
//           ...action.response.entities.jobs,
//         },
//       };
//       if (action.subscriptionId) {
//         newState.subscriptionJobs = {
//           ...newState.subscriptionJobs,
//           [action.subscriptionId]: action.response.result,
//         };
//       }
//       return newState;
//     }
//     default:
//       return defaultEntitiesReducer(state, action);
//   }
// }

const rootReducer = combineReducers({
  entities,
  requests,
  auth,
  routing: routerReducer,
});

export default rootReducer;
