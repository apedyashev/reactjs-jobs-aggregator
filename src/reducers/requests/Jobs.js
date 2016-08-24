import {actionTypes} from 'actions/Job';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.getJobs.REQUEST:
      return {
        isLoading: true,
      };
    case actionTypes.getJobs.SUCCESS:
    case actionTypes.getJobs.FAILURE:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
}
