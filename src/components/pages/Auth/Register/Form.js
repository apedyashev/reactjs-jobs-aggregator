// libs
import React, {PropTypes} from 'react';
// import {connect} from 'react-redux';
// actions
import {submitRegister} from 'actions/login';
// components
import {Input, Button} from 'components/dumb/Base';
import reactForm from 'components/smart/Form';

class RegisterForm extends React.Component {
  static propTypes = {
    // injected byt reactForm lib
    fields: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitRegister: PropTypes.func.isRequired,
  }

  submitRegisterForm = (values) => {
    console.log('submit values = ', values);
    return this.props.submitRegister(values);
  }

  render() {
    const {fields: {firstName, lastName, username, email, password}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitRegisterForm)}>
        <Input
          hintText="Please, enter your first name"
          floatingLabelText="First Name"
          errorText={firstName.error}
          {...firstName}
        />
        <Input
          hintText="Please, enter your last name"
          floatingLabelText="Last Name"
          errorText={lastName.error}
          {...lastName}
        />
        <Input
          hintText="Please, enter your email"
          floatingLabelText="Email"
          errorText={email.error}
          {...email}
        />
        <Input
          hintText="Please, enter your user name"
          floatingLabelText="User Name"
          errorText={username.error}
          {...username}
        />
        <Input
          hintText="Please, enter your password"
          floatingLabelText="Password"
          errorText={password.error}
          type="password"
          {...password}
        />
        <Button type="submit" label="Login" />
      </form>
    );
  }
}

function validation(values) {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'First Name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email';
  }

  if (!values.username) {
    errors.username = 'User Name is required';
  } else if (!values.username.match(/^[A-Za-z]+[0-9]?/)) {
    errors.username = 'User Name must start from latin letters and may have digits';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Minimum length is 8';
  }

  return errors;
}

export default reactForm({
  fields: ['firstName', 'lastName', 'email', 'username', 'password'],
  validation,
}, () => { // select
  return {
  };
}, {
  submitRegister,
})(RegisterForm);
