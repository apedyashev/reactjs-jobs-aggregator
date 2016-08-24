/* eslint react/prefer-stateless-function: "off" */
// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
// actions
import {loadJobs} from 'actions/Job';
// components
import JobList from 'components/dumb/JobList';


class DashboardPage extends React.Component {
  static propTypes = {
    loadJobs: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadJobs(this.props.subscriptionId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.subscriptionId !== this.props.subscriptionId) {
      this.props.loadJobs(newProps.subscriptionId);
    }
  }

  render() {
    const {jobs} = this.props;
    return (<div>
      <JobList jobs={jobs} isLoading={this.props.requests.isLoading} />
    </div>);
  }
}

function select(state, ownProps) {
  const subscriptionId = ownProps.params.id;
  const {jobs, subscriptionJobs} = state.entities;
  let selectedJobs = jobs || {};
  if (subscriptionId && subscriptionJobs) {
    const jobIds = state.entities.subscriptionJobs[subscriptionId] || {};
    selectedJobs = _.map(jobIds, (jobId) => {
      return jobs[jobId];
    });
  }
  return {
    subscriptionId,
    jobs: selectedJobs,
    requests: state.requests,
  };
}

export default connect(select, {
  loadJobs,
})(DashboardPage);
