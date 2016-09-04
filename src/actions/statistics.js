import {createRequestTypes, action} from 'helpers/actions';

export const LOADT_STATISTICS_PAGE = 'LOADT_STATISTICS_PAGE';

export const actionTypes = {
  statistics: {
    fetch: createRequestTypes('GET_STATISTICS'),
  },
};

export const actionCreators = {
  statistics: {
    fetch: {
      request: () => action(actionTypes.statistics.fetch.REQUEST),
      success: (id, response) => action(actionTypes.statistics.fetch.SUCCESS, {response}),
      failure: (id, error) => action(actionTypes.statistics.fetch.FAILURE, {error}),
    },
  },
};

export function loadStatisticsPage() {
  return action(LOADT_STATISTICS_PAGE);
}
