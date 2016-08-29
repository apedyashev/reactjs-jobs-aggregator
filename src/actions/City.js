import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = {
  fetch: createRequestTypes('GET_CITIES'),
};
// export const GET_CITIES = 'GET_CITIES';

export const actionCreators = {
  getCities: {
    request: () => action(actionTypes.fetch.REQUEST),
    success: (id, response) => action(actionTypes.fetch.SUCCESS, {response}),
    failure: (id, error) => action(actionTypes.fetch.FAILURE, {error}),
  },
};

// export function loadCities() {
//   return action(GET_CITIES);
// }
