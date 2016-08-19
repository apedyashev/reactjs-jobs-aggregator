import {fork} from 'redux-saga/effects';
import {watchGetLoggedUser} from './User';
import {watchSubmitLoginForm} from './Login';

export default function* root() {
  yield [
    fork(watchGetLoggedUser),
    fork(watchSubmitLoginForm),
  ];
}