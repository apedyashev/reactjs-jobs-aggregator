// libs
import React, {PropTypes} from 'react';
import _ from 'lodash';
// components
import JobItem from 'components/dumb/JobItem';
import Loader from 'components/dumb/Loader';

export default function JobList({jobs, isLoading}) {
  return (
    <div>
      {_.map(jobs, (job) => {
        return <JobItem key={job.id} data={job} />;
      })}
      {isLoading ? (<Loader size={1} />) : null}
    </div>
  );
}

JobList.propTypes = {
  jobs: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
