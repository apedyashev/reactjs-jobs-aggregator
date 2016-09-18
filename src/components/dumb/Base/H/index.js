// libs
import React, {PropTypes} from 'react';
import styles from './index.css';

export default function header(num) {
  if ((num < 1) || (num > 6)) {
    throw new Error(`${num} is invalid value for header. Must be from 1 to 6`);
  }

  function H({children}) {
    return React.createElement(`h${num}`, {children, className: styles[`h${num}`]});
  }

  H.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  return H;
}
