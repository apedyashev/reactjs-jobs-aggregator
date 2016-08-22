import test from 'ava';
import React from 'react';
import {shallow, mount} from 'enzyme';
// import sinon from 'sinon';
import {reactWarnings} from 'helpers/test';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Loader from 'components/dumb/Loader';
import Infinite from 'react-infinite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from 'components/MuiTheme';
import CityItem from './index.js';

test('CitiesList', (t) => {
  reactWarnings.watchConsole();
  const wrapper = shallow(<CityItem />);

  t.is(wrapper.type(), Card, 'renders Card as root element');
  t.regex(reactWarnings.propWarnings()[0], /Failed prop type: Required prop `value` was not specified/,
    'defines prop types validation for the value property');
  t.regex(reactWarnings.propWarnings()[1], /Failed prop type: Required prop `onChange` was not specified/,
    'defines prop types validation for the onChange property');
  t.regex(reactWarnings.propWarnings()[2], /Failed prop type: Required prop `isLoading` was not specified/,
    'defines prop types validation for the isLoading property');
});

test('CitiesList', (t) => {
  const props = {
    value: ['city1', 'city3'],
    onChange: () => {},
    isLoading: false,
    items: [],
  };
  const wrapper = mount(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <CityItem {...props} />
    </MuiThemeProvider>
  );

  t.is(wrapper.find(CardHeader).length, 1, 'renders CardHeader');
  t.is(wrapper.find(CardHeader).find('input').length, 1, 'renders input');
  t.is(wrapper.find(CardText).length, 1, 'renders CardText');
  t.is(wrapper.find(CardText).find(Infinite).length, 1, 'renders Infinite');
  t.is(wrapper.find(CardText).text(), '', 'has no content inside of CardText');
});

test('CitiesList', (t) => {
  const props = {
    value: ['city1', 'city3'],
    onChange: () => {},
    isLoading: true,
    items: [{name: 'city1'}, {name: 'city2'}, {name: 'city3'}, {name: 'city4'}],
  };
  const wrapper = mount(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <CityItem {...props} />
    </MuiThemeProvider>
  );

  t.is(wrapper.find(CardText).find(Loader).length, 1, 'renders Loader');
  // t.is(wrapper.find(CityItem).length, props.items.length, 'has no content inside of CardText');
});
