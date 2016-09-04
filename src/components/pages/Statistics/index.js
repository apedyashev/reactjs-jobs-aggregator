// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
// actions
import {loadStatisticsPage} from 'actions/statistics';
// components
import ProgressBar from 'components/dumb/ProgressBar';

class StatisticsPage extends React.Component {
  static propTypes = {
    totalAvailabilities: PropTypes.number.isRequired,
    totalJobs: PropTypes.number.isRequired,
    availabilities: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    loadStatisticsPage: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadStatisticsPage();
  }

  render() {
    const {cities, availabilities, totalJobs, totalAvailabilities} = this.props;

    return (<div>
      Total {totalJobs} in {_.keys(cities).length} cities
      {_.map(cities, (city) => {
        return (<ProgressBar
          key={city.name}
          pctComplete={(city.count * 100) / totalJobs}
          backgroundColor="red"
        >
          {city.name} ({city.count})
        </ProgressBar>);
      })}

      {_.map(availabilities, (availability) => {
        return (<ProgressBar
          key={availability.name}
          pctComplete={(availability.count * 100) / totalAvailabilities}
          backgroundColor="green"
        >
          {availability.name} ({availability.count})
        </ProgressBar>);
      })}
    </div>);
  }
}

function select(state) {
  const {cities, availabilities} = state.entities.statistics;
  const totalJobs = _.reduce(cities, (prev, cur) => {
    return {count: (prev.count + cur.count)};
  }, {count: 0}).count;
  const totalAvailabilities = _.reduce(availabilities, (prev, cur) => {
    return {count: (prev.count + cur.count)};
  }, {count: 0}).count;
  return {
    cities: _.orderBy(cities, 'count', 'desc'),
    availabilities: _.orderBy(availabilities, 'count', 'desc'),
    totalJobs,
    totalAvailabilities,
  };
}

export default connect(select, {
  loadStatisticsPage,
})(StatisticsPage);
