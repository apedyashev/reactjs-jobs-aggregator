import {actionTypes} from 'actions/subscription';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.subscriptions.fetch.REQUEST:
      return {...state, isLoading: true};

    case actionTypes.subscriptions.fetch.SUCCESS:
    case actionTypes.subscriptions.fetch.FAILURE:
      return {...state, isLoading: false};

    case actionTypes.subscription.remove.REQUEST:
      return {...state, removingId: action.id};

    case actionTypes.subscription.remove.SUCCESS:
    case actionTypes.subscription.remove.FAILURE:
      return {...state, removingId: null};

    default:
      return state;
  }
}
