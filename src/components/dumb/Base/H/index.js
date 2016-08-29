// libs
import React, {PropTypes} from 'react';

export default function header(num) {
  if ((num < 1) || (num > 6)) {
    throw new Error(`${num} is invalid value for header. Must be from 1 to 6`);
  }

  function H({children}) {
    return React.createElement(`h${num}`, {children});
  }

  H.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  return H;
}
