import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class StatsPage extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h3>Stats</h3>
      </div>
      );
  }
}


function select(state) {
  return {
     
  };
}

// connect(): http://rackt.github.io/redux/docs/basics/UsageWithReact.html
// https://github.com/rackt/react-redux
export default connect(select)(StatsPage);
