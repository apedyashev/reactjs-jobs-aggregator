import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from 'components/App';
import AppAuth from 'components/AppAuth';
import LandingPage from 'components/pages/Landing';
import LoginPage from 'components/pages/Login';
import RegisterPage from 'components/pages/Register';
import DashboardPage from 'components/pages/Dashboard';
import About from 'components/pages/About';
import NotFoundView from 'components/pages/NotFound';

export default [
  <Redirect from="/" to="/dashboard" />,
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="dashboard" component={DashboardPage} />
    <Route path="about" component={About} />
    <Route path="404" component={NotFoundView} />
  </Route>,
  <Route path="/" component={AppAuth}>
    <Route path="login" component={LoginPage} />
    <Route path="register" component={RegisterPage} />
    <Redirect from="*" to="404" />
  </Route>,
];
