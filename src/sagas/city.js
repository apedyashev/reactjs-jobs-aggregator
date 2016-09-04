import {call} from 'redux-saga/effects';
import {Schema, arrayOf} from 'normalizr';
import {actionCreators} from 'actions/city';
import callApi from 'services/api';
import {fetchEntity} from 'helpers/sagas';

const schemas = {
  city: new Schema('cities', {
    idAttribute: 'name',
  }),
};
schemas.citiesArray = {
  cities: arrayOf(schemas.city),
};

const api = {
  cities: {
    fetch: fetchEntity.bind(null, actionCreators.cities.fetch, () => {
      return callApi('/api/jobs/stats?cities=true', schemas.citiesArray);
    }),
  },
};

export function* loadCities() {
  yield call(api.cities.fetch);
}
