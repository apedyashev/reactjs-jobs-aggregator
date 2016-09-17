// libs
import React from 'react';
// actions
// components
import {H3} from 'components/dumb/Base';
import RegisterForm from './Form';

class RegisterPage extends React.Component {
  render() {
    return (<div>
      <H3>Create an account</H3>
      <RegisterForm />
    </div>);
  }
}

export default RegisterPage;
