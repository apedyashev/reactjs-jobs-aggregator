import { JA_CALL_API } from '../../../middleware/ja-api';

export const JOB_REQUEST = 'JOB_REQUEST';
export const JOB_SUCCESS = 'JOB_SUCCESS';
export const JOB_FAILURE = 'JOB_FAILURE';

function fetchJobs() {
    return {
        [JA_CALL_API]: {
            types: [JOB_REQUEST, JOB_SUCCESS, JOB_FAILURE],
            endpoint: `jobs`,
            jsonRoot: 'jobs'
        }
    };
}
export function loadJobs(){
    return (dispatch, getState) => {
        return dispatch(fetchJobs());
    };
}

