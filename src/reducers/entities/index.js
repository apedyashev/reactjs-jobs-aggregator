import {combineReducers} from 'redux';
import subscriptions from './subscriptions';
import users from './users';
import jobs from './jobs';
import cities from './cities';

export default combineReducers({
  subscriptions,
  users,
  jobs,
  cities,
});
