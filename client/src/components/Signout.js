import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';
import {Link} from 'react-router-dom';


class Signout extends React.Component {
    componentWillMount = () => {
        this.props.signout();
        this.props.signout1();
    }
    

    render() {
        return (
            <div className='landingBackground'>
                <div className='salud'>                </div>
                    <h2 className='signoutL'>Goodbye!</h2>

                <Link to='/signin' className='navLink'><p>Sign Back In Here</p></Link>

            </div>
        );
    }
}


export default connect(null, actions)(Signout);