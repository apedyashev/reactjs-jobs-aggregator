import {createRequestTypes, action} from 'helpers/actions';

export const actionTypes = {
  jobs: {
    fetch: createRequestTypes('JOBS'),
  },
};
export const LOAD_JOBS_PAGE = 'LOAD_JOBS_PAGE';

export const actionCreators = {
  job: {
    fetch: {
      request: ({subscriptionId, limit, offset}) => action(actionTypes.jobs.fetch.REQUEST, {subscriptionId, limit, offset}),
      success: ({subscriptionId}, response) => action(actionTypes.jobs.fetch.SUCCESS, {subscriptionId, response}),
      failure: ({subscriptionId}, error) => action(actionTypes.jobs.fetch.FAILURE, {subscriptionId, error}),
    },
  },
};

export const loadJobs = ({subscriptionId, limit, offset}) => {
  return action(LOAD_JOBS_PAGE, {subscriptionId, limit, offset});
};
