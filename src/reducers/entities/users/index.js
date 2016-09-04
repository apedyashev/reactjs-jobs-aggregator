import {actionTypes} from 'actions/user';

const initialState = {};

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case actionTypes.loggedUser.fetch.SUCCESS:
      return {
        ...action.response.entities.users,
      };
    default:
      return state;
  }
}
