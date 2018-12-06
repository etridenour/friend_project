import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';
import {Link} from 'react-router-dom'; 
import * as validation from './forms/formValidation';
import * as fields from './forms/formFields';

import { Button } from 'reactstrap';
import '../styles/ResetPassword.css';

class ResetPassword extends Component {

    constructor(props){
        super(props)
        if(props.authenticated){
            this.props.history.push('/user');
        }
        this.state = {
            tokenValid: false,
            token: null
        }
    }
    

    onSubmit = formProps => {
        const passId = this.props.match.params.passId
        const passToken = this.props.match.params.passToken
        
        this.props.savePassword({ formProps: formProps, token: passToken , id: passId } , () => {

            this.props.history.push('/signin');
        });
    };
    render() {

    const { handleSubmit } = this.props;
    return (
        <div>
        <div className='resetBg'></div>

            { this.state.tokenValid ? null : null}
            <form className='resetForm' onSubmit={handleSubmit(this.onSubmit)}>
            <h2 className='topTitle'>Water Cooler</h2>
                <strong className=''>Please enter a new password.</strong>
                {this.props.emailDisp}
                <fieldset className='signField'>
                    <label>Password:</label>
                    <Field
                        name="password"
                        type="password"
                        component={fields.inputField}
                        validate={[validation.required, validation.minLength6]}
                        autoComplete="none"
                        />
                </fieldset>
                <p className='resetError'>{this.props.errorMessage}</p>
                <Button color='success'className='resetButton'>Save</Button>
            </form>
            
        </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage, signUpMessage: state.auth.signUpMessage, authenticated: state.auth.authenticated, emailDisp: state.auth.email };
  }

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'passwordreset' })
    )(ResetPassword);
