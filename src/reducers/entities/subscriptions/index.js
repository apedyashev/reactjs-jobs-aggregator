import {actionTypes} from 'actions/Subscription';

const initialState = {};

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case actionTypes.fetch.SUCCESS:
      return {
        ...action.response.entities.subscriptions,
      };
    default:
      return state;
  }
}
