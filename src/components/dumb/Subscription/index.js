// libs
import React from 'react';
// import MenuItem from 'material-ui/MenuItem';
import {ListItem} from 'material-ui/List';

export default function Subscription({data}) {
  return <ListItem primaryText={data.title} />;
}
