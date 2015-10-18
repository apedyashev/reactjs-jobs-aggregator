import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/src/raised-button';
import TextField from 'material-ui/src/text-field';
import './less/style';

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
      <form className="form-login">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h3>Login</h3>
          </div>
          <div className="col-xs-12">
            <TextField
              hintText="Please, enter your email"
              floatingLabelText="Email" />
          </div>
          <div className="col-xs-12">
            <TextField
              hintText="Please, enter your password"
              floatingLabelText="Password" />
          </div>
          <div className="col-xs-12 text-center">
            <RaisedButton label="Submit" />
          </div>
        </div>
      </form>
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
