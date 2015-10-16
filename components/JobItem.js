import React, { Component, PropTypes } from 'react';

export default class JobItem extends Component {
  render() {
    const job = this.props.job;

    return (
     <div> 
      <a href={job.link} target="_blank">{job.title}</a> at {job.company}
      </div>
    );
  }
}

// JobItem.propTypes = {
  // user: PropTypes.shape({
  //   login: PropTypes.string.isRequired,
  //   avatarUrl: PropTypes.string.isRequired,
  //   name: PropTypes.string
  // }).isRequired
// };
