import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/Core/App';

import StatsPage    from './modules/StatsPage/StatsPage';
import JobsPage     from './modules/JobsPage';
import LoginPage    from './modules/LoginPage';
import RegisterPage from './modules/RegisterPage';
import LandingPage  from './modules/LandingPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage}/>
    <Route path="jobs"
            component={JobsPage} />
    <Route path="statistics"
            component={StatsPage} />
    <Route path="login"
            component={LoginPage} />
    <Route path="register"
            component={RegisterPage} />
  </Route>
);

//<Route path="*" component={NoMatch}/>


//<Route path="/:login/:name"
//       component={RepoPage} />
//<Route path="/:login"
//       component={UserPage} />
