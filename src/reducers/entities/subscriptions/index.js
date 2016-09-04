import _ from 'lodash';
import {actionTypes} from 'actions/subscription';

const initialState = {};

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case actionTypes.subscriptions.fetch.SUCCESS:
    case actionTypes.subscription.create.SUCCESS:
    case actionTypes.subscription.update.SUCCESS:
      return {...state, ...action.response.entities.subscriptions};

    case actionTypes.subscription.remove.SUCCESS:
      return _.omit(state, action.id);

    default:
      return state;
  }
}
