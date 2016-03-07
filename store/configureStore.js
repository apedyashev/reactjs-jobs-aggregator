import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import jaApi from '../middleware/ja-api';
import loginSuccessMiddleware from '../middleware/LoginSuccess.js';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(history, initialState) {
  if (!history) {
    throw new Error(`The first param history must be defined`);
  }

  const middlewares = [],
      isClient = typeof document !== 'undefined';
  if (isClient) {
      // do not use logger for server-side rendering
      middlewares.push(createLogger())
  }
  const store = createStore(
      rootReducer,
      initialState,
      compose(
          applyMiddleware(
              thunk, api, jaApi, loginSuccessMiddleware,
              routerMiddleware(history),
              ...middlewares
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
