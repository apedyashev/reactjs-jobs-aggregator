import {call} from 'redux-saga/effects';
import {job} from 'actions/Job';
import {Schema, arrayOf} from 'normalizr';
import callApi from 'services/api';
import {fetchEntity} from 'helpers/sagas';

const schemas = {
  job: new Schema('jobs'),
};
schemas.jobsArray = arrayOf(schemas.job);

export const fetchJobs = fetchEntity.bind(null, job, () => {
  return callApi('/api/jobs', schemas.jobsArray);
});

export function* loadJobs() {
  yield call(fetchJobs);
}
