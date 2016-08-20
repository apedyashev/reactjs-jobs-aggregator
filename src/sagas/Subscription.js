import {call, take, fork} from 'redux-saga/effects';
import {actionCreators, SAVE_SUBSCRIPTION} from 'actions/Subscription';
import {Schema, arrayOf} from 'normalizr';
import callApi from 'services/api';
import {fetchEntity} from 'helpers/sagas';

const schemas = {
  subscription: new Schema('subscriptions'),
};
schemas.subscriptionsArray = arrayOf(schemas.subscription);

export const api = {
  saveSubscription: fetchEntity.bind(null, actionCreators.saveSubscription, ({id, data}) => {
    const endpoint = id ? `/api/subscriptions/${id}` : '/api/subscriptions';
    const method = id ? 'PUT' : 'POST';
    return callApi(endpoint, schemas.subscription, {
      method,
      data,
    });
  }),
  fetchSubscriptions: fetchEntity.bind(null, actionCreators.subscriptions, () => {
    return callApi('/api/subscriptions', schemas.subscriptionsArray);
  }),
};

export function* loadSubscriptions() {
  yield call(api.fetchSubscriptions);
}

export function* saveSubscription(id, data) {
  yield call(api.saveSubscription, {id, data});
}

export function* watchSaveSubscription() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {id, data} = yield take(SAVE_SUBSCRIPTION);

    yield fork(saveSubscription, id, data);
  }
}

// export function* watchLoadEditSubscriptiondPage() {
//   /* eslint-disable no-constant-condition */
//   while (true) {
//   /* eslint-enable no-constant-condition */
//     const {id} = yield take(LOAD_EDIT_SUBSCRIPTION_PAGE);
//
//     yield fork(loadSubscription, id);
//   }
// }
