import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = {
  fetch: createRequestTypes('JOBS'),
};
export const LOAD_JOBS_PAGE = 'LOAD_JOBS_PAGE';

export const job = {
  request: ({subscriptionId, limit, offset}) => action(actionTypes.fetch.REQUEST, {subscriptionId, limit, offset}),
  success: ({subscriptionId}, response) => action(actionTypes.fetch.SUCCESS, {subscriptionId, response}),
  failure: ({subscriptionId}, error) => action(actionTypes.fetch.FAILURE, {subscriptionId, error}),
};

export const loadJobs = ({subscriptionId, limit, offset}) => {
  return action(LOAD_JOBS_PAGE, {subscriptionId, limit, offset});
};
