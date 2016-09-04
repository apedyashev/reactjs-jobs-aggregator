import {fork} from 'redux-saga/effects';
import {watchGetLoggedUser} from './user';
import {watchSubmitLoginForm} from './login';
import {watchLoadDashboardPage} from './dashboard';
import {watchLoadJobs} from './job';
import {watchLoadStatisticsPage} from './statistics';
import {
  watchSaveSubscription,
  watchLoadEditSubscriptiondPage,
  watchRemoveSubscription,
} from './subscription';

export default function* root() {
  yield [
    fork(watchGetLoggedUser),
    fork(watchSubmitLoginForm),
    fork(watchLoadDashboardPage),
    fork(watchLoadJobs),
    fork(watchSaveSubscription),
    fork(watchRemoveSubscription),
    fork(watchLoadEditSubscriptiondPage),
    fork(watchLoadStatisticsPage),
  ];
}
