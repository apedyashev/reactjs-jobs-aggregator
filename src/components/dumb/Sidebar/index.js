// libs
import React, {PropTypes} from 'react';
// actions
// components
import {IndexLink} from 'react-router';
import SubscriptionList from 'components/dumb/SubscriptionList';
import {ListItem} from 'material-ui/List';
import styles from './index.css';

export default function Sidebar({subscriptions, removeSubscription}) {
  Sidebar.propTypes = {
    subscriptions: PropTypes.object.isRequired,
    removeSubscription: PropTypes.func.isRequired,
  };

  return (<div>
    <IndexLink to="/dashboard/subscription/new" activeClassName={styles.active}>
      <ListItem primaryText="+ Add Subscription" />
    </IndexLink>
    <IndexLink to="/dashboard" activeClassName={styles.active}>
      <ListItem primaryText="All Jobs" />
    </IndexLink>

    <SubscriptionList
      subscriptions={subscriptions}
      removeSubscription={removeSubscription}
    />
  </div>);
}
