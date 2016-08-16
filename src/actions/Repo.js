import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = createRequestTypes('STARRED_REPOS');

export const repo = {
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
