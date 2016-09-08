import {actionTypes} from 'actions/statistics';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.statistics.fetch.REQUEST:
      return {...state, isLoading: true};

    case actionTypes.statistics.fetch.SUCCESS:
    case actionTypes.statistics.fetch.FAILURE:
      return {...state, isLoading: false};

    default:
      return state;
  }
}
