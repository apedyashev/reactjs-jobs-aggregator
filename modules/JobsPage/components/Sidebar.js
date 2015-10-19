import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSubscriptions } from '../actions/Subscription';


export default class JobsSidebar extends Component {
  componentWillMount() {
    this.props.loadSubscriptions();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.loaded) {
      this.loaded = true;
      this.props.loadSubscriptions();
    }
  }

  render() {
    return (
      <ul> 
        <li><b>Subscriptions</b></li>
        <li>subscr1</li>
        <li>subscr2</li>
      </ul>
    );
  }
}

function select(state) {
  // console.log('state.entities.jobs', state);
  // const jobs = state.entities.jobs || []; //[{_id: 'sds', title: 'job 1'}];
  return {
     // jobs
  };
}

// connect(): http://rackt.github.io/redux/docs/basics/UsageWithReact.html
// https://github.com/rackt/react-redux
// export default connect(select)(JobsPage);
export default connect(select, {
  loadSubscriptions
})(JobsSidebar);
