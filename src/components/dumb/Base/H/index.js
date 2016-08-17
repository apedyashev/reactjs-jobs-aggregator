// libs
import React from 'react';

export default function header(num) {
  return function H({children}) {
    return React.createElement(`h${num}`, {children});
  };
}
