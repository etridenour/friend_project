import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';
import * as validation from './forms/formValidation';
import * as fields from './forms/formFields';
import { Button } from 'reactstrap';

import '../styles/ForgotPassword.css';

class ForgotPassword extends Component {

    constructor(props){
        super(props)
        if(props.authenticated){
            this.props.history.push('/user');
        }
        this.props.clearMessages();
        
    }

    onSubmit = formProps => {
        this.props.forgotPassword(formProps, () => {
            console.log('in forgot password')
            this.props.history.push('/passwordsent');
        });
    };
    onChange = e => {
        this.props.clearMessages();
    };
    render() {

    const { handleSubmit } = this.props;
    return (
        <div>
            <div className='signupBg'></div>

                <div className='forgotPasswordBox'>
                    <form className='forgotPasswordForm' onSubmit={handleSubmit(this.onSubmit)}>
                    <h2 className='topTitle'>Water Cooler</h2>
                    <h2 className='forgotPasswordFormName'>Password Reset</h2>
                        <p className='centerText resetMessage'>Please enter your email. We will email instructions for password reset.</p>
                        <fieldset className='signField'>
                            <label className='signinLabels'>Email:</label>
                            <Field
                                name="userName"
                                type="text"
                                component={fields.inputField}
                                validate={[validation.required, validation.email]}
                                autoComplete="none"
                                onChange={this.onChange}
                                />
                        </fieldset>
                        <p className='passwordResetError'>{this.props.errorMessage}</p>
                        <Button color='success'className='subButton'>Send Email</Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage, signUpMessage: state.auth.signUpMessage, authenticated: state.auth.authenticated };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'forgotpassword' })
    )(ForgotPassword);
