import { JA_CALL_API } from '../../../middleware/ja-api';

export const SUBSCRIPTION_REQUEST = 'SUBSCRIPTION_REQUEST';
export const SUBSCRIPTION_SUCCESS = 'SUBSCRIPTION_SUCCESS';
export const SUBSCRIPTION_FAILURE = 'SUBSCRIPTION_FAILURE';

function fetchSubscriptions() {
  return {
    [JA_CALL_API]: {
      types: [SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS, SUBSCRIPTION_FAILURE],
      endpoint: `subscriptions`,
      jsonRoot: 'sunscriptions'
    }
  };
}
export function loadSubscriptions(){
  return (dispatch, getState) => {
    return dispatch(fetchSubscriptions());
  };
}
