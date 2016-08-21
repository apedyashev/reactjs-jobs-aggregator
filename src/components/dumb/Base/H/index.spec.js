import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import header from './index';

test('H::header', (t) => {
  t.throws(() => {
    header(0);
  }, '0 is invalid value for header. Must be from 1 to 6', 'must throw an error when num argument is less than 1');

  t.throws(() => {
    header(7);
  }, '7 is invalid value for header. Must be from 1 to 6', 'must throw an error when num argument is greater than 6');

  for (let i = 1; i <= 6; i++) {
    t.notThrows(() => {
      header(i);
    }, 'not throws an error when 1 <= num <= 6');

    const H = header(i);
    const children = `children${i}`;
    const wrapper = shallow(<H>{children}</H>);
    const standardHeader = React.createElement(`h${i}`, {children});
    t.is(wrapper.contains(standardHeader), true, `must render h${i} element with ${children} as children`);
  }
});
