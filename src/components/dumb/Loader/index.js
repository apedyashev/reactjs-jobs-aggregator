// libs
import React, {PropTypes} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default function Loader({size = 0.5}) {
  return (
    <div>
      <CircularProgress size={size} style={{display: 'block', margin: 'auto'}} />
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.number,
};
