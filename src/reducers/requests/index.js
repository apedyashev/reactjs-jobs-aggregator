import {combineReducers} from 'redux';
import cities from './Cities';
import jobs from './Jobs';

export default combineReducers({
  cities,
  jobs,
});
