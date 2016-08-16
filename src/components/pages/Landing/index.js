// libs
import React from 'react';
import {connect} from 'react-redux';
// actions
// components

class LandingPage extends React.Component {
  render() {
    return (<div>LandingPage</div>);
  }
}

function select(/* state, ownProps */) {
  return {
  };
}

export default connect(select, {

})(LandingPage);
