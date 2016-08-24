// libs
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default function Loader({size = 1.5}) {
  return (
    <div>
      <CircularProgress size={size} style={{display: 'block', margin: 'auto'}} />
    </div>
  );
}
