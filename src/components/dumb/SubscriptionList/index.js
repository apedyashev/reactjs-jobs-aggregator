// libs
import React, {PropTypes} from 'react';
import _ from 'lodash';
// actions
// components
import SubscriptionItem from 'components/dumb/SubscriptionItem';
import {List} from 'material-ui/List';


class SubscriptionList extends React.Component {
  static propTypes = {
    subscriptions: PropTypes.object.isRequired,
    removeSubscription: PropTypes.func.isRequired,
  };

  state = {itemToBeRemovedId: false};

  handleItemRemoveRequest = (itemId, remove) => {
    const itemToBeRemovedId = remove ? itemId : null;
    this.setState({itemToBeRemovedId});
  }

  render() {
    const {subscriptions} = this.props;
    const {itemToBeRemovedId} = this.state;

    return (<List>
      {_.map(subscriptions, (subscription) => {
        return (<SubscriptionItem
          key={subscription.id}
          data={subscription}
          removeRequested={itemToBeRemovedId === subscription.id}
          onRemoveRequesChanged={this.handleItemRemoveRequest}
          removeConfirmed={this.props.removeSubscription}
        />);
      })}
    </List>);
  }
}

export default SubscriptionList;
