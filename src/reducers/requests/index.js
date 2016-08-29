import {combineReducers} from 'redux';
import cities from './Cities';
import jobs from './Jobs';
import subscriptions from './subscriptions';

export default combineReducers({
  subscriptions,
  cities,
  jobs,
});
