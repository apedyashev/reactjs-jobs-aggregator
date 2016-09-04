import {call, take, fork} from 'redux-saga/effects';
import {
  actionCreators,
  SAVE_SUBSCRIPTION,
  LOAD_EDIT_SUBSCRIPTION_PAGE,
  REMOVE_SUBSCRIPTION,
} from 'actions/subscription';
import {Schema, arrayOf} from 'normalizr';
import callApi from 'services/api';
import {fetchEntity} from 'helpers/sagas';
import {loadCities} from './city';

const schemas = {
  subscription: new Schema('subscriptions'),
};
schemas.subscriptionsArray = arrayOf(schemas.subscription);

const api = {
  subscription: {
    save: fetchEntity.bind(null, actionCreators.subscription.save, ({id, data}) => {
      const endpoint = id ? `api/subscriptions/${id}` : '/api/subscriptions';
      const method = id ? 'PUT' : 'POST';
      return callApi(endpoint, schemas.subscription, {method, data});
    }),
    remove: fetchEntity.bind(null, actionCreators.subscription.remove, ({id}) => {
      const endpoint = `api/subscriptions/${id}`;
      const method = 'DELETE';
      return callApi(endpoint, schemas.subscription, {method});
    }),
  },
  subscriptions: {
    fetch: fetchEntity.bind(null, actionCreators.subscriptions.fetch, () => {
      return callApi('api/subscriptions', schemas.subscriptionsArray);
    }),
  },
};

export function* loadSubscriptions() {
  yield call(api.subscriptions.fetch);
}

export function* saveSubscription(id, data) {
  yield call(api.subscription.save, {id, data});
}

export function* removeSubscription(id) {
  yield call(api.subscription.remove, {id});
}

export function* watchSaveSubscription() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {id, data} = yield take(SAVE_SUBSCRIPTION);

    yield fork(saveSubscription, id, data);
  }
}

export function* watchRemoveSubscription() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {id} = yield take(REMOVE_SUBSCRIPTION);

    yield fork(removeSubscription, id);
  }
}

export function* watchLoadEditSubscriptiondPage() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    yield take(LOAD_EDIT_SUBSCRIPTION_PAGE);

    yield fork(loadCities);
  }
}
