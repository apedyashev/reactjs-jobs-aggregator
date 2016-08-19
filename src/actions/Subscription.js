import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = createRequestTypes('SUBSCRIPTIONS');

export const subscription = {
  request: () => {
    return action(actionTypes.REQUEST);
  },
  success: (id, response) => {
    return action(actionTypes.SUCCESS, {response});
  },
  failure: (id, error) => {
    return action(actionTypes.FAILURE, {error});
  },
};
