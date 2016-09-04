import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = createRequestTypes('LOGIN');
export const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM';

export const login = {
  request: (fields) => {
    return action(actionTypes.REQUEST, {fields});
  },
  success: (fields, response) => {
    return action(actionTypes.SUCCESS, {fields, response});
  },
  failure: (fields, error, statusCode) => {
    return action(actionTypes.FAILURE, {fields, error, statusCode});
  },
};

export const submitLogin = (email, password) => {
  return action(SUBMIT_LOGIN_FORM, {email, password});
};
