import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = {
  // getSubscription: createRequestTypes('SUBSCRIPTION'),
  subscriptions: createRequestTypes('SUBSCRIPTIONS'),
  updateSubscription: createRequestTypes('UPDATE_SUBSCRIPTION'),
  createSubscription: createRequestTypes('CREATE_SUBSCRIPTION'),
};
export const SAVE_SUBSCRIPTION = 'SAVE_SUBSCRIPTION';
export const LOAD_EDIT_SUBSCRIPTION_PAGE = 'LOAD_EDIT_SUBSCRIPTION_PAGE';

export const actionCreators = {
  subscriptions: {
    request: () => {
      return action(actionTypes.subscriptions.REQUEST);
    },
    success: (id, response) => {
      return action(actionTypes.subscriptions.SUCCESS, {response});
    },
    failure: (id, error) => {
      return action(actionTypes.subscriptions.FAILURE, {error});
    },
  },
  saveSubscription: {
    request: (id, data) => {
      if (id) {
        return action(actionTypes.updateSubscription.REQUEST, {id, data});
      }
      return action(actionTypes.createSubscription.REQUEST, {data});
    },
    success: (id, response) => {
      if (id) {
        return action(actionTypes.updateSubscription.SUCCESS, {id, response});
      }
      return action(actionTypes.createSubscription.SUCCESS, {response});
    },
    failure: (id, error) => {
      if (id) {
        return action(actionTypes.updateSubscription.FAILURE, {id, error});
      }
      return action(actionTypes.createSubscription.FAILURE, {error});
    },
  },
};

export const loadSubscriptionPage = (id) => {
  return action(LOAD_EDIT_SUBSCRIPTION_PAGE, {id});
};

export function saveSubscription(id, data) {
  return action(SAVE_SUBSCRIPTION, {id, data});
}
