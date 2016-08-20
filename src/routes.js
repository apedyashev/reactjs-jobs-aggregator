import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from 'components/App';
import AppAuth from 'components/AppAuth';
import LandingPage from 'components/pages/Landing';
import LoginPage from 'components/pages/Login';
import RegisterPage from 'components/pages/Register';
import Dashboard from 'components/pages/Dashboard';
import JobsPage from 'components/pages/Jobs';
import SubscriptionEditPage from 'components/pages/SubscriptionEdit';
import NotFoundView from 'components/pages/NotFound';

export default [
  <Redirect from="/" to="/dashboard" />,
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="dashboard" component={Dashboard}>
      <IndexRoute component={JobsPage} />
      <Route path="subscription/:id/edit" component={SubscriptionEditPage} />
      <Route path="subscription/:id" component={JobsPage} />
    </Route>
    <Route path="404" component={NotFoundView} />
  </Route>,
  <Route path="/" component={AppAuth}>
    <Route path="login" component={LoginPage} />
    <Route path="register" component={RegisterPage} />
    <Redirect from="*" to="404" />
  </Route>,
];
