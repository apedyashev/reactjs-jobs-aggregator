import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = {
  getJobs: createRequestTypes('JOBS'),
};
export const LOAD_JOBS_PAGE = 'LOAD_JOBS_PAGE';

export const job = {
  request: (subscriptionId) => {
    return action(actionTypes.getJobs.REQUEST, {subscriptionId});
  },
  success: (subscriptionId, response) => {
    return action(actionTypes.getJobs.SUCCESS, {subscriptionId, response});
  },
  failure: (subscriptionId, error) => {
    return action(actionTypes.getJobs.FAILURE, {subscriptionId, error});
  },
};

export const loadJobs = (subscriptionId) => {
  return action(LOAD_JOBS_PAGE, {subscriptionId});
};
