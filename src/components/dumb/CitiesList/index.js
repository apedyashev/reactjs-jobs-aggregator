// TODO: smart or dumb?
// libs
import React, {PropTypes} from 'react';
import _ from 'lodash';
// actions
// components
import {Card, CardHeader, CardText} from 'material-ui/Card';
import CityItem from 'components/dumb/CityItem';
import Infinite from 'react-infinite';

class CitiesList extends React.Component {
  static propTypes = {
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    searchText: '',
    sortedItems: [],
    items: [],
  };

  componentWillReceiveProps(newProps) {
    const sortedItems = _.sortBy(newProps.items, 'name');
    this.setState({
      // sorted items won't be changed, but items can be filtered using searchText
      sortedItems,
      items: sortedItems,
    });
  }

  handleCityChecked = (cityIndex, event, isChecked) => {
    let {value} = this.props;
    const {items} = this.state;
    if (isChecked) {
      // add checked city to the values array
      value.push(items[cityIndex].name);
    } else {
      // remove unchecked city
      value = _.without(value, items[cityIndex].name);
    }
    this.props.onChange(null, value);
  }

  handleSearchChange = (event) => {
    const searchText = event.target.value;
    const {sortedItems} = this.state;
    if (searchText) {
      this.setState({
        items: _.filter(sortedItems, (item) => {
          return item.name.match(new RegExp(searchText, 'i'));
        }),
      });
    } else {
      // display all cities
      this.setState({
        items: sortedItems,
      });
    }
  }

  render() {
    const {value} = this.props;
    const {items} = this.state;
    return (<Card>
      <CardHeader>
        Select cities
        <input onChange={this.handleSearchChange} />
      </CardHeader>
      <CardText expandable={false}>
        {!items.length ? 'Loading...' : null}
        <Infinite
          elementHeight={24}
          containerHeight={250}
          infiniteLoadBeginEdgeOffset={11}
        >
          {_.map(items, (city, i) => {
            return (<CityItem
              key={i}
              id={i}
              name={city.name}
              defaultChecked={value.indexOf(city.name) >= 0}
              onCheck={this.handleCityChecked}
            />);
          })}
        </Infinite>
      </CardText>
    </Card>);
  }
}

export default CitiesList;
