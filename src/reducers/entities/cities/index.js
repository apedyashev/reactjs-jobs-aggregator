import {actionTypes} from 'actions/city';

const initialState = {};

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case actionTypes.cities.fetch.SUCCESS:
      return {...state, ...action.response.entities.cities};
    default:
      return state;
  }
}
