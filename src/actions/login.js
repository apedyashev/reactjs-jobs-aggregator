import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = {
  login: {
    post: createRequestTypes('LOGIN'),
  },
  signOut: {
    delete: createRequestTypes('AUTH/SIGNOUT'),
  },
};
export const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM';
export const SUBMIT_SIGN_OUT = 'SUBMIT_SIGN_OUT';

export const actionCreators = {
  login: {
    post: {
      request: (fields) => action(actionTypes.login.post.REQUEST, {fields}),
      success: (fields, response) => action(actionTypes.login.post.SUCCESS, {fields, response}),
      failure: (fields, error, statusCode) => action(actionTypes.login.post.FAILURE, {fields, error, statusCode}),
    },
  },
  signOut: {
    delete: {
      request: () => action(actionTypes.signOut.delete.REQUEST, {}),
      success: (fields, response) => action(actionTypes.signOut.delete.SUCCESS, {response}),
      failure: (fields, error, statusCode) => action(actionTypes.signOut.delete.FAILURE, {error, statusCode}),
    },
  },
};

export const submitLogin = (email, password) => {
  return action(SUBMIT_LOGIN_FORM, {email, password});
};

export const submitSignOut = () => {
  return action(SUBMIT_SIGN_OUT);
};
