/* eslint react/prefer-stateless-function: "off" */
// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
// actions
import {loadDashboardPage} from 'actions/Dashboard';
// components
import SubscriptionList from 'components/smart/SubscriptionList';
import JobItem from 'components/dumb/JobItem';
import styles from './index.css';


class DashboardPage extends React.Component {
  static propTypes = {
    loadDashboardPage: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadDashboardPage();
  }

  render() {
    const {subscriptions, jobs} = this.props;
    return (<div className={styles.container}>
      <div className={styles.subscriptions}>
        <SubscriptionList subscriptions={subscriptions} />

      </div>
      <div className={styles.jobsList}>
        {_.map(jobs, (job) => {
          return <JobItem key={job.id} data={job} />;
        })}
      </div>

    </div>);
  }
}

function select(state /* , ownProps */) {
  return {
    user: state.entities.users || {},
    subscriptions: state.entities.subscriptions || {},
    jobs: state.entities.jobs || {},
  };
}

export default connect(select, {
  loadDashboardPage,
})(DashboardPage);
