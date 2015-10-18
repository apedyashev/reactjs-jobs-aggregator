import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
const RaisedButton = require('material-ui/src/raised-button');

function loadData() {}

class LoginPage extends Component {

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.loaded) {
      this.loaded = true;
      loadData(nextProps);
    }
  }

  handleLoadMoreClick() {
    // this.props.loadStargazers(this.props.fullName, true);
  }

  render() {
    return (
      <div>
        Login
        <div>
          <input type="text" placeholder="Email"/>
        </div>
        <div>
          <input type="password" placeholder="Password"/>
        </div>
        <RaisedButton label="Default" />
      </div>
      );
  }
}


function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {
  // loadJobs,
})(LoginPage);
