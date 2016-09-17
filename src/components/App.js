/* eslint react/prefer-stateless-function: "off" */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import _ from 'lodash';
// actions
import {loadLoggedUser} from 'actions/user';
import {submitSignOut} from 'actions/login';
// components
import TopNav from 'components/dumb/TopNav/Authenticated';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from './MuiTheme';
import injectTapEventPlugin from './InjectTapEventPlugin';
import styles from './App.css';


require('normalize.css');
require('./normalizes-overwrites.css');

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    loggedUser: PropTypes.object.isRequired,
    loadLoggedUser: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    submitSignOut: PropTypes.func.isRequired,
  };

  componentWillMount() {
    injectTapEventPlugin();
    this.props.loadLoggedUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requested && _.isEmpty(nextProps.loggedUser)) {
      this.props.push('/login');
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <div>
          <TopNav user={this.props.loggedUser} signOut={this.props.submitSignOut} />
          <div className={styles.container}>
            {this.props.children}
          </div>
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
  submitSignOut,
  push,
})(App);
