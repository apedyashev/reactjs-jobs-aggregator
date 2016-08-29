import {actionTypes} from 'actions/Job';

const initialState = {};

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case actionTypes.fetch.SUCCESS:
      return {...state, ...action.response.entities.jobs};
    default:
      return state;
  }
}
