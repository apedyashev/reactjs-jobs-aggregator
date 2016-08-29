import {actionTypes} from 'actions/Job';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.fetch.REQUEST:
      return {
        isLoading: true,
      };
    case actionTypes.fetch.SUCCESS:
    case actionTypes.fetch.FAILURE:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
}
