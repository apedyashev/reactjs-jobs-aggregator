// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
// actions
import {loadJobs} from 'actions/Job';
// components
import Waypoint from 'react-waypoint';
import Loader from 'components/dumb/Loader';
import JobsPaginationItem from 'components/dumb/JobList';

class JobList extends React.Component {
  static propTypes = {
    subscriptionId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    areJobsLoading: PropTypes.bool.isRequired,
    pagedJobs: PropTypes.array.isRequired,
    offset: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    loadJobs: PropTypes.func.isRequired,
  };

  handleNextPageWaypointEnter = () => {
    const {subscriptionId, limit, offset} = this.props;
    this.props.loadJobs({subscriptionId, limit, offset: (limit + offset)});
  }

  render() {
    const {subscriptionId, pagedJobs, areJobsLoading} = this.props;
    return (<div ref="container">
      {_.map(pagedJobs, (jobsForPage, id) => {
        return <JobsPaginationItem key={id} jobs={jobsForPage} />;
      })}
      {areJobsLoading ? (<Loader />) : null}
      <Waypoint
        key={subscriptionId}
        onEnter={this.handleNextPageWaypointEnter}
        threshold={0.2}
      />
    </div>);
  }
}

function select(state, ownProps) {
  // const subscriptionId = ownProps.params.id;
  const {subscriptionId} = ownProps;
  const {jobs, subscriptionJobs} = state.entities;
  let selectedJobs = jobs || {};
  if (subscriptionId && subscriptionJobs) {
    const jobIds = state.entities.subscriptionJobs[subscriptionId] || {};
    selectedJobs = _.map(jobIds, (jobId) => {
      return jobs[jobId];
    });
  }
  console.log(subscriptionId, selectedJobs);
  const perPage = ownProps.limit || 20;
  const totalCount = _.keys(selectedJobs).length;
  const pagedJobs = _(selectedJobs).keys().chunk(perPage).value()
    .map((curChunk) => {
      return curChunk.map((id) => {
        return selectedJobs[id];
      });
    });
  return {
    subscriptionId,
    pagedJobs,
    limit: perPage,
    offset: totalCount,
    areJobsLoading: state.requests.jobs.isLoading,
  };
}

export default connect(select, {
  loadJobs,
})(JobList);
