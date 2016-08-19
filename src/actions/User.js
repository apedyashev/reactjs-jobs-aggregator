import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = createRequestTypes('USER');
export const LOAD_LOGGED_USER = 'LOAD_LOGGED_USER';

export const user = {
  request: () => {
    return action(actionTypes.REQUEST, {});
  },
  success: (id, response) => {
    return action(actionTypes.SUCCESS, {response});
  },
  failure: (error) => {
    return action(actionTypes.FAILURE, {error});
  },
};

export const loadLoggedUser = () => {
  return action(LOAD_LOGGED_USER);
};
