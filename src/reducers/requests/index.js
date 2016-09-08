import {combineReducers} from 'redux';
import cities from './cities';
import jobs from './jobs';
import subscriptions from './subscriptions';
import statistics from './statistics';

export default combineReducers({
  subscriptions,
  cities,
  jobs,
  statistics,
});
