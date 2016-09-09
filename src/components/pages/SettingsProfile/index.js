// libs
import React/* , {PropTypes} */ from 'react';
import {connect} from 'react-redux';
// actions
// components
import ProfileForm from './Form';

class SettingsProfile extends React.Component {
  static propTypes = {};
  render() {
    return (<div>
      <ProfileForm />
    </div>);
  }
}

function select(/* state */) {
  return {
  };
}

export default connect(select, {

})(SettingsProfile);
