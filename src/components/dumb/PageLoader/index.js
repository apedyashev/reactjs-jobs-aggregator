// libs
import React from 'react';
// components
import Loader from 'components/dumb/Loader';
// other
import styles from './index.css';

export default function PageLoader() {
  return (<div className={styles.pageLoader}>
    <Loader size={1.5} />
  </div>);
}
