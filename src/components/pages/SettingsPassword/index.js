// libs
import React/* , {PropTypes} */ from 'react';
import {connect} from 'react-redux';
// actions
// components

class SettingsPassword extends React.Component {
  static propTypes = {};
  render() {
    return (<div>SettingsPassword</div>);
  }
}

function select(/* state */) {
  return {
  };
}

export default connect(select, {

})(SettingsPassword);
