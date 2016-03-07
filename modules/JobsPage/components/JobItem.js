import React, { Component, PropTypes } from 'react';
import {ListItem} from 'material-ui/lib';
import '../less/job-item'
export default class JobItem extends Component {
  render() {
    const job = this.props.job;

    return (
        <a href={job.link} target="_blank" className="job-item">
            <ListItem
                primaryText={<span>{job.title} <small>at {job.company}</small></span>}
                secondaryText={job.shortDescription}
            />
        </a>
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
