/* eslint react/prefer-stateless-function: "off" */
// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// actions
import {loadDashboardPage} from 'actions/Dashboard';
// components
import Sidebar from 'components/dumb/Sidebar';
import styles from './index.css';


class DashboardPage extends React.Component {
  static propTypes = {
    loadDashboardPage: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadDashboardPage();
  }

  render() {
    const {subscriptions, children} = this.props;
    return (<div className={styles.container}>
      <div className={styles.subscriptions}>
        <Sidebar subscriptions={subscriptions} />
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>);
  }
}

function select(state) {
  return {
    subscriptions: state.entities.subscriptions || {},
  };
}

export default connect(select, {
  loadDashboardPage,
})(DashboardPage);
