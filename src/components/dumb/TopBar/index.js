// libs
import React from 'react';
// components
import {Link} from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import styles from './index.css';

export default function TopBar() {
  console.log(styles);
  return (
    <div className={styles.container}>
      <Link to="login" className={styles.item} activeClassName={styles.active}>
        <MenuItem primaryText="Login" />
      </Link>
      <Link to="register" className={styles.item} activeClassName={styles.active}>
        <MenuItem primaryText="Register" />
      </Link>
    </div>
  );
}
