// libs
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
// actions
// components

export default (options, mapStateToProps, mapDispatchToProps) => {
  if (!_.isArray(options.fields)) {
    throw new Error('Please specify the fields array');
  }

  return (Form) => {
    // const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

    class ReduxForm extends React.Component {
      state = {};
      fields = options.fields;
      isValid = true;

      componentWillMount() {
        // const initialValues = {email: 'user@example.com', password: '12345678'};
        const initialValues = (this.props && _.isPlainObject(this.props.initialValues)) ? this.props.initialValues : {};
        const fields = _(this.fields).zipObject().mapValues((value, fieldName) => {
          const objectField = {
            name: fieldName,
            value: initialValues[fieldName] || '',
            onChange: (event/* , newValue */) => {
              // objectField.value = newValue;
              objectField.value = event.target.value;
              this.validate();
            },
            onBlur: () => {
              if (options.validation) {
                this.validate();
              }
            },
          };
          return objectField;
        }).value();

        this.setState({fields});
      }

      getValues(fields) {
        const values = _.mapValues(fields, (field) => {
          return field.value;
        });

        return values;
      }

      validate() {
        const {fields} = this.state;
        const values = this.getValues(fields);
        const errors = options.validation(values);
        _.forEach(fields, (field) => {
          field.error = null;
        });
        this.isValid = true;
        _.forIn(errors, (value, key) => {
          fields[key].error = value;
          this.isValid = false;
        });
        this.setState({fields});
      }

      submit = () => {
        this.validate();
        if (this.isValid) {
          const values = this.getValues(this.state.fields);
          this.submitFn(values);
        }
      }

      handleSubmit = (submitFn) => {
        this.submitFn = submitFn;
        return (e) => {
          this.validate();
          if (!this.isValid) {
            e.preventDefault();
            return false;
          }

          const values = this.getValues(this.state.fields);
          submitFn(values);
          return true;
        };
      }

      render() {
        console.log('lib form render');
        return (<Form
          {...this.props}
          fields={this.state.fields}
          handleSubmit={this.handleSubmit}
          submit={this.submit}
        />);
      }
    }
    return connect(mapStateToProps, mapDispatchToProps)(ReduxForm);
    // return ReduxForm;
  };
};