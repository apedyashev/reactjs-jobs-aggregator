// libs
import React, {PropTypes} from 'react';
import _ from 'lodash';
// actions
// components
import SubscriptionItem from 'components/dumb/SubscriptionItem';
import Loader from 'components/dumb/Loader';
import {List} from 'material-ui/List';


class SubscriptionList extends React.Component {
  static propTypes = {
    subscriptions: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    removeSubscription: PropTypes.func.isRequired,
  };

  state = {itemToBeRemovedId: false};

  handleItemRemoveRequest = (itemId, remove) => {
    const itemToBeRemovedId = remove ? itemId : null;
    this.setState({itemToBeRemovedId});
  }

  render() {
    const {subscriptions, request: {isLoading, removingId}} = this.props;
    const {itemToBeRemovedId} = this.state;

    return (<List>
      {isLoading ? (<Loader />) : null}
      {_.map(subscriptions, (subscription) => {
        return (removingId !== subscription.id) ? (<SubscriptionItem
          key={subscription.id}
          data={subscription}
          removeRequested={itemToBeRemovedId === subscription.id}
          onRemoveRequesChanged={this.handleItemRemoveRequest}
          removeConfirmed={this.props.removeSubscription}
        />) : null;
      })}
    </List>);
  }
}

export default SubscriptionList;
