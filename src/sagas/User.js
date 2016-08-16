import {take, call, fork, select} from 'redux-saga/effects';
import {user, LOAD_USER_PAGE} from 'actions/User';
import {Schema/* arrayOf */} from 'normalizr';
import callApi from 'services/api';
import selectors from 'reducers/selectors';
import {fetchEntity} from 'helpers/sagas';
import {loadStarred} from 'sagas/StarredRepos';

const schemas = {
  user: new Schema('users', {
    idAttribute: 'login',
  }),
};
export const fetchUser = fetchEntity.bind(null, user, (login) => {
  return callApi(`users/${login}`, schemas.user);
});

// load user unless it is cached
function* loadUser(login, requiredFields) {
  const loadedUser = yield select(selectors.getUser, login);

  if (!loadedUser || requiredFields.some((key) => {
    return !loadedUser.hasOwnProperty(key);
  })) {
    yield call(fetchUser, login);
  }
}

// Fetches data for a User : user data + starred repos
export function* watchLoadUserPage() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {login, requiredFields = []} = yield take(LOAD_USER_PAGE);

    yield fork(loadUser, login, requiredFields);
    yield fork(loadStarred, login);
  }
}
