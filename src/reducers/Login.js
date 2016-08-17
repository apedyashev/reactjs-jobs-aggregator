import {actionTypes} from 'actions/Login';

export default function auth(state = null, action) {
  if (action.type === actionTypes.SUCCESS) {
    return {
      ...state,
      userId: action.response.result,
    };
  }

  return state;
}
