import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/authActions';

import * as validation from './forms/formValidation';
import * as fields from './forms/formFields';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import '../styles/Signup.css';
import q from '../img/q.png';



class Signup extends Component {

    constructor(props){
        super(props)
        this.props.clearMessages();
        if(props.authenticated){
            this.props.history.push('/user');
        }
        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false
        };
        
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    onSubmit = formProps => {
        this.props.signup(formProps, () => {
            this.props.history.push('/signin');
        });
    };
    render() {


    const { handleSubmit } = this.props;

    return (
        <div>
            <div className='signupBg'></div>
            <div className='signupBox'>
            <h2 className='topTitle'>Water Cooler</h2>
                <form  onSubmit={handleSubmit(this.onSubmit)}>
                <p className='formName'>Sign Up Here:</p>
                        <label className='labels'>First Name:</label>
                        <Field                           
                            name="firstName" 
                            type="text"
                            component={fields.inputField}
                            validate={[validation.required]}
                            autoComplete="none"
                            
                            />
                        <label className='labels'>Last Name:</label>
                        <Field
                            name="lastName" 
                            type="text"
                            component={fields.inputField}
                            validate={[validation.required]}
                            autoComplete="none"
                            />
                        <label className='labels'>Email:</label>
                        <Field
                            name="email" 
                            type="text"
                            component={fields.inputField}
                            validate={[validation.required, validation.email]}
                            autoComplete="none"
                            />
                        <label className='labels'>Password:</label>
                        <Field
                            name="password"
                            type="password"
                            component={fields.inputField}
                            validate={[validation.required, validation.minLength6]}
                            autoComplete="none"
                            />
                        <label className='labels'>Secret Pin:</label>
                        <div className='secretpin'>
                            <Field 
                                name="secretpin"
                                type="text"
                                component={fields.inputField}
                                validate={[validation.required, validation.minLength4]}
                                autoComplete="none"
                                />
                            <img className='q2' id="Popover1" src={q} onClick={this.toggle}></img>
                            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                                <PopoverHeader className='popSignHead'>Secret Pin</PopoverHeader>
                                <PopoverBody className='popBody'>Your secret pin will be given out to create friends. </PopoverBody>
                            </Popover>
                        </div>
                        <label className='labels'>Department:</label>
                        <Field
                            name="jobDescription" 
                            type="text"
                            component={fields.inputField}
                            validate={validation.required}
                            autoComplete="none"
                            />
                        <label className='labels'>Title:</label>
                        <Field
                            name="title" 
                            type="text"
                            component={fields.inputField}
                            validate={validation.required}
                            autoComplete="none"
                            />
                    <Button color='warning' className='signButton'>Sign Up</Button>
                </form>
                <div className='signinErrorMessage'>{this.props.errorMessage}</div>
                <div className='haveAccount '> Already have an account?</div>
                <Link to='/signin' className='navLink signUpHere'><p>Sign in here</p></Link>
                
            </div>
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
