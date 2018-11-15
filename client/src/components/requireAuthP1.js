//higher order component that allows for component authorization

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

export default (ChildComponent) => {

    class ComposedComponent extends Component {

        componentDidMount() {
            this.shouldNavigateAway();
        }
        // Our component just got updated
        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            if (!this.props.auth) {
                this.props.history.push('/signin');
            } else if (this.props.privilege === 'employee') {
                this.props.history.push('/user');
            }
        }

        render(){
            return(
                <ChildComponent {...this.props} />
            );
        }
    }

    function mapStateToProps(state) {
        return { auth: state.auth.authenticated,
                privilege: state.auth.privilege
        };
    }
    
    
    return connect(mapStateToProps, actions)(ComposedComponent);
        

}