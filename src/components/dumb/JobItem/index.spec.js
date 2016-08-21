import test from 'ava';
import React from 'react';
import {shallow, mount} from 'enzyme';
import JobItem from './index';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from 'components/MuiTheme';

test('JobItem', (t) => {
  const jobData = {};
  const wrapper = shallow(<JobItem data={jobData} />);

  t.is(wrapper.type(), Card, 'uses Card as root element');
  t.is(wrapper.find(CardHeader).length, 1, 'renders CardHeader');
  t.is(wrapper.find(CardText).length, 1, 'renders CardText');
});

test('JobItem', (t) => {
  const jobData = {};
  const wrapper = mount(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <JobItem data={jobData} />
    </MuiThemeProvider>
  );
  console.log(wrapper.find(CardHeader).text());
  t.is(wrapper.find(CardHeader).find('.title').text(), 'No Title', 'renders default title in CardHeader');
  t.is(wrapper.find(CardHeader).find('.subtitle').text(), 'No Date | No Company', 'renders default subtitle CardHeader');
  t.is(wrapper.find(CardText).text(), '', 'renders nothing in CardText');
});

test('JobItem', (t) => {
  const jobData = {
    title: 'awesome job',
    city: 'some city',
    company: 'cool company',
    date: new Date(),
    shortDescription: 'job description',
  };
  let wrapper = mount(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <JobItem data={jobData} />
    </MuiThemeProvider>
  );

  t.is(wrapper.find(CardHeader).find('.title').text(), `${jobData.title} in ${jobData.city}`,
    'renders correct title in CardHeader');
  t.is(wrapper.find(CardHeader).find('.subtitle').text(), `${jobData.date} | ${jobData.company}`,
    'renders correct subtitle CardHeader');
  t.is(wrapper.find(CardText).text(), jobData.shortDescription, 'renders correct text in CardText');

  jobData.city = '';
  wrapper = mount(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <JobItem data={jobData} />
    </MuiThemeProvider>
  );

  t.is(wrapper.find(CardHeader).find('.title').text(), `${jobData.title}`,
    'renders correct title in CardHeader when city is empty');
});
