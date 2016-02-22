/* eslint-disable no-console, no-use-before-define */

import Express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'

import React from 'react'
import { Router, match, RouterContext } from 'react-router';
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
//import Location   from 'react-router/lib/Location';
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
//import App from './modules/Core/App'
import App from './modules/Core/App'
import routes from './routes';
//import { fetchCounter } from '../common/api/counter'

const app = new Express()
const port = 3000

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// This is fired every time the server side receives a request
//app.use(handleRender)

function handleRender(req, res) {
  // Query our mock API asynchronously
  //fetchCounter(apiResult => {
  //  // Read the counter from the request, if provided
  //  const params = qs.parse(req.query)
  //  const counter = parseInt(params.counter, 10) || apiResult || 0
  //
  //  // Compile an initial state
  //  const initialState = { counter }
  //
  //  // Create a new Redux store instance
  //  const store = configureStore(initialState)
  //
  //  // Render the component to a string
  //  const html = renderToString(
  //      <Provider store={store}>
  //        <App />
  //      </Provider>
  //  )
  //
  //  // Grab the initial state from our Redux store
  //  const finalState = store.getState()
  //
  //  // Send the rendered page back to the client
  //  res.send(renderFullPage(html, finalState))
  //})

  //const location = new Location(req.path, req.query);

  //Router.run(routes, Router.HistoryLocation, (err, routeState) => {
  //  if (err) return console.error(err);
  //
  //  //const InitialComponent = (
  //  //    <Router {...routeState} />
  //  //);
  //  //const componentHTML = React.renderToString(InitialComponent);
  //  //const HTML = `...`;
  //  //
  //  //res.end(HTML);
  //
  //  const store = configureStore(initialState)
  //
  //  //Render the component to a string
  //  const html = renderToString(
  //      <Provider store={store}>
  //        <App />
  //      </Provider>
  //  )
  //
  //  // Grab the initial state from our Redux store
  //  const finalState = store.getState()
  //
  //  // Send the rendered page back to the client
  //  res.send(renderFullPage(html, finalState))
  //});
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

//import { createLocation } from 'history'
app.use((req, res) => {
  //const location = new Location(req.path, req.query);
  //const location = createLocation(req.url)

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      res.send(500, error.message)
    } else if (renderProps == null) {
      res.send(404, 'Not found')
    } else if (renderProps) {
      const store = configureStore();

      // Grab the initial state from our Redux store
      const finalState = store.getState();
      //Render the component to a string
      const html = renderToStaticMarkup(
          <Provider store={store}>
             <RouterContext {...renderProps}/>
          </Provider>
      )
      res.send(renderFullPage(html, finalState));
    } else {
      res.send(404, 'Not found')
    }
  })

});

//app.get('/', function(req, res){
//  console.log('Send');
//  const store = configureStore();
//
//  // Grab the initial state from our Redux store
//  const finalState = store.getState();
//  //Render the component to a string
//  const html = renderToString(
//      <Provider store={store}>
//        <App />
//      </Provider>
//  )
//  res.send(renderFullPage(html, finalState));
//});

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

//var webpack = require('webpack');
//var webpackDevMiddleware = require('webpack-dev-middleware');
//var webpackHotMiddleware = require('webpack-hot-middleware');
//var config = require('./webpack.config');
//
//var app = new require('express')();
//var port = 3000;
//
//var compiler = webpack(config);
//app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
//app.use(webpackHotMiddleware(compiler));
//
//app.use(function(req, res) {
//  res.sendFile(__dirname + '/index.html');
//});
//
//app.listen(port, function(error) {
//  if (error) {
//    console.error(error);
//  } else {
//    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
//  }
//});
