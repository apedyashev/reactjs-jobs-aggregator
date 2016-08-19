// libs
import React from 'react';
// import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';

export default function JobItem({data}) {
  return (<Card>
    <CardHeader
      title={`${data.title} in ${data.city}`}
      subtitle={`${data.date} | ${data.company}`}
    />
    <CardText expandable={false}>
      {data.shortDescription}
    </CardText>
  </Card>);
}
