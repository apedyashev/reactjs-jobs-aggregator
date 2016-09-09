// libs
import React, {PropTypes} from 'react';
// actions
import {changePassword} from 'actions/user';
// components
import {H3, Button, Input} from 'components/dumb/Base';
import reactForm from 'components/smart/Form';
import styles from './Form.css';

class LoginForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
  }

  submitForm = (values) => {
    return this.props.changePassword(values);
  }

  render() {
    const {fields: {currentPassword, newPassword, verifyPassword}, handleSubmit} = this.props;
    return (
      <form className={styles.form} onSubmit={handleSubmit(this.submitForm)}>
        <H3>Change your password</H3>
        <Input
          hintText="Please, enter current"
          floatingLabelText="Current Password"
          errorText={currentPassword.error}
          type="password"
          {...currentPassword}
        />
        <Input
          hintText="Please, enter new password"
          floatingLabelText="New Password"
          errorText={newPassword.error}
          type="password"
          {...newPassword}
        />
        <Input
          hintText="Please, enter new password again"
          floatingLabelText="Verify Password"
          errorText={verifyPassword.error}
          type="password"
          {...verifyPassword}
        />
        <Button label="Save" type="submit" />
      </form>
    );
  }
}

function validation(values) {
  const errors = {};
  if (!values.currentPassword) {
    errors.currentPassword = 'Current password is required';
  }

  if (!values.newPassword) {
    errors.newPassword = 'New password is required';
  }

  if (values.newPassword !== values.verifyPassword) {
    errors.verifyPassword = 'Enter the new password again';
  }

  return errors;
}

export default reactForm({
  fields: ['currentPassword', 'newPassword', 'verifyPassword'],
  validation,
}, () => { // select
  return {
  };
}, {
  changePassword,
})(LoginForm);
