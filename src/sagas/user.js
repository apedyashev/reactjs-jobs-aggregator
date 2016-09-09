import {take, call, fork, select} from 'redux-saga/effects';
import {actionCreators, LOAD_LOGGED_USER, UPDATE_LOGGED_USER} from 'actions/user';
import {Schema/* arrayOf */} from 'normalizr';
import callApi from 'services/api';
import selectors from 'reducers/selectors';
import {fetchEntity} from 'helpers/sagas';

export const schemas = {
  user: new Schema('users'),
};

const api = {
  user: {
    fetch: fetchEntity.bind(null, actionCreators.loggedUser.fetch, () => {
      return callApi('/api/users/me', schemas.user);
    }),
    update: fetchEntity.bind(null, actionCreators.loggedUser.update, ({data}) => {
      return callApi('/api/users', schemas.user, {method: 'PUT', data});
    }),
  },
};

// load user unless it is cached
function* loadLoggedUser() {
  const loadedUser = yield select(selectors.getUser);

  if (!loadedUser) {
    yield call(api.user.fetch);
  }
}

function* updateLoggedUser(data) {
  yield call(api.user.update, {data});
}

export function* watchGetLoggedUser() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    yield take(LOAD_LOGGED_USER);

    yield fork(loadLoggedUser);
  }
}

export function* watchUpdateLoggedUser() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {data} = yield take(UPDATE_LOGGED_USER);

    yield fork(updateLoggedUser, data);
  }
}
