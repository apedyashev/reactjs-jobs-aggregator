import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = createRequestTypes('USER');
export const LOAD_USER_PAGE = 'LOAD_USER_PAGE';

export const user = {
  request: (login) => {
    return action(actionTypes.REQUEST, {login});
  },
  success: (login, response) => {
    return action(actionTypes.SUCCESS, {login, response});
  },
  failure: (login, error) => {
    return action(actionTypes.FAILURE, {login, error});
  },
};

export const loadUserPage = (login, requiredFields = []) => {
  return action(LOAD_USER_PAGE, {login, requiredFields});
};
