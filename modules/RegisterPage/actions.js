import { JA_CALL_API } from '../../middleware/ja-api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

function postRegisterForm(formData) {
  return {
    [JA_CALL_API]: {
      types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE],
      endpoint: `auth/signup`,
      requestMethod: 'POST',
      requestData: formData
    }
  };
}

export function submitRegisterForm(formData){
  return (dispatch, getState) => {
    return dispatch(postRegisterForm(formData));
  };
}
