// libs
import React/* , {PropTypes} */ from 'react';
import {connect} from 'react-redux';
// actions
// components

class SettingsProfile extends React.Component {
  static propTypes = {};
  render() {
    return (<div>SettingsProfile</div>);
  }
}

function select(/* state */) {
  return {
  };
}

export default connect(select, {

})(SettingsProfile);
