import {actionTypes} from 'actions/City';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.getCities.REQUEST:
      return {
        isLoading: true,
      };
    case actionTypes.getCities.SUCCESS:
    case actionTypes.getCities.FAILURE:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
}
