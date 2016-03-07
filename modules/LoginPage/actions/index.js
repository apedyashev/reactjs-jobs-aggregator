import { JA_CALL_API } from '../../../middleware/ja-api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function postLoginForm(email, password) {
  return {
    [JA_CALL_API]: {
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      endpoint: `auth/signin`,
      requestMethod: 'POST',
      requestData: {email, password}
    }
  };
}

export function submitLoginForm(email, password){
  console.log('########postLoginForm');
  return (dispatch, getState) => {
    return dispatch(postLoginForm(email, password));
  };
}
