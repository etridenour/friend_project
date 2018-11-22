import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import * as validation from './forms/formValidation';
import * as fields from './forms/formFields';
import '../styles/Signin.css';

class SignIn extends Component {

    constructor(props){
        super(props)
        if(props.authenticated){
            this.props.history.push('/user');
        }
        this.state = {
            requestHappened: false
        }
        
    }

    onSubmit = formProps => {

        this.props.signin(formProps, () => {
            this.props.history.push('/user');
        });
        this.setState({
            requestHappened: true
        })
    };
    render() {

    const { handleSubmit, errorMessage } = this.props
    const { requestHappened } = this.state
    return (
        <div>
            <div className='signinBg'></div>
                
                    <div className='signinBox'>
                    <h4 className='signUpMessage'>{this.props.signUpMessage}</h4>
                    <h2 className='topTitle'>Name</h2>
                        <form className='signinForm' onSubmit={handleSubmit(this.onSubmit)}>
                            <p className='signinFormName'>Sign In</p>
                            
                                <label className='signinLabels'>Email:</label>
                                <Field
                                    id='field'
                                    name="email"
                                    type="text"
                                    component={fields.inputField}
                                    validate={[validation.required, validation.email]}
                                    autoComplete="none"
                                    />
        
                                <label className='signinLabels'>Password:</label>
                                <Field
                                    id='field'
                                    name="password"
                                    type="password"
                                    component={fields.inputField}
                                    validate={validation.required}
                                    autoComplete="none"
                                    />
                        
                
                            <Button color='success' className='signinButton' >Sign In</Button>
                            { errorMessage? <div className='centerText signinError'>{errorMessage}</div> : null}
                            <Link to='/signup' className='centerText'><p>Create an account</p></Link>
                            <Link to='/forgotpassword' className='centerText'><p>Forgot Password</p></Link>
                            
                            { requestHappened && !errorMessage? <p className='centerText'> contacting server, this may take a moment</p> : null}
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
    reduxForm({ form: 'signin' })
    )(SignIn);
