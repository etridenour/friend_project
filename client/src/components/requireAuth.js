//higher order component that allows for component authorization

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

export default (ChildComponent) => {

    class ComposedComponent extends Component {

        componentDidMount() {
            this.shouldNavigateAway();
        }
        // Our component just updated
        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            if (!this.props.auth) {
            this.props.history.push('/signin');
            }
        }

        render(){
            return(
                <ChildComponent {...this.props} />
            );
        }
    }

    function mapStateToProps(state) {
        return { auth: state.auth.authenticated };
    }
    
    
    return connect(mapStateToProps, actions)(ComposedComponent);
    

}