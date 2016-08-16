import {combineReducers} from 'redux';

function entities(state = {users: {}, repos: {}}, action) {
  if (action.response && action.response.entities) {
    return {
      ...state,
      ...action.response.entities,
    };
  }

  return state;
}

const rootReducer = combineReducers({
  entities,
});

export default rootReducer;
