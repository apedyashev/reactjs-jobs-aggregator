import {actionTypes} from 'actions/job';

const initialState = {};

export default function subscriptionJobs(state = initialState, action) {
  switch (action.type) {
    case actionTypes.jobs.fetch.SUCCESS:
      if (action.subscriptionId) {
        return {
          ...state,
          [action.subscriptionId]: action.response.result,
        };
      }
      return state;
    default:
      return state;
  }
}
