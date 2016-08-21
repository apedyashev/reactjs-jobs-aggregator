// libs
import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

export default function JobItem({data}) {
  const defaults = {
    jobTitle: 'No Title',
    date: 'No Date',
    company: 'No Company',
  };
  const title = data.city ? `${data.title || defaults.jobTitle} in ${data.city}` : (data.title || defaults.jobTitle);
  const subtitle = `${data.date || defaults.date} | ${data.company || defaults.company}`;
  return (<Card>
    <CardHeader>
      <div className={['title'].join(' ')}>{title}</div>
      <div className={['subtitle'].join(' ')}>{subtitle}</div>
    </CardHeader>
    <CardText expandable={false}>
      {data.shortDescription}
    </CardText>
  </Card>);
}
