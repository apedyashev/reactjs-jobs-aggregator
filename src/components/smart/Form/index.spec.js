import test from 'ava';
import {/* shallow, */mount} from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
// import jsdom from 'jsdom';
import _ from 'lodash';
import reduxFormHoc from './index.js';

// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
// global.document = doc;
// global.window = doc.defaultView;

const mockStore = configureStore();

function init(options) {
  class Form extends React.Component {
    submitLoginForm = () => {

    }

    render() {
      const {handleSubmit} = this.props;
      const fieldProps = _(options.fields).zipObject().mapValues((value, fieldName) => {
        return this.props.fields[fieldName];
      }).value();

      return (
        <form onSubmit={handleSubmit(this.submitLoginForm)}>
          {options.fields.map((fieldName) => {
            return (<div key={fieldName}>
              <input type="text" {...fieldProps[fieldName]} />
              <span className={`${fieldName} error`}>{fieldProps[fieldName].error}</span>
            </div>);
          })}
          <input type="submit" />
        </form>
      );
    }
  }

  const FormConnected = reduxFormHoc({
    fields: options.fields,
    validation: options.validation,
  }, options.mapStateToProps, {})(Form);

  return FormConnected;
}
// const fields = ['id', 'name'];


test('The redux form HOC', (t) => {
  const store = mockStore({});
  const fields = ['id', 'name'];
  const FormConnected = init({fields});
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
  const FormConnected = init({fields});
  const wrapper = mount(<FormConnected store={store} />);

  t.is(wrapper.find('input[type="text"]').length, 0, 'doesn\'t creates props.fields if fields config array is empty');
});

test('The redux form HOC', (t) => {
  const store = mockStore({});
  const fields = ['firstName', 'lastName', 'email'];
  const FormConnected = init({
    fields,
    validation: (values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = 'First name is required';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (values.email.indexOf('@') < 0) {
        // just simple test to test different error message for single field
        errors.email = 'Invalid email format';
      }

      return errors;
    },
  });
  const wrapper = mount(<FormConnected store={store} />);

  t.is(wrapper.find('.firstName.error').text(), '', 'initializes validation error for the firstName field with empty string');
  t.is(wrapper.find('.lastName.error').text(), '', 'initializes validation error for the lastName field with empty string');
  t.is(wrapper.find('.email.error').text(), '', 'initializes validation error for the email field with empty string');

  // submit the form and then check if validation errors appeared
  wrapper.find('form').at(0).simulate('submit');

  t.is(wrapper.find('.firstName.error').text(), 'First name is required',
  'sets error for the firstName field to value defined in validation function()');
  t.is(wrapper.find('.lastName.error').text(), '',
    'doesn\'t change error for the lastName field (since there is no validation check for it)');
  t.is(wrapper.find('.email.error').text(), 'Email is required',
    'sets error for the email field to value defined in validation function()');

  // all fields have values, but email format is incorrect
  wrapper.find('input[name="firstName"]').simulate('change', {target: {value: 'john'}});
  wrapper.find('input[name="lastName"]').simulate('change', {target: {value: 'm'}});
  wrapper.find('input[name="email"]').simulate('change', {target: {value: 'deegl'}});
  wrapper.find('form').at(0).simulate('submit');

  t.is(wrapper.find('.firstName.error').text(), '', 'cleans validation error if value of firstName is not empty');
  t.is(wrapper.find('.lastName.error').text(), '',
  'doesn\'t change error for the lastName field (since there is no validation check for it)');
  t.is(wrapper.find('.email.error').text(), 'Invalid email format', 'checks email format if the field is not empty');

  // enter email with correct format
  wrapper.find('input[name="email"]').simulate('change', {target: {value: 'dee@gl'}});
  wrapper.find('form').at(0).simulate('submit');
  t.is(wrapper.find('.email.error').text(), '', 'cleans validation error when value of email has correct format');

  // check that validation is called on 'blur' event
  wrapper.find('input[name="firstName"]').simulate('change', {target: {value: ''}}).simulate('blur');
  wrapper.find('input[name="lastName"]').simulate('change', {target: {value: ''}});
  wrapper.find('input[name="email"]').simulate('change', {target: {value: ''}});
  t.is(wrapper.find('.firstName.error').text(), 'First name is required', 'sets validation error for firstName on \'blur\' event');
  t.is(wrapper.find('.lastName.error').text(), '',
    'doesn\'t change error for the lastName field after \'blur\' event (since there is no validation check for it)');
  t.is(wrapper.find('.email.error').text(), 'Email is required', 'sets validation error for email on \'blur\' event');
});

test('The redux form HOC', (t) => {
  const store = mockStore({});
  const fields = ['city', 'street'];
  const initialValues = {city: 'abv', street: 'cde'};
  const FormConnected = init({
    fields,
    mapStateToProps: () => {
      return {
        initialValues,
      };
    },
  });
  const wrapper = mount(<FormConnected store={store} />);

  t.is(wrapper.find('input[name="city"]').props().value, initialValues.city, 'uses initialValues config prop to initialize');
  t.is(wrapper.find('input[name="street"]').props().value, initialValues.street, 'uses initialValues config prop to initialize');
});
