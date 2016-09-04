// libs
import React, {PropTypes} from 'react';
import styles from './index.css';

export default function ProgressBar({children, pctComplete, backgroundColor}) {
  return (
    <div className={styles.component}>
      <div style={{backgroundColor, width: `${pctComplete}%`}} className={styles.body}>
        {children}
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  pctComplete: PropTypes.number,
  backgroundColor: PropTypes.string,
};
