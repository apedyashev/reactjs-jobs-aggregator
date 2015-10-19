import { JA_CALL_API, JaSchemas } from '../../../middleware/ja-api';

export const JOB_REQUEST = 'JOB_REQUEST';
export const JOB_SUCCESS = 'JOB_SUCCESS';
export const JOB_FAILURE = 'JOB_FAILURE';

function fetchJobs() {
  return {
    [JA_CALL_API]: {
      types: [JOB_REQUEST, JOB_SUCCESS, JOB_FAILURE],
      endpoint: `jobs`,
      jsonRoot: 'jobs'
    }
  };
}
export function loadJobs(){
  return (dispatch, getState) => {
    return dispatch(fetchJobs());
  };
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function logout() {
  return {
    [JA_CALL_API]: {
      types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
      endpoint: `auth`,
      requestMethod: 'DELETE'
    }
  };
}
export function sendLogout(){
  return (dispatch, getState) => {
    return dispatch(logout());
  };
}
