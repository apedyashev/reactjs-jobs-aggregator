// libs
import React, {PropTypes} from 'react';
// components
import Checkbox from 'material-ui/Checkbox';

export default function CityItem({id, name, defaultChecked = false, onCheck}) {
  const handleCheck = (event, isChecked) => {
    onCheck(id, event, isChecked);
  };

  return (<Checkbox
    label={name}
    defaultChecked={defaultChecked}
    onCheck={handleCheck}
  />);
}

CityItem.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
};
