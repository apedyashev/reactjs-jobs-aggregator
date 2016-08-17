// libs
import React from 'react';
import {connect} from 'react-redux';
// actions
import {submitLogin} from 'actions/Login';
// components
import {Input} from 'components/dumb/Base';
import reactForm from 'components/smart/Form';

class LoginForm extends React.Component {
  componentDidMount() {
    this.props.methods({
      submit: this.props.submit,
    });
  }

  submitLoginForm = (values) => {
    console.log('submit values = ', values, submitLogin);
    return this.props.submitLogin(values.email, values.password);
  }

  render() {
    const {fields: {email, password}, handleSubmit} = this.props;
    console.log('------------password', email, password);
    return (
      <form ref={this.props.formRef} onSubmit={handleSubmit(this.submitLoginForm)}>
        <Input
          hintText="Please, enter your email"
          floatingLabelText="Email"
          errorText={email.error}
          {...email}
        />
        <Input
          hintText="Please, enter your password"
          floatingLabelText="Password"
          errorText={password.error}
          {...password}
        />
      </form>
    );
  }
}

function validation(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}


export default connect(() => {
  return {};
}, {
  submitLogin,
})(reactForm({
  fields: ['email', 'password'],
  validation,
})(LoginForm));

// export default reactForm({
//   fields: ['email', 'password'],
//   validation,
// }, (state, ownProps) => { // select
//   console.log('***', state, ownProps);
//   return {};
// }, {
//   submitLogin
// })(LoginForm);
