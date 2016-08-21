import {call} from 'redux-saga/effects';
import {actionCreators} from 'actions/City';
import {Schema, arrayOf} from 'normalizr';
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

export const api = {
  fetchCities: fetchEntity.bind(null, actionCreators.getCities, () => {
    return callApi('/api/jobs/stats?cities=true', schemas.citiesArray);
  }),
};

export function* loadCities() {
  yield call(api.fetchCities);
}
