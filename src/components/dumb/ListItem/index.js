// libs
import React from 'react';
import styles from './index.css';

export default function ListItem(props) {
  return (
    <div className={styles.wrapper}>
      {props.children}
    </div>
  );
}
