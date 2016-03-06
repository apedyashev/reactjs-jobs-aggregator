/* eslint-disable no-console, no-use-before-define */

import Express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'

import React from 'react'
import { Router, match, RouterContext, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { renderToStaticMarkup } from 'react-dom/server'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import routes from './routes';

const app = new Express();
const port = 3000;

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.set('view engine', 'ejs');

app.use((req, res) => {
  const memoryHistory = createMemoryHistory(req.url);
  let store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      res.status(500).send(error.message)
    } else if (renderProps == null) {
      res.status(404).send('Not found')
    } else if (renderProps) {
      // Grab the initial state from our Redux store
      const finalState = store.getState();
      //Render the component to a string
      store = configureStore(memoryHistory, finalState);
      const html = renderToStaticMarkup(
          <Provider store={store}>
             <RouterContext {...renderProps}/>
          </Provider>
      );
      res.render('index', {html, finalState});
    } else {
      res.status(404).send('Not found')
    }
  })

});

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});
