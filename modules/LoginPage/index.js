'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { submitLoginForm } from './actions';
import {RaisedButton} from 'material-ui/lib'
import {TextField} from 'material-ui/lib'
//import './less/style';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const email = this.refs['email'].getValue(),
          password = this.refs['password'].getValue();
    this.props.submitLoginForm(email, password);
  }

  render() {
    //return (<div>Login</div>);
    return (
      <form className="form-login">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h3>Login</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <TextField
              hintText="Please, enter your email"
              floatingLabelText="Email"
              ref="email"/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <TextField
              hintText="Please, enter your password"
              floatingLabelText="Password"
              ref="password"/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 text-center">
            <RaisedButton label="Submit" onClick={this.submitForm}/>
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
  submitLoginForm
})(LoginPage);
