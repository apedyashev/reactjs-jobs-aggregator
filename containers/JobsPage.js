import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadJobs } from '../actions/ja';
// import { loadRepo, loadStargazers } from '../actions';
// import Repo from '../components/Repo';
// import User from '../components/User';
// import List from '../components/List';

function loadData(props) {
  // const { fullName } = props;
  console.log('-------------------------------------------');
  props.loadJobs();
}

class JobsPage extends Component {
  constructor(props) {
    super(props);
    // this.renderUser = this.renderUser.bind(this);
    // this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.loaded) {
      this.loaded = true;
      loadData(nextProps);
    }
  }

  // handleLoadMoreClick() {
  //   this.props.loadStargazers(this.props.fullName, true);
  // }

  renderJob(job) {
    return (
      <div key={job.id}> {job.title}</div>
    );
  }

  render() {
    const {jobs} = this.props;
    console.debug('jobs', jobs);
    let jobsArray = [];
    for(let id in jobs) {
      jobsArray.push(jobs[id]);
    }
    return (
      <div>
        <h3>Jobs</h3>
        {jobsArray.map(this.renderJob)}
      </div>
      );
  }
}

JobsPage.propTypes = {
  // repo: PropTypes.object,
  // fullName: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  // owner: PropTypes.object,
  // stargazers: PropTypes.array.isRequired,
  // stargazersPagination: PropTypes.object,
  loadJobs: PropTypes.func.isRequired,
};


function select(state) {
  console.log('state.entities.jobs', state);
  const jobs = state.entities.jobs || []; //[{_id: 'sds', title: 'job 1'}];
  return {
     jobs
  };
}

// connect(): http://rackt.github.io/redux/docs/basics/UsageWithReact.html
// https://github.com/rackt/react-redux
// export default connect(select)(JobsPage);
export default connect(select, {
  loadJobs
})(JobsPage);
