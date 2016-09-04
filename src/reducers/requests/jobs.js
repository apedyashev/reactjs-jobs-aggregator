import {actionTypes} from 'actions/job';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.jobs.fetch.REQUEST:
      return {isLoading: true};
    case actionTypes.jobs.fetch.SUCCESS:
    case actionTypes.jobs.fetch.FAILURE:
      return {isLoading: false};
    default:
      return state;
  }
}
