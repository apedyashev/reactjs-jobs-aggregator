/* eslint react/prefer-stateless-function: "off" */
// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
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
      <JobList jobs={jobs} />
    </div>);
  }
}

function select(state, ownProps) {
  return {
    subscriptionId: ownProps.params.id,
    jobs: state.entities.jobs || {},
  };
}

export default connect(select, {
  loadJobs,
})(DashboardPage);
