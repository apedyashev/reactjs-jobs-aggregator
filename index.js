//import 'babel-core/polyfill';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';

const isClient = typeof document !== 'undefined';
if (isClient) {
  const store = configureStore(window.__INITIAL_STATE__);

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  render(
    <Provider store = {store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('root')
  );
}

//render(
//  <Provider store={store}>
//    <ReduxRouter />
//  </Provider>,
//  document.getElementById('root')
//);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  require('./createDevToolsWindow')(store);
}
