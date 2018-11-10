import React from 'react';
import * as actions from '../actions/authActions';
import { connect } from 'react-redux';

import requireAuth from './requireAuth'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {

        const {user} = this.props;

        return (
            <div>
                <h1>{user.firstName} {user.lastName}</h1>
                <h1>{user.email}</h1>
                <h1>{user.secretpin}</h1>

            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        friends: state.friends,
        user: state.auth
    }
}

export default requireAuth(connect(mapStateToProps, actions)(Profile));
