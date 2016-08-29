// libs
import React, {PropTypes} from 'react';
// components
import {Link} from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import styles from './index.css';

export default function TopBar({authenticated}) {
  let items;
  if (authenticated) {
    items = (
      <div className={styles.items}>
        <Link to="/dashboard" className={styles.item} activeClassName={styles.active}>
          <MenuItem primaryText="Dashboard" />
        </Link>
        <Link to="/stats" className={styles.item} activeClassName={styles.active}>
          <MenuItem primaryText="Statistics" />
        </Link>
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

TopBar.propTypes = {
  authenticated: PropTypes.bool,
};
