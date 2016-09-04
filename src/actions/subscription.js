import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = {
  subscription: {
    update: createRequestTypes('UPDATE_SUBSCRIPTION'),
    create: createRequestTypes('CREATE_SUBSCRIPTION'),
    remove: createRequestTypes('REMOVE_SUBSCRIPTION'),
  },
  subscriptions: {
    fetch: createRequestTypes('SUBSCRIPTIONS'),
  },
};
// TODO: refactor - maybe put in actionTypes???
export const SAVE_SUBSCRIPTION = 'SAVE_SUBSCRIPTION';
export const REMOVE_SUBSCRIPTION = 'REMOVE_SUBSCRIPTION';
export const LOAD_EDIT_SUBSCRIPTION_PAGE = 'LOAD_EDIT_SUBSCRIPTION_PAGE';

export const actionCreators = {
  subscription: {
    save: {
      request: (id, data) => {
        if (id) {
          return action(actionTypes.subscription.update.REQUEST, {id, data});
        }
        return action(actionTypes.subscription.create.REQUEST, {data});
      },
      success: (id, response) => {
        if (id) {
          return action(actionTypes.subscription.update.SUCCESS, {id, response});
        }
        return action(actionTypes.subscription.create.SUCCESS, {response});
      },
      failure: (id, error) => {
        if (id) {
          return action(actionTypes.subscription.update.FAILURE, {id, error});
        }
        return action(actionTypes.subscription.create.FAILURE, {error});
      },
    },
    remove: {
      request: ({id}) => action(actionTypes.subscription.remove.REQUEST, {id}),
      success: ({id}, response) => action(actionTypes.subscription.remove.SUCCESS, {id, response}),
      failure: ({id}, error) => action(actionTypes.subscription.remove.FAILURE, {id, error}),
    },
  },
  subscriptions: {
    fetch: {
      request: () => action(actionTypes.subscriptions.fetch.REQUEST),
      success: (id, response) => action(actionTypes.subscriptions.fetch.SUCCESS, {response}),
      failure: (id, error) => action(actionTypes.subscriptions.fetch.FAILURE, {error}),
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
