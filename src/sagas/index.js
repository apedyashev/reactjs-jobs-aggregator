import {fork} from 'redux-saga/effects';
import {watchGetLoggedUser, watchUpdateLoggedUser, watchChangeUserPassword} from './user';
import {watchSubmitLoginForm, watchSubmitSignOut, watchSubmitRegisterForm} from './login';
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
    fork(watchUpdateLoggedUser),
    fork(watchChangeUserPassword),
    fork(watchSubmitLoginForm),
    fork(watchSubmitRegisterForm),
    fork(watchSubmitSignOut),
    fork(watchLoadDashboardPage),
    fork(watchLoadJobs),
    fork(watchSaveSubscription),
    fork(watchRemoveSubscription),
    fork(watchLoadEditSubscriptiondPage),
    fork(watchLoadStatisticsPage),
  ];
}
