/* eslint react/prefer-stateless-function: "off" */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
// components
import TopBar from 'components/dumb/TopBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from './MuiTheme';
import injectTapEventPlugin from './InjectTapEventPlugin';
// actions
import {loadLoggedUser} from 'actions/User';

require('normalize.css');
require('./normalizes-overwrites.css');

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
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
          <TopBar authenticated />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

function select(state) {
  const loggedUserId = state.auth && state.auth.userId;
  return {
    loggedUser: state.entities.users[loggedUserId],
    requested: state.auth && state.auth.requested,
  };
}

export default connect(select, {
  loadLoggedUser,
  push,
})(App);
