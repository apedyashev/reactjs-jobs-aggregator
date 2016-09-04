import {actionTypes as loginActionTypes} from 'actions/login';
import {actionTypes as userActionTypes} from 'actions/user';

const initialState = {
  requested: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case loginActionTypes.login.post.FAILURE:
      return {
        ...state,
        requested: true,
      };
    case loginActionTypes.login.post.SUCCESS:
    case userActionTypes.loggedUser.fetch.SUCCESS:
      return {
        ...state,
        userId: action.response.result,
        requested: true,
      };

    default:
      return state;
  }
}
