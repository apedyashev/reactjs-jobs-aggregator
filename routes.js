import React from 'react';
import { Route } from 'react-router';
import App from './modules/Core/App';
//import UserPage from './containers/UserPage';
//import RepoPage from './containers/RepoPage';

import StatsPage    from './modules/StatsPage/StatsPage';
import JobsPage     from './modules/JobsPage';
import LoginPage    from './modules/LoginPage';

export default (
  <Route path="/" component={App}>
    <Route path="jobs"
            component={JobsPage} />
    <Route path="statistics"
            component={StatsPage} />
    <Route path="login"
            component={LoginPage} />        
  </Route>
);

//<Route path="*" component={NoMatch}/>


//<Route path="/:login/:name"
//       component={RepoPage} />
//<Route path="/:login"
//       component={UserPage} />
