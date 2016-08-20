import {call, take, fork} from 'redux-saga/effects';
import {job, LOAD_JOBS_PAGE} from 'actions/Job';
import {Schema, arrayOf} from 'normalizr';
import callApi from 'services/api';
import {fetchEntity} from 'helpers/sagas';

const schemas = {
  job: new Schema('jobs'),
};
schemas.jobsArray = arrayOf(schemas.job);

export const fetchJobs = fetchEntity.bind(null, job, (subscriptionId) => {
  return callApi('/api/jobs', schemas.jobsArray, {data: {subscriptionId}});
});

export function* loadJobs(subscriptionId) {
  yield call(fetchJobs, subscriptionId);
}

export function* watchLoadJobs() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {subscriptionId} = yield take(LOAD_JOBS_PAGE);

    yield fork(loadJobs, subscriptionId);
  }
}
