// libs
import React, {PropTypes} from 'react';
import styles from './index.css';

export default function ListItem(props) {
  return (
    <div className={styles.wrapper}>
      {props.children}
    </div>
  );
}

ListItem.propTypes = {
  children: PropTypes.node,
};
