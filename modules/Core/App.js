import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { Link } from 'react-router';
//import Explore from '../components/Explore';

import {AppBar} from 'material-ui/lib'
import {Tab} from 'material-ui/lib'
import {Tabs} from 'material-ui/lib'

import { resetErrorMessage } from './actions';
import { sendLogout, loadLoggedUser } from './actions/ja'
//import './less/style';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
    this.logout = this.logout.bind(this);
    this.handleTabActive = this.handleTabActive.bind(this);
  }

  componentWillMount() {
    this.props.loadLoggedUser();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.loaded) {
      this.loaded = true;
      this.props.loadLoggedUser();
    }
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange(nextValue) {
    this.props.pushState(null, `/${nextValue}`);
  }

  handleTabActive(tab) {
    this.props.pushState(null, `/${tab.props.value}`);
  }

  logout(e) {
    e.preventDefault();
    this.props.sendLogout();
  }

  //renderErrorMessage() {
  //  const { errorMessage } = this.props;
  //  if (!errorMessage) {
  //    return '';
  //  }
  //
  //  return (
  //    <p style={{ backgroundColor: '#e99', padding: 10 }}>
  //      <b>{errorMessage}</b>
  //      {' '}
  //      (<a href="#"
  //          onClick={this.handleDismissClick}>
  //        Dismiss
  //      </a>)
  //    </p>
  //  );
  //}

  render() {
    // I'm not sure why inputValue contains current path
    const currentPath = this.props.inputValue;
    const { children, inputValue, loggedUser } = this.props;

    let navbar = (
        <Tabs inkBarStyle={{backgroundColor: '#FFF59D'}}
            className="nav-items"
            valueLink={{
              value: currentPath,
              requestChange: ()=> {}
            }}>
          <Tab  label="Login"
              value="login"
              className="item"
              onActive={this.handleTabActive}/>
          <Tab label="Register"
              value="register"
              className="item"
              onActive={this.handleTabActive}/>
        </Tabs>
    );
    if (loggedUser) {
      navbar = (
          <Tabs inkBarStyle={{backgroundColor: '#FFF59D'}}
              className="nav-items"
              valueLink={{
                value: currentPath,
                requestChange: ()=> {}
              }}>
            <Tab  label="Dashboard"
                value="jobs"
                className="item"
                onActive={this.handleTabActive}/>
            <Tab label="Statistics"
                value="statistics"
                className="item"
                onActive={this.handleTabActive}/>
          </Tabs>
      );
    }


    return (
      <div>
        <AppBar showMenuIconButton={false}
                className="app-bar"
                title="Jobs Aggregator">
            {navbar}
        </AppBar>

        <a  href="#" onClick={this.logout}>
          Logout
        </a>


        <div className="container">
          {children}
        </div>
      </div>
    );

//{this.renderErrorMessage()}
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  loadLoggedUser: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node,
};

function mapStateToProps(state) {
  const loggedUser = state.entities.loggedUser || null;
  console.log('state.entities.loggedUser', loggedUser);
  return {
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1),
    loggedUser
  };
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  pushState,
  sendLogout,
  loadLoggedUser
})(App);
