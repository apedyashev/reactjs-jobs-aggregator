import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {reactWarnings} from 'helpers/test';
import CityItem from './index.js';
import Checkbox from 'material-ui/Checkbox';

test('CityItem', (t) => {
  reactWarnings.watchConsole();
  const wrapper = shallow(<CityItem />);

  t.is(wrapper.type(), Checkbox, 'renders Checkbox as root element');
  t.regex(reactWarnings.propWarnings()[0], /Failed prop type: Required prop `id` was not specified/,
    'defines prop types validation for the id property');
  t.regex(reactWarnings.propWarnings()[1], /Failed prop type: Required prop `name` was not specified/,
    'defines prop types validation for the name property');
  t.regex(reactWarnings.propWarnings()[2], /Failed prop type: Required prop `defaultChecked` was not specified/,
    'defines prop types validation for the defaultChecked property');
  t.regex(reactWarnings.propWarnings()[3], /Failed prop type: Required prop `onCheck` was not specified/,
    'defines prop types validation for the onCheck property');
});

test('CityItem', (t) => {
  const cityProps = {
    id: 123,
    name: 'cool city',
    onCheck: sinon.spy(),
    defaultChecked: true,
  };
  const wrapper = shallow(<CityItem {...cityProps} />);

  t.is(wrapper.props().label, cityProps.name, 'sets the label property of Checkbox to ownProps.name');
  t.is(wrapper.props().defaultChecked, cityProps.defaultChecked,
    'sets the defaultChecked property of Checkbox to ownProps.defaultChecked');

  // test onCheck callback
  wrapper.simulate('check', 'event', true);
  t.is(cityProps.onCheck.calledOnce, true, 'calls onCheck callback when it is clicked');
  t.deepEqual(cityProps.onCheck.args[0], [cityProps.id, 'event', true], 'calls onCheck callback when it is clicked (#1)');

  wrapper.simulate('check', 'new event', false);
  t.deepEqual(cityProps.onCheck.args[1], [cityProps.id, 'new event', false], 'calls onCheck callback when it is clicked (#2)');
});

test('CityItem', (t) => {
  const wrapper = shallow(<CityItem defaultChecked={false} />);

  t.is(wrapper.props().defaultChecked, false,
    'sets the defaultChecked property of Checkbox to ownProps.defaultChecked');
});
