// libs
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
// actions
// components
import SubscriptionItem from 'components/dumb/SubscriptionItem';
import {List} from 'material-ui/List';

class SubscriptionList extends React.Component {
  render() {
    const {subscriptions} = this.props;
    return (<List>
      {_.map(subscriptions, (subscription) => {
        return <SubscriptionItem key={subscription.id} data={subscription} />;
      })}
    </List>);
  }
}

function select() {
  return {
  };
}

export default connect(select, {

})(SubscriptionList);
