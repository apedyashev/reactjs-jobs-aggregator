import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadJobs } from './actions/Job';
import JobsSidebar from './components/Sidebar';
import JobsList from './components/JobsList';
import { pushState } from 'redux-router';

function loadData(props) {
  props.loadJobs();
}

class JobsPage extends Component {
  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.loaded) {
      this.loaded = true;
      loadData(nextProps);
    }
  }


  render() {
    return (
      <div>
        <div style={{float:'left', width: '20%'}}>
          <JobsSidebar />
        </div>
        <div style={{float:'left', width: '80%'}}>
          <h3>Jobs</h3>
          <JobsList />
        </div>
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
  const jobs = state.entities.jobs || []; 
  return {
     jobs
  };
}

// connect(): http://rackt.github.io/redux/docs/basics/UsageWithReact.html
// https://github.com/rackt/react-redux
// export default connect(select)(JobsPage);
export default connect(select, {
  loadJobs,
  pushState
})(JobsPage);
