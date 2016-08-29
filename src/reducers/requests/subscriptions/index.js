import {actionTypes} from 'actions/Subscription';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.fetch.REQUEST:
      return {...state, isLoading: true};

    case actionTypes.fetch.SUCCESS:
    case actionTypes.fetch.FAILURE:
      return {...state, isLoading: false};

    case actionTypes.remove.REQUEST:
      return {...state, removingId: action.id};

    case actionTypes.remove.SUCCESS:
    case actionTypes.remove.FAILURE:
      return {...state, removingId: null};

    default:
      return state;
  }
}
