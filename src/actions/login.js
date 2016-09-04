import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = {
  login: {
    post: createRequestTypes('LOGIN'),
  },
};
export const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM';

export const actionCreators = {
  login: {
    post: {
      request: (fields) => action(actionTypes.login.post.REQUEST, {fields}),
      success: (fields, response) => action(actionTypes.login.post.SUCCESS, {fields, response}),
      failure: (fields, error, statusCode) => action(actionTypes.login.post.FAILURE, {fields, error, statusCode}),
    },
  },
};

export const submitLogin = (email, password) => {
  return action(SUBMIT_LOGIN_FORM, {email, password});
};
