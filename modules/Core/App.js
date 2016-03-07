import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { Link } from 'react-router';
//import Explore from '../components/Explore';

import {AppBar} from 'material-ui/lib'
import {Tab} from 'material-ui/lib'
import {Tabs} from 'material-ui/lib'
import Navbar from './components/Navbar'

import { resetErrorMessage } from './actions';
import { sendLogout, loadLoggedUser } from './actions/ja'
import './less/style';
//import withStyles from 'isomorphic-style-loader/lib/withStyles';
//import css from './app.css'
//console.log(css);

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
    this.logout = this.logout.bind(this);
    //this.handleTabActive = this.handleTabActive.bind(this);
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
    const currentPath = this.props.currentPath;
    const { children, loggedUser } = this.props;
    const isUserLogged = (loggedUser != null);

    return (
      <div>
        <Navbar isUserLogged={isUserLogged} currentPath={currentPath}/>

        <a href="#" onClick={this.logout}>
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
  push: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
  loadLoggedUser: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node,
};

function mapStateToProps(state, ownProps) {
  const loggedUser = state.entities.loggedUser || null;
  console.log('state.entities.loggedUser', loggedUser);
  return {
    errorMessage: state.errorMessage,
      currentPath: ownProps.location.pathname.substring(1),
    loggedUser
  };
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  push,
  sendLogout,
  loadLoggedUser
})(App);
