import {take, call, fork} from 'redux-saga/effects';
import {login, SUBMIT_LOGIN_FORM} from 'actions/Login';
import callApi from 'services/api';
// import selectors from 'reducers/selectors';
import {fetchEntity} from 'helpers/sagas';
import {schemas} from './User';

export const api = {
  submitLoginRequest: fetchEntity.bind(null, login, (data) => {
    return callApi('api/auth/signin', schemas.user, {
      method: 'POST',
      data,
    });
  }),
};

function* submitLoginRequest(email, password) {
  yield call(api.submitLoginRequest, {email, password});
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
