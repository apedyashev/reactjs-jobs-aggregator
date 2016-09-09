// libs
import React, {PropTypes} from 'react';
// actions
import {updateLoggedUser} from 'actions/user';
// components
import {H3, Button, Input} from 'components/dumb/Base';
import reactForm from 'components/smart/Form';
import styles from './Form.css';

class LoginForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updateLoggedUser: PropTypes.func.isRequired,
  }

  submitForm = (values) => {
    return this.props.updateLoggedUser(values);
  }

  render() {
    const {fields: {firstName, lastName}, initialValues: {email}, handleSubmit} = this.props;
    return (
      <form className={styles.form} onSubmit={handleSubmit(this.submitForm)}>
        <H3>Edit your profile</H3>
        <Input
          hintText="Please, enter first name"
          floatingLabelText="First Name"
          errorText={firstName.error}
          {...firstName}
        />
        <Input
          hintText="Please, enter last name"
          floatingLabelText="Last Name"
          errorText={lastName.error}
          {...lastName}
        />
        <Input
          floatingLabelText="Last Name"
          value={email}
          disabled
        />
        <Button label="Save" type="submit" />
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

  return errors;
}

export default reactForm({
  fields: ['firstName', 'lastName'],
  validation,
}, (state) => { // select
  const loggedUserId = state.auth && state.auth.userId;
  return {
    initialValues: state.entities.users[loggedUserId] || {},
  };
}, {
  updateLoggedUser,
})(LoginForm);
