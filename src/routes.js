import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from 'components/App';
import AppAuth from 'components/AppAuth';
import LandingPage from 'components/pages/Landing';
import Auth from 'components/pages/Auth';
// import RegisterPage from 'components/pages/Auth/Register';
import Dashboard from 'components/pages/Dashboard';
import JobsPage from 'components/pages/Jobs';
import SubscriptionEditPage from 'components/pages/SubscriptionEdit';
import StatisticsPage from 'components/pages/Statistics';
import SettingsProfilePage from 'components/pages/SettingsProfile';
import SettingsPasswordPage from 'components/pages/SettingsPassword';
import NotFoundView from 'components/pages/NotFound';

export default [
  <Redirect from="/" to="/dashboard" />,
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="dashboard" component={Dashboard}>
      <IndexRoute component={JobsPage} />
      <Route path="subscription/:id/edit" component={SubscriptionEditPage} />
      <Route path="subscription/new" component={SubscriptionEditPage} />
      <Route path="subscription/:id" component={JobsPage} />
    </Route>
    <Route path="statistics" component={StatisticsPage} />
    <Route path="settings/profile" component={SettingsProfilePage} />
    <Route path="settings/password" component={SettingsPasswordPage} />
    <Route path="404" component={NotFoundView} />
  </Route>,
  <Route path="/" component={AppAuth}>
    <Route path="login" component={Auth.LoginPage} />
    <Route path="register" component={Auth.RegisterPage} />
    <Redirect from="*" to="404" />
  </Route>,
];
