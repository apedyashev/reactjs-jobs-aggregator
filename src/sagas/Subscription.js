import {call, take, fork} from 'redux-saga/effects';
import {
  actionCreators,
  SAVE_SUBSCRIPTION,
  LOAD_EDIT_SUBSCRIPTION_PAGE,
  REMOVE_SUBSCRIPTION,
} from 'actions/Subscription';
import {Schema, arrayOf} from 'normalizr';
import callApi from 'services/api';
import {fetchEntity} from 'helpers/sagas';
import {loadCities} from './City';

const schemas = {
  subscription: new Schema('subscriptions'),
};
schemas.subscriptionsArray = arrayOf(schemas.subscription);

export const api = {
  saveSubscription: fetchEntity.bind(null, actionCreators.save, ({id, data}) => {
    const endpoint = id ? `api/subscriptions/${id}` : '/api/subscriptions';
    const method = id ? 'PUT' : 'POST';
    return callApi(endpoint, schemas.subscription, {method, data});
  }),
  removeSubscription: fetchEntity.bind(null, actionCreators.remove, ({id}) => {
    const endpoint = `api/subscriptions/${id}`;
    const method = 'DELETE';
    return callApi(endpoint, schemas.subscription, {method});
  }),
  fetchSubscriptions: fetchEntity.bind(null, actionCreators.fetch, () => {
    return callApi('api/subscriptions', schemas.subscriptionsArray);
  }),
};

export function* loadSubscriptions() {
  yield call(api.fetchSubscriptions);
}

export function* saveSubscription(id, data) {
  yield call(api.saveSubscription, {id, data});
}

export function* removeSubscription(id) {
  yield call(api.removeSubscription, {id});
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
