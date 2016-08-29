import {actionTypes} from 'actions/City';

const initialState = {};

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case actionTypes.fetch.SUCCESS:
      return {...state, ...action.response.entities.cities};
    default:
      return state;
  }
}
