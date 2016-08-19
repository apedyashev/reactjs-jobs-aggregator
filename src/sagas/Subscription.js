import {call} from 'redux-saga/effects';
import {subscription} from 'actions/Subscription';
import {Schema, arrayOf} from 'normalizr';
import callApi from 'services/api';
import {fetchEntity} from 'helpers/sagas';

const schemas = {
  subscription: new Schema('subscriptions'),
};
schemas.subscriptionsArray = arrayOf(schemas.subscription);

export const fetchSubscriptions = fetchEntity.bind(null, subscription, () => {
  return callApi('/api/subscriptions', schemas.subscriptionsArray);
});

export function* loadSubscriptions() {
  yield call(fetchSubscriptions);
}
