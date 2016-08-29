import _ from 'lodash';
import {actionTypes} from 'actions/Subscription';

const initialState = {};

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case actionTypes.fetch.SUCCESS:
    case actionTypes.create.SUCCESS:
    case actionTypes.update.SUCCESS:
      return {...state, ...action.response.entities.subscriptions};

    case actionTypes.remove.SUCCESS:
      return _.omit(state, action.id);

    default:
      return state;
  }
}
