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
import { routerMiddleware } from 'react-router-redux';

//const isClient = typeof document !== 'undefined';
////const createHistory = isClient ? createBrowserHistory() : createMemoryHistory();
//const createHistory = isClient ? browserHistory : createMemoryHistory();
//const reduxRouterMiddleware = routerMiddleware(createHistory);
//const finalCreateStore = compose(
//  applyMiddleware(thunk, api, jaApi),
//  applyMiddleware(reduxRouterMiddleware),
//  applyMiddleware(createLogger()),
//  devTools()
//)(createStore);
export default function configureStore(history, initialState) {
  if (!history) {
    throw new Error(`The first param history must be defined`);
  }
  ////const store = finalCreateStore(rootReducer, initialState);
  //const finalCreateStore = compose(
  //    applyMiddleware(thunk, api, jaApi),
  //    routerMiddleware(history),
  //    applyMiddleware(createLogger()),
  //    devTools()
  //)(createStore);
  //
  //const store = finalCreateStore(rootReducer, initialState);

  const store = createStore(
      rootReducer,
      initialState,
      compose(
          applyMiddleware(
              thunk, api, jaApi,
              routerMiddleware(history)
              //applyMiddleware(createLogger())
              //devTools()
          )
      )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
