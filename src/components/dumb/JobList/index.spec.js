import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import JobItem from 'components/dumb/JobItem';
import {reactWarnings} from 'helpers/test';
import JobsList from './index.js';


test('JobList', (t) => {
  reactWarnings.watchConsole();
  shallow(<JobsList />);

  t.regex(reactWarnings.propWarnings()[0], /Failed prop type: Required prop `jobs` was not specified/,
    'defines prop types for the jobs property');
});

test('JobList', (t) => {
  const wrapper = shallow(<JobsList jobs={[]} />);

  t.is(wrapper.find(JobItem).length, 0, 'doesn\'t render JobItem elements when jobs is empty array');
});

test('JobList', (t) => {
  const jobs = [{}, {}, {}, {}];
  const wrapper = shallow(<JobsList jobs={jobs} />);

  t.is(wrapper.find(JobItem).length, jobs.length, 'renders all jobs');
});
