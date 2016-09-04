import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = {
  cities: {
    fetch: createRequestTypes('GET_CITIES'),
  },
};
// export const GET_CITIES = 'GET_CITIES';

export const actionCreators = {
  cities: {
    fetch: {
      request: () => action(actionTypes.cities.fetch.REQUEST),
      success: (id, response) => action(actionTypes.cities.fetch.SUCCESS, {response}),
      failure: (id, error) => action(actionTypes.cities.fetch.FAILURE, {error}),
    },
  },
};

// export function loadCities() {
//   return action(GET_CITIES);
// }
