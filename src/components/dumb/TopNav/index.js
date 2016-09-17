// libs
import React, {PropTypes} from 'react';
// components
import {Link} from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import SettingsNavItem from 'components/dumb/SettingsNavItem';
import styles from './index.css';

export default function TopNav({authenticated, user, signOut}) {
  let items;
  if (authenticated) {
    items = (
      <div className={styles.items}>
        <Link to="/dashboard" className={styles.item} activeClassName={styles.active}>
          <MenuItem primaryText="Dashboard" />
        </Link>
        <Link to="/statistics" className={styles.item} activeClassName={styles.active}>
          <MenuItem primaryText="Statistics" />
        </Link>
        <SettingsNavItem className={styles.item} user={user} onSignOutClicked={signOut} />
      </div>
    );
  } else {
    items = (
      <div className={styles.items}>
        <Link to="/login" className={styles.item} activeClassName={styles.active}>
          <MenuItem primaryText="Login" />
        </Link>
        <Link to="/register" className={styles.item} activeClassName={styles.active}>
          <MenuItem primaryText="Register" />
        </Link>
      </div>
    );
  }

  return <div className={styles.container}>{items}</div>;
}

TopNav.propTypes = {
  authenticated: PropTypes.bool,
  user: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};
