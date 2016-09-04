import {actionTypes} from 'actions/statistics';

const initialState = {
  cities: {},
  availabilities: {},
};

export default function statistics(state = initialState, action) {
  switch (action.type) {
    case actionTypes.statistics.fetch.SUCCESS:
      return {...action.response.entities};
    default:
      return state;
  }
}
