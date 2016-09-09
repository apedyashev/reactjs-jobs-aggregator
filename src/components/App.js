/* eslint react/prefer-stateless-function: "off" */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
// actions
import {loadLoggedUser} from 'actions/user';
// components
import TopNav from 'components/dumb/TopNav';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from './MuiTheme';
import injectTapEventPlugin from './InjectTapEventPlugin';


require('normalize.css');
require('./normalizes-overwrites.css');

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    loggedUser: PropTypes.object.isRequired,
    loadLoggedUser: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  };

  componentWillMount() {
    injectTapEventPlugin();
    this.props.loadLoggedUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requested && !nextProps.loggedUser) {
      this.props.push('/login');
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <div>
          <TopNav authenticated user={this.props.loggedUser} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

function select(state) {
  const loggedUserId = state.auth && state.auth.userId;
  return {
    loggedUser: state.entities.users[loggedUserId] || {},
    requested: state.auth && state.auth.requested,
  };
}

export default connect(select, {
  loadLoggedUser,
  push,
})(App);
