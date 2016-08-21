// libs
import React, {PropTypes} from 'react';
// components
import Checkbox from 'material-ui/Checkbox';

export default function CityItem({id, name, defaultChecked, onCheck}) {
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
  name: PropTypes.string.isRequired,
};
