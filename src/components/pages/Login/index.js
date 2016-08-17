// libs
import React from 'react';
// actions
// components
import {H3, Button} from 'components/dumb/Base';
import LoginForm from './Form';
import styles from './index.css';

class LoginPage extends React.Component {
  submitForm = () => {
    this.refs.loginForm.submit();
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <H3>Login</H3>
          <LoginForm ref="loginForm" />

          <section>
            <div>Need account?</div>
            <div>
              <Button label="Login" onClick={this.submitForm} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default LoginPage;
