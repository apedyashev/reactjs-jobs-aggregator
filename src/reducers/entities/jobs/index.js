import {actionTypes} from 'actions/job';

const initialState = {};

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case actionTypes.jobs.fetch.SUCCESS:
      return {...state, ...action.response.entities.jobs};
    default:
      return state;
  }
}
