import {take, call, fork} from 'redux-saga/effects';
import {actionCreators, SUBMIT_LOGIN_FORM} from 'actions/login';
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
};

function* submitLoginRequest(email, password) {
  yield call(api.login.post, {email, password});
}

// Fetches data for a User : user data + starred repos
export function* watchSubmitLoginForm() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {email, password} = yield take(SUBMIT_LOGIN_FORM);

    yield fork(submitLoginRequest, email, password);
  }
}
