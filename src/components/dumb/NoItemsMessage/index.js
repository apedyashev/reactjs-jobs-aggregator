// libs
import React, {PropTypes} from 'react';
// components
import MdMoodBad from 'react-icons/lib/md/mood-bad';
// other
import styles from './index.css';

export default function NoItemsMessage({text}) {
  return (
    <div className={styles.component}>
      <MdMoodBad /> {text}
    </div>
  );
}
NoItemsMessage.propTypes = {
  text: PropTypes.string.isRequired,
};
