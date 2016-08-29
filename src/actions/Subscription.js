import {createRequestTypes, action} from 'helpers/actions';

// TODO: async actions?
export const actionTypes = {
  // getSubscription: createRequestTypes('SUBSCRIPTION'),
  fetch: createRequestTypes('SUBSCRIPTIONS'),
  update: createRequestTypes('UPDATE_SUBSCRIPTION'),
  create: createRequestTypes('CREATE_SUBSCRIPTION'),
  remove: createRequestTypes('REMOVE_SUBSCRIPTION'),
};
// TODO: refactor
export const SAVE_SUBSCRIPTION = 'SAVE_SUBSCRIPTION';
export const REMOVE_SUBSCRIPTION = 'REMOVE_SUBSCRIPTION';
export const LOAD_EDIT_SUBSCRIPTION_PAGE = 'LOAD_EDIT_SUBSCRIPTION_PAGE';

export const actionCreators = {
  fetch: {
    request: () => action(actionTypes.fetch.REQUEST),
    success: (id, response) => action(actionTypes.fetch.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.fetch.FAILURE, {error}),
  },
  remove: {
    request: () => action(actionTypes.remove.REQUEST),
    success: (id, response) => action(actionTypes.remove.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.remove.FAILURE, {error}),
  },
  save: {
    request: (id, data) => {
      if (id) {
        return action(actionTypes.update.REQUEST, {id, data});
      }
      return action(actionTypes.create.REQUEST, {data});
    },
    success: (id, response) => {
      if (id) {
        return action(actionTypes.update.SUCCESS, {id, response});
      }
      return action(actionTypes.create.SUCCESS, {response});
    },
    failure: (id, error) => {
      if (id) {
        return action(actionTypes.update.FAILURE, {id, error});
      }
      return action(actionTypes.create.FAILURE, {error});
    },
  },
};

export const loadSubscriptionPage = (id) => {
  return action(LOAD_EDIT_SUBSCRIPTION_PAGE, {id});
};

export function saveSubscription(id, data) {
  return action(SAVE_SUBSCRIPTION, {id, data});
}

export function removeSubscription(id) {
  return action(REMOVE_SUBSCRIPTION, {id});
}
