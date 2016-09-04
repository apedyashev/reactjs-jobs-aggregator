import {createRequestTypes, action} from 'helpers/actions';

// TODO: must be actionTypes = {fetch: createRequestTypes('GET_USER')}
export const actionTypes = {
  loggedUser: {
    fetch: createRequestTypes('USER'),
  },
};
export const LOAD_LOGGED_USER = 'LOAD_LOGGED_USER';

export const actionCreators = {
  loggedUser: {
    fetch: {
      request: () => action(actionTypes.loggedUser.fetch.REQUEST, {}),
      success: (id, response) => action(actionTypes.loggedUser.fetch.SUCCESS, {response}),
      failure: (id, error) => action(actionTypes.loggedUser.fetch.FAILURE, {error}),
    },
  },
};

export const loadLoggedUser = () => {
  return action(LOAD_LOGGED_USER);
};
