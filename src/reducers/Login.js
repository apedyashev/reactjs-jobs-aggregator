import {actionTypes as loginActionTypes} from 'actions/Login';
import {actionTypes as userActionTypes} from 'actions/User';

const initialState = {
  requested: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case loginActionTypes.FAILURE:
      return {
        ...state,
        requested: true,
      };
    case loginActionTypes.SUCCESS:
    case userActionTypes.SUCCESS:
      return {
        ...state,
        userId: action.response.result,
        requested: true,
      };

    default:
      return state;
  }
}
