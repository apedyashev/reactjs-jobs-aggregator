// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
// actions
import {loadStatisticsPage} from 'actions/statistics';
// components
import {H4} from 'components/dumb/Base';
import Loader from 'components/dumb/Loader';
import StatsList from './StatsList';

class StatisticsPage extends React.Component {
  static propTypes = {
    maxAvailabilities: PropTypes.number.isRequired,
    maxJobs: PropTypes.number.isRequired,
    totalJobs: PropTypes.number.isRequired,
    request: PropTypes.object.isRequired,
    availabilities: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    loadStatisticsPage: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadStatisticsPage();
  }

  render() {
    const {cities, availabilities, maxJobs, totalJobs, maxAvailabilities, request: {isLoading}} = this.props;
    if (isLoading) {
      return <Loader />;
    }

    return (<div>
      <H4>Total {totalJobs} jobs in {cities.length} cities</H4>
      <StatsList items={cities} maxValue={maxJobs} color="red" />
      <H4>Occupancies statistics</H4>
      <StatsList items={availabilities} maxValue={maxAvailabilities} color="green" />
    </div>);
  }
}

function select(state) {
  const {cities, availabilities} = state.entities.statistics;
  const maxJobs = _.max(_.map(cities, (city) => city.count)) || 0;
  const maxAvailabilities = _.max(_.map(availabilities, (availability) => availability.count)) || 0;
  const totalJobs = _.reduce(cities, (prev, cur) => ({count: (prev.count + cur.count)}), {count: 0}).count;

  return {
    cities: _.orderBy(cities, 'count', 'desc'),
    availabilities: _.orderBy(availabilities, 'count', 'desc'),
    request: state.requests.statistics,
    maxJobs,
    maxAvailabilities,
    totalJobs,
  };
}

export default connect(select, {
  loadStatisticsPage,
})(StatisticsPage);
