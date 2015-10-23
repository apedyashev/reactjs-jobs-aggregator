import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { Link } from 'react-router';
//import Explore from '../components/Explore';
import AppBar from 'material-ui/lib/app-bar';
import {Tab, Tabs} from 'material-ui/lib/tabs';
import { resetErrorMessage } from './actions';
import {sendLogout} from './actions/ja'
import './less/style';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
    this.logout = this.logout.bind(this);
    this.handleTabActive = this.handleTabActive.bind(this);
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

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    );
  }

  render() {
    // I'm not sure why inputValue contains current path
    const currentPath = this.props.inputValue;
    const { children, inputValue } = this.props;
    return (
      <div>
        <AppBar showMenuIconButton={false}
                className="app-bar"
                title="Jobs Aggregator">
          <Tabs inkBarStyle={{backgroundColor: '#FFF59D'}}
              className="nav-items"
              valueLink={{
                value: currentPath,
                requestChange: ()=> {}
              }}>
            <Tab label="Dashboard"
                value="jobs"
                className="item"
                onActive={this.handleTabActive}/>
            <Tab label="Statistics"
                className="item"
                value="statistics"
                onActive={this.handleTabActive}/>
          </Tabs>
        </AppBar>

        <a  href="#" onClick={this.logout}>
          Logout
        </a>

        {this.renderErrorMessage()}
        <div className="container">
          {children}
        </div>
      </div>
    );

    //<Explore value={inputValue}
    //         onChange={this.handleChange} />
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1)
  };
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  pushState,
  sendLogout
})(App);
