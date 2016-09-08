// libs
import React, {PropTypes} from 'react';
import _ from 'lodash';
// components
import ProgressBar from 'components/dumb/ProgressBar';

export default function StatsList({maxValue, items, color}) {
  return (<div>
    {_.map(items, (item) => {
      return (<ProgressBar
        key={item.name}
        pctComplete={maxValue ? ((item.count * 100) / maxValue) : 0}
        backgroundColor={color}
      >
        {item.name} ({item.count})
      </ProgressBar>);
    })}
  </div>);
}

StatsList.propTypes = {
  maxValue: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
};
