import {call, take, fork} from 'redux-saga/effects';
import {job, LOAD_JOBS_PAGE} from 'actions/Job';
import {Schema, arrayOf} from 'normalizr';
import callApi from 'services/api';
import {fetchEntity} from 'helpers/sagas';

const schemas = {
  job: new Schema('jobs'),
};
schemas.jobsArray = arrayOf(schemas.job);

export const fetchJobs = fetchEntity.bind(null, job, ({subscriptionId, limit, offset}) => {
  return callApi('api/jobs', schemas.jobsArray, {data: {subscriptionId, limit, offset}});
});

export function* loadJobs({subscriptionId, limit, offset}) {
  yield call(fetchJobs, {subscriptionId, limit, offset});
}

export function* watchLoadJobs() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {subscriptionId, limit, offset} = yield take(LOAD_JOBS_PAGE);

    yield fork(loadJobs, {subscriptionId, limit, offset});
  }
}
