import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import JobItem from './JobItem';
import List from '../../Core/components/List';
import {loadJobs} from '../actions/Job'

class JobsList extends Component {

  componentWillMount() {
    this.props.loadJobs();
  }

  renderJob(job) {
    return (
        <JobItem job={job}
          key={job.id}>
        </JobItem>
    );
  }

  loadMore() {

  }

  render() {
   return (<List renderItem={this.renderJob}
        items={this.props.jobs}
        onLoadMoreClick={this.loadMore}
        loadingLabel={`Loading jobs...`}
      />
    );
  }
}

JobsList.propTypes = {

};

JobsList.defaultProps = {

};

function mapStateToProps(state) {
  const jobs = state.entities.jobs || [];
  return {
    jobs
  };
}

export default connect(mapStateToProps, {
  loadJobs
})(JobsList);
