import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';
import {Link} from 'react-router-dom';


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
    //this is supplied by redux-form
    //it will provide the props about the form state and function 
    // to handle the submit process.
    const { handleSubmit, errorMessage } = this.props
    const { requestHappened } = this.state
    return (
        <div className='landingBackground'>
        

            <h2>{this.props.signUpMessage}</h2>
            <form className='signForm' onSubmit={handleSubmit(this.onSubmit)}>
                <p className='formName'>Welcome Back!</p>
                <fieldset className='signField'>
                    <label>Email:</label>
                    <Field
                        id='field'
                        name="email"
                        type="text"
                        component="input"
                        //something google needs
                        autoComplete="none"
                        />
                </fieldset>
                <fieldset className='signField'>
                    <label>Password:</label>
                    <Field
                        id='field'
                        name="password"
                        type="password"
                        component="input"
                        //something google needs
                        autoComplete="none"
                        />
                </fieldset>
                {/* onClick={this.onHit} */}
                <button id='signButton' >Sign In</button>
                <Link to='/signup' className='navLink'><p>Actually, I'm new here...</p></Link>
                <Link to='/forgotpassword' className='navLink'><p>Forgot Password</p></Link>
                { errorMessage? <div>{errorMessage}</div> : null}
                { requestHappened && !errorMessage? <p> contacting server, this may take a moment</p> : null}
            </form>
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
