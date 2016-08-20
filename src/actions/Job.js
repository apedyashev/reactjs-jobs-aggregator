import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = createRequestTypes('JOBS');
export const LOAD_JOBS_PAGE = 'LOAD_JOBS_PAGE';

export const job = {
  request: (subscriptionId) => {
    return action(actionTypes.REQUEST, {subscriptionId});
  },
  success: (subscriptionId, response) => {
    return action(actionTypes.SUCCESS, {subscriptionId, response});
  },
  failure: (subscriptionId, error) => {
    return action(actionTypes.FAILURE, {subscriptionId, error});
  },
};

export const loadJobs = (subscriptionId) => {
  return action(LOAD_JOBS_PAGE, {subscriptionId});
};
