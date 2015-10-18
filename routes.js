import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import UserPage from './containers/UserPage';
import RepoPage from './containers/RepoPage';
import JobsPage from './containers/JobsPage';
import StatsPage from './containers/StatsPage';
import LoginPage from './modules/LoginPage';

export default (
  <Route path="/" component={App}>
    <Route path="jobs"
            component={JobsPage} />
    <Route path="stats"
            component={StatsPage} />
    <Route path="login"
            component={LoginPage} />        
    <Route path="/:login/:name"
           component={RepoPage} />
    <Route path="/:login"
           component={UserPage} />
  </Route>
);
