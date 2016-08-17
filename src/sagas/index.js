import {fork} from 'redux-saga/effects';
import {watchLoadUserPage} from './User';
import {watchSubmitLoginForm} from './Login';

export default function* root() {
  yield [
    fork(watchLoadUserPage),
    fork(watchSubmitLoginForm),
  ];
}
