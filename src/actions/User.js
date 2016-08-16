import {createRequestTypes, action} from 'helpers/actions';

export const userActionTypes = createRequestTypes('USER');
export const LOAD_USER_PAGE = 'LOAD_USER_PAGE';

export const user = {
  request: (login) => {
    return action(userActionTypes.REQUEST, {login});
  },
  success: (login, response) => {
    return action(userActionTypes.SUCCESS, {login, response});
  },
  failure: (login, error) => {
    return action(userActionTypes.FAILURE, {login, error});
  },
};

export const loadUserPage = (login, requiredFields = []) => {
  return action(LOAD_USER_PAGE, {login, requiredFields});
};
