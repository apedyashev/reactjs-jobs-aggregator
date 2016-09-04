import {take, call, fork, select} from 'redux-saga/effects';
import {user, LOAD_LOGGED_USER} from 'actions/user';
import {Schema/* arrayOf */} from 'normalizr';
import callApi from 'services/api';
import selectors from 'reducers/selectors';
import {fetchEntity} from 'helpers/sagas';
// import {loadStarred} from 'sagas/StarredRepos';

export const schemas = {
  user: new Schema('users', {
    // idAttribute: 'login',
  }),
};
export const fetchUser = fetchEntity.bind(null, user, () => {
  return callApi('/api/users/me', schemas.user);
});

// load user unless it is cached
function* loadUser() {
  const loadedUser = yield select(selectors.getUser);

  if (!loadedUser) {
    yield call(fetchUser);
  }
}

// Fetches data for a User : user data + starred repos
export function* watchGetLoggedUser() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    yield take(LOAD_LOGGED_USER);

    yield fork(loadUser);
  }
}
