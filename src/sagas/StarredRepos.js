import {call} from 'redux-saga/effects';
import {repo} from 'actions/Repo';
import {Schema, arrayOf} from 'normalizr';
import callApi from 'services/api';
import {fetchEntity} from 'helpers/sagas';

const schemas = {
  repo: new Schema('repos', {
    idAttribute: 'fullName',
  }),
};
schemas.reposArray = arrayOf(schemas.repo);

export const fetchStarred = fetchEntity.bind(null, repo, (login) => {
  return callApi(`users/${login}/starred`, schemas.reposArray);
});

export function* loadStarred(login) {
  yield call(
    fetchStarred,
    login
  );
}
