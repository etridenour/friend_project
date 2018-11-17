import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';
import {Link} from 'react-router-dom';


class Signout extends React.Component {
    constructor(props){
        super(props)
        this.props.signout();
        this.props.history.push('/signin');
    }
    

    render() {
        return (
            <div className='landingBackground'>

            </div>
        );
    }
}


export default connect(null, actions)(Signout);