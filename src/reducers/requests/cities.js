import {actionTypes} from 'actions/city';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.cities.fetch.REQUEST:
      return {isLoading: true};
    case actionTypes.cities.fetch.SUCCESS:
    case actionTypes.cities.fetch.FAILURE:
      return {isLoading: false};
    default:
      return state;
  }
}
