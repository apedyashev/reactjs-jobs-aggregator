import {take, fork} from 'redux-saga/effects';
import {LOAD_DASHBOARD_PAGE} from 'actions/Dashboard';
import {loadSubscriptions} from './Subscription';

export function* watchLoadDashboardPage() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    yield take(LOAD_DASHBOARD_PAGE);

    yield fork(loadSubscriptions);
  }
}
