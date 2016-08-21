import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = {
  getCities: createRequestTypes('GET_CITIES'),
};
// export const GET_CITIES = 'GET_CITIES';

export const actionCreators = {
  getCities: {
    request: () => {
      return action(actionTypes.getCities.REQUEST);
    },
    success: (id, response) => {
      return action(actionTypes.getCities.SUCCESS, {response});
    },
    failure: (id, error) => {
      return action(actionTypes.getCities.FAILURE, {error});
    },
  },
};

// export function loadCities() {
//   return action(GET_CITIES);
// }
