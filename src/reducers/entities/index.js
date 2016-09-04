import {combineReducers} from 'redux';
import subscriptions from './subscriptions';
import users from './users';
import jobs from './jobs';
import cities from './cities';
import subscriptionJobs from './subscriptionJobs';
import statistics from './statistics';

export default combineReducers({
  subscriptions,
  subscriptionJobs,
  users,
  jobs,
  cities,
  statistics,
});
