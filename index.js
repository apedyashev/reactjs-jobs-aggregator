//import 'babel-core/polyfill';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
console.log('syncHistoryWithStore', syncHistoryWithStore);
const isClient = typeof document !== 'undefined';
if (isClient) {
  const store = configureStore(browserHistory, window.__INITIAL_STATE__);
  const history = syncHistoryWithStore(browserHistory, store);

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  //You only render the <Router> with browser history on the client; on the server,
  // you just pass the routes (but not the <Router>) to the <RoutingContext>.
  render(
    <Provider store={store}>
      <Router history={history} routes={routes}></Router>
    </Provider>,
    document.getElementById('root')
  );
}

//if (process.env.NODE_ENV !== 'production') {
//  // Use require because imports can't be conditional.
//  // In production, you should ensure process.env.NODE_ENV
//  // is envified so that Uglify can eliminate this
//  // module and its dependencies as dead code.
//  require('./createDevToolsWindow')(store);
//}
