// libs
import React, {PropTypes} from 'react';
// import {connect} from 'react-redux';
import _ from 'lodash';
// actions
// components
import SubscriptionItem from 'components/dumb/SubscriptionItem';
import {List} from 'material-ui/List';

export default function SubscriptionList({subscriptions}) {
  return (<List>
    {_.map(subscriptions, (subscription) => {
      return <SubscriptionItem key={subscription.id} data={subscription} />;
    })}
  </List>);
}

SubscriptionList.propTypes = {
  subscriptions: PropTypes.object.isRequired,
};
