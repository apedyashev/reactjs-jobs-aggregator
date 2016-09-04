import {call, take, fork} from 'redux-saga/effects';
import {actionCreators, LOADT_STATISTICS_PAGE} from 'actions/statistics';
import {Schema, arrayOf} from 'normalizr';
import callApi from 'services/api';
import {fetchEntity} from 'helpers/sagas';

const schemas = {
  city: new Schema('cities', {
    idAttribute: 'name',
  }),
  availability: new Schema('availabilities', {
    idAttribute: 'name',
  }),
};
schemas.statistics = {
  cities: arrayOf(schemas.city),
  availabilities: arrayOf(schemas.availability),
};

export const api = {
  statistics: {
    fetch: fetchEntity.bind(null, actionCreators.statistics.fetch, ({cities, availabilities}) => {
      return callApi('api/jobs/stats', schemas.statistics, {data: {cities, availabilities}});
    }),
  },
};

export function* loadStatistics() {
  yield call(api.statistics.fetch, {cities: true, availabilities: true});
}

export function* watchLoadStatisticsPage() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    yield take(LOADT_STATISTICS_PAGE);

    yield fork(loadStatistics);
  }
}
