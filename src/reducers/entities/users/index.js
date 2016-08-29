import {actionTypes} from 'actions/User';

const initialState = {};

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SUCCESS:
      return {
        ...action.response.entities.users,
      };
    default:
      return state;
  }
}
