// libs
import React, {PropTypes} from 'react';
// actions
import {saveSubscription} from 'actions/Subscription';
// components
import {Input} from 'components/dumb/Base';
import Keywords from 'components/dumb/Keywords';
import CitiesList from 'components/dumb/CitiesList';
import reactForm from 'components/smart/Form';
// other
import styles from './index.css';

class SubscriptionEditForm extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    allCities: PropTypes.object,
    requests: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    saveSubscription: PropTypes.func.isRequired,
  };

  submitForm = (values) => {
    console.log('submit values = ', values);
    return this.props.saveSubscription(this.props.initialValues.id, values);
  }

  render() {
    const {fields: {title, keywords, cities}, handleSubmit, allCities, requests} = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitForm)}>
        <Input
          className={styles.title}
          hintText="Please, enter subscription title"
          floatingLabelText="Title"
          errorText={title.error}
          {...title}
        />
        <div>
          <Keywords {...keywords} />
        </div>
        <div>
          <CitiesList items={allCities} {...cities} value={cities.value || []} isLoading={requests.cities.isLoading} />
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
  return {
    initialValues: ownProps.subscription,
    allCities: state.entities.cities,
    requests: state.requests,
  };
}, {
  saveSubscription,
})(SubscriptionEditForm);
