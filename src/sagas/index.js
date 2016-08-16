import {fork} from 'redux-saga/effects';
import {watchLoadUserPage} from 'sagas/User';

export default function* root() {
  yield [
    fork(watchLoadUserPage),
  ];
}
