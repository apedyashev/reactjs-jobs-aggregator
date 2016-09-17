// libs
import React, {PropTypes} from 'react';
// components
import {Link} from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import SettingsNavItem from 'components/dumb/SettingsNavItem';
import styles from '../index.css';

export default function TopNavAuthenticated({user, signOut}) {
  return (<div className={styles.container}>
    <div className={styles.items}>
      <Link to="/dashboard" className={styles.item} activeClassName={styles.active}>
        <MenuItem primaryText="Dashboard" />
      </Link>
      <Link to="/statistics" className={styles.item} activeClassName={styles.active}>
        <MenuItem primaryText="Statistics" />
      </Link>
      <SettingsNavItem className={styles.item} user={user} onSignOutClicked={signOut} />
    </div>
  </div>);
}

TopNavAuthenticated.propTypes = {
  authenticated: PropTypes.bool,
  user: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};
