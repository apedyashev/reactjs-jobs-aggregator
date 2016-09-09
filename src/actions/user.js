import {createRequestTypes, action} from 'helpers/actions';

// TODO: must be actionTypes = {fetch: createRequestTypes('GET_USER')}
export const actionTypes = {
  loggedUser: {
    fetch: createRequestTypes('USER/FETCH'),
    update: createRequestTypes('USER/UPDATE'),
  },
};
export const LOAD_LOGGED_USER = 'LOAD_LOGGED_USER';
export const UPDATE_LOGGED_USER = 'UPDATE_LOGGED_USER';

export const actionCreators = {
  loggedUser: {
    fetch: {
      request: () => action(actionTypes.loggedUser.fetch.REQUEST, {}),
      success: (id, response) => action(actionTypes.loggedUser.fetch.SUCCESS, {response}),
      failure: (id, error) => action(actionTypes.loggedUser.fetch.FAILURE, {error}),
    },
    update: {
      request: () => action(actionTypes.loggedUser.update.REQUEST, {}),
      success: (id, response) => action(actionTypes.loggedUser.update.SUCCESS, {response}),
      failure: (id, error) => action(actionTypes.loggedUser.update.FAILURE, {error}),
    },
  },
};

export const loadLoggedUser = () => {
  return action(LOAD_LOGGED_USER);
};

export const updateLoggedUser = (data) => {
  return action(UPDATE_LOGGED_USER, {data});
};
