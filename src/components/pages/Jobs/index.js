/* eslint react/prefer-stateless-function: "off" */
// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// actions
import {loadJobs} from 'actions/Job';
// components
import JobList from 'components/smart/JobList';


class DashboardPage extends React.Component {
  static propTypes = {
    subscriptionId: PropTypes.oneOfType([
      PropTypes.string, // it can be md5 hash for example
      PropTypes.number,
    ]),
    loadJobs: PropTypes.func.isRequired,
  };

  render() {
    return (<div>
      <JobList subscriptionId={this.props.subscriptionId} />
    </div>);
  }
}

function select(state, ownProps) {
  const subscriptionId = ownProps.params.id;
  return {
    subscriptionId,
  };
}

export default connect(select, {
  loadJobs,
})(DashboardPage);
