import {take, call, fork} from 'redux-saga/effects';
import {actionCreators, SUBMIT_LOGIN_FORM, SUBMIT_SIGN_OUT} from 'actions/login';
import callApi from 'services/api';
import {fetchEntity} from 'helpers/sagas';
import {schemas} from './user';

const api = {
  login: {
    post: fetchEntity.bind(null, actionCreators.login.post, (data) => {
      return callApi('api/auth/signin', schemas.user, {
        method: 'POST',
        data,
      });
    }),
  },
  signOut: {
    delete: fetchEntity.bind(null, actionCreators.signOut.delete, () => {
      return callApi('api/auth', schemas.user, {method: 'DELETE'});
    }),
  },
};

function* submitLoginRequest(email, password) {
  yield call(api.login.post, {email, password});
}

function* submitSignOutRequest() {
  yield call(api.signOut.delete);
}

export function* watchSubmitLoginForm() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {email, password} = yield take(SUBMIT_LOGIN_FORM);

    yield fork(submitLoginRequest, email, password);
  }
}

export function* watchSubmitSignOut() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    yield take(SUBMIT_SIGN_OUT);

    yield fork(submitSignOutRequest);
  }
}
