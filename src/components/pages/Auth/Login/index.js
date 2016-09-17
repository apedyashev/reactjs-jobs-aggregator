// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
// actions
// components
import {Link} from 'react-router';
import {H3, Button} from 'components/dumb/Base';
import LoginForm from './Form';
import styles from './index.css';

class LoginPage extends React.Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(newProps) {
    this.redirectIfLogged(newProps);
  }

  componentWillMount() {
    this.redirectIfLogged(this.props);
  }

  redirectIfLogged(props) {
    if (props.userId) {
      this.props.push('/dashboard');
    }
  }

  submitForm = () => {
    console.log(this.loginForm);
    this.loginFormApi.submit();
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <H3>Login</H3>
          <LoginForm methods={(methods) => { this.loginFormApi = methods; }} />

          <section className={styles.formFooter}>
            <div>
              <Link to="/register">Need account?</Link>
            </div>
            <div>
              <Button label="Login" onClick={this.submitForm} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    userId: state.auth ? state.auth.userId : null,
  };
}

export default connect(select, {
  push,
})(LoginPage);
