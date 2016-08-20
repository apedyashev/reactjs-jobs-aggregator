// libs
import React from 'react';
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
