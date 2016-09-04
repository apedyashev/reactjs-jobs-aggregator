import {combineReducers} from 'redux';
import cities from './cities';
import jobs from './jobs';
import subscriptions from './subscriptions';

export default combineReducers({
  subscriptions,
  cities,
  jobs,
});
