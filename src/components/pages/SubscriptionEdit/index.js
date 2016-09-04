// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// actions
import {loadSubscriptionPage} from 'actions/subscription';
// components
import EditForm from './Form';

class SubscriptionEdit extends React.Component {
  static propTypes = {
    subscription: PropTypes.object.isRequired,
    loadSubscriptionPage: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadSubscriptionPage();
  }

  render() {
    return (<div>
      <EditForm key={this.props.subscription.id} subscription={this.props.subscription} />
    </div>);
  }
}

function select(state, ownProps) {
  const {id} = ownProps.params;
  const {subscriptions} = state.entities;
  const subscription = (id && subscriptions && subscriptions[id]) ? subscriptions[id] : {};

  return {
    subscription,
  };
}

export default connect(select, {
  loadSubscriptionPage,
})(SubscriptionEdit);
