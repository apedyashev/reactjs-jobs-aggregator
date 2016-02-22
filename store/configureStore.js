import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { devTools } from 'redux-devtools';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {createMemoryHistory} from 'history';
import routes from '../routes';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import jaApi from '../middleware/ja-api';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux'


const isClient = typeof document !== 'undefined';
const createHistory = isClient ? createBrowserHistory() : createMemoryHistory();
const reduxRouterMiddleware = syncHistory(createHistory);
const finalCreateStore = compose(
  applyMiddleware(thunk, api, jaApi),
  applyMiddleware(reduxRouterMiddleware),
  applyMiddleware(createLogger()),
  devTools()
)(createStore);

export default function configureStore(initialState) {
  //const store = finalCreateStore(rootReducer, initialState);
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
