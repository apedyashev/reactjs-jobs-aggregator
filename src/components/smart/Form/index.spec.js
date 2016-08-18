import test from 'ava';
import {/* shallow, */ mount} from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import jsdom from 'jsdom';
import _ from 'lodash';
import reduxFormHoc from './index.js';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const mockStore = configureStore();

function init(fields) {
  class Form extends React.Component {
    render() {
      // const {fields: {id, name}} = this.props;
      const fieldProps = _(fields).zipObject().mapValues((value, fieldName) => {
        return this.props.fields[fieldName];
      }).value();

      return (
        <form>
          {fields.map((fieldName) => {
            return <input key={fieldName} {...fieldProps[fieldName]} />;
          })}
        </form>
      );
    }
  }

  const FormConnected = reduxFormHoc({
    fields,
  }, () => {
    return {a: 1};
  }, {})(Form);

  return FormConnected;
}
// const fields = ['id', 'name'];


test('The redux form HOC', (t) => {
  const store = mockStore({});
  const fields = ['id', 'name'];
  const FormConnected = init(fields);
  const wrapper = mount(<FormConnected store={store} />);

  fields.forEach((fieldName) => {
    const inputProps = wrapper.find(`input[name="${fieldName}"]`).props();
    t.is(inputProps.name, fieldName, `creates this.props.fields.${fieldName} prop that have the name=${fieldName}`);
    t.is(inputProps.value, '', `creates this.props.fields.${fieldName} prop that have value prop set to empty string`);
    t.is(_.isFunction(inputProps.onChange), true, `creates this.props.fields.${fieldName} prop with onChange method`);
    t.is(_.isFunction(inputProps.onBlur), true, 'creates this.props.fields.${fieldName} prop with onBlur method');
  });
});

test('The redux form HOC', (t) => {
  const store = mockStore({});
  const fields = [];
  const FormConnected = init(fields);
  const wrapper = mount(<FormConnected store={store} />);

  t.is(wrapper.find('input').length, 0, 'doesn\'t creates props.fields if fields config array is empty');
});

// test('foo', (t) => {
//   const store = mockStore({});
//   const wrapper = shallow(<FormConnected store={store} />);
//   t.deepEqual(wrapper.props(), {}, 'converts fields array into this.props.fields');
// });
