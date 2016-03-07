import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {RaisedButton} from 'material-ui/lib'
import {TextField} from 'material-ui/lib'
export const fields = ['email', 'password'];


const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length <= 6) {
        errors.username = 'Password should be longer';
    }
    return errors;
};

class SynchronousValidationForm extends Component {
    render() {
        const {fields: {email, password}, resetForm, handleSubmit, submitting} = this.props;
        return (<form className="form-login" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-xs-12 text-center">
                    <h3>Login</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <TextField
                        hintText="Please, enter your email"
                        errorText={email.touched && email.error && email.error}
                        floatingLabelText="Email"
                        ref="email"
                        {...email}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <TextField
                    hintText="Please, enter your password"
                    errorText={password.touched && password.error && password.error}
                    floatingLabelText="Password"
                    type="password"
                    ref="password"
                    {...password}
                />
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 text-center">
                    <RaisedButton type="submit" label="Submit" onClick={this.submitForm}/>
                </div>
            </div>
        </form>
        );
    }
}

SynchronousValidationForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'synchronousValidation',
    fields,
    validate
})(SynchronousValidationForm);