import {fork} from 'redux-saga/effects';
import {watchGetLoggedUser} from './User';
import {watchSubmitLoginForm} from './Login';
import {watchLoadDashboardPage} from './Dashboard';
import {watchLoadJobs} from './Job';

export default function* root() {
  yield [
    fork(watchGetLoggedUser),
    fork(watchSubmitLoginForm),
    fork(watchLoadDashboardPage),
    fork(watchLoadJobs),
  ];
}
