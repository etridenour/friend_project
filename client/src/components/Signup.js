import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
// import * as actions from '../actions/authActions';

import * as validation from './forms/formValidation';
import * as fields from './forms/formFields';
import { Link } from 'react-router-dom';


class Signup extends Component {

    constructor(props){
        super(props)
        if(props.authenticated){
            this.props.history.push('/Main');
        }
        
    }
    onSubmit = formProps => {
        this.props.signup(formProps, () => {
            this.props.history.push('/signin');
        });
    };
    render() {


    const { handleSubmit } = this.props;
    return (
        <div className='landingBackground'>

            <form className='signForm'  onSubmit={handleSubmit(this.onSubmit)}>
            <p className='formName'>Sign Up Here:</p>
                <fieldset className='signField'>
                    <label>First Name:</label>
                    <Field
                        id='field'
                        name="firstName" 
                        type="text"
                        component={fields.inputField}
                        validate={[validation.required]}
                        autoComplete="none"
                        />
                </fieldset >
                <fieldset className='signField'>
                    <label>Last Name:</label>
                    <Field
                        id='field'
                        name="lastName" 
                        type="text"
                        component={fields.inputField}
                        validate={[validation.required]}
                        autoComplete="none"
                        />
                </fieldset >
                <fieldset className='signField'>
                    <label>Email:</label>
                    <Field
                        id='field'
                        name="userName" 
                        type="text"
                        component={fields.inputField}
                        validate={[validation.required, validation.email]}
                        autoComplete="none"
                        />
                </fieldset >
                <fieldset className='signField'>
                    <label>Password:</label>
                    <Field
                        id='field'
                        name="userPassword"
                        type="password"
                        component={fields.inputField}
                        validate={[validation.required, validation.minLength6]}
                        autoComplete="none"
                        />
                </fieldset>
                <fieldset className='signField'>
                    <label>Secret Pin:</label>
                    <Field 
                        id='field'
                        name="companyName"
                        type="text"
                        component={fields.inputField}
                        validate={[validation.required, validation.minLength4]}
                        autoComplete="none"
                        />
                </fieldset>
                <button id='signButton'>Sign Up</button>
                <div>{this.props.errorMessage}</div>
            </form>
            <Link to='/signin' className='navLink'><p>Back to sign in</p></Link>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage, authenticated: state.auth.authenticated };
}


export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
    )(Signup);
