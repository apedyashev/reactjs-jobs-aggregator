// libs
import React from 'react';
// actions
// components
import {Link} from 'react-router';
import SubscriptionList from 'components/dumb/SubscriptionList';
import {ListItem} from 'material-ui/List';
import styles from './index.css';

export default function Sidebar({subscriptions}) {
  return (<div>
    <Link to="/dashboard/subscription/new" activeClassName={styles.active}>
      <ListItem primaryText="+ Add Subscription" />
    </Link>
    <Link to="/dashboard" activeClassName={styles.active}>
      <ListItem primaryText="All Jobs" />
    </Link>

    <SubscriptionList subscriptions={subscriptions} />
  </div>);
}
