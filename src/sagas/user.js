import {take, call, fork, select} from 'redux-saga/effects';
import {actionCreators, LOAD_LOGGED_USER} from 'actions/user';
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
  },
};

// load user unless it is cached
function* loadLoggedUser() {
  const loadedUser = yield select(selectors.getUser);

  if (!loadedUser) {
    yield call(api.user.fetch);
  }
}

export function* watchGetLoggedUser() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    yield take(LOAD_LOGGED_USER);

    yield fork(loadLoggedUser);
  }
}
