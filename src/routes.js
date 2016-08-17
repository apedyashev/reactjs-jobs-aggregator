import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from 'components/App';
import LandingPage from 'components/pages/Landing';
import LoginPage from 'components/pages/Login';
import RegisterPage from 'components/pages/Register';
import DashboardPage from 'components/pages/Dashboard';
import About from 'components/pages/About';
import NotFoundView from 'components/pages/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />

    <Route path="dashboard" component={DashboardPage} />
    <Route path="login" component={LoginPage} />
    <Route path="register" component={RegisterPage} />

    <Route path="about" component={About} />
    <Route path="404" component={NotFoundView} />
    <Redirect from="*" to="404" />
  </Route>
);
