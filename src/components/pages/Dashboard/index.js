/* eslint react/prefer-stateless-function: "off" */
// libs
import React from 'react';
import {connect} from 'react-redux';

import _ from 'lodash';
// actions
// components
import {Link} from 'react-router';
import ListItem from 'components/dumb/ListItem';

class DashboardPage extends React.Component {
  static propTypes = {
    // loadLoggedUser: PropTypes.func.isRequired,
  };


  render() {
    const {repos} = this.props;
    return (<div>
      {this.props.user.name} | <Link to="/about">About</Link>
      <hr />
      {_.map(repos, (value, repo) => {
        return <ListItem key={repo}>{repo}</ListItem>;
      })}
    </div>);
  }
}

function select(state /* , ownProps */) {
  return {
    user: state.entities.users || {},
  };
}

export default connect(select, {

})(DashboardPage);