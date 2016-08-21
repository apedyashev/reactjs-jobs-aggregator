// libs
import React, {PropTypes} from 'react';
import _ from 'lodash';
// components
import JobItem from 'components/dumb/JobItem';

export default function JobList({jobs}) {
  return (
    <div>
      {_.map(jobs, (job) => {
        return <JobItem key={job.id} data={job} />;
      })}
    </div>
  );
}

JobList.propTypes = {
  jobs: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
