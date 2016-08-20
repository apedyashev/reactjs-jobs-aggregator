// libs
import React, {PropTypes} from 'react';
// import {connect} from 'react-redux';
// actions
import {saveSubscription} from 'actions/Subscription';
// components
import {Input, Button} from 'components/dumb/Base';
import reactForm from 'components/smart/Form';

class SubscriptionEditForm extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
  };

  submitForm = (values) => {
    console.log('submit values = ', values);
    return this.props.saveSubscription(this.props.initialValues.id, values);
  }

  render() {
    const {fields: {title, keywords, cities}, handleSubmit} = this.props;
    console.log('------------title', title, keywords, cities);
    return (
      <form ref={this.props.formRef} onSubmit={handleSubmit(this.submitForm)}>
        <Input
          hintText="Please, enter subscription title"
          floatingLabelText="Title"
          errorText={title.error}
          {...title}
        />
        <div>
          <Button type="submit" label="Save" />
        </div>
      </form>
    );
  }
}

function validation(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }

  return errors;
}

export default reactForm({
  fields: ['title', 'keywords', 'cities'],
  validation,
}, (state, ownProps) => { // select
  console.log('***', state, ownProps);
  return {
    initialValues: ownProps.subscription,
  };
}, {
  saveSubscription,
})(SubscriptionEditForm);
