import React from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';

import '../styles/Landing.css';

class Landing extends React.Component {
    constructor(props) {
        super(props);
        if(props.authenticated){
            this.props.history.push('/user');
        }
        
    }

    render() {
        return (
            <div>
                <div className='main'>
                <h2 className='landingTitle '>Name</h2>
                <p className='underTitle'>Bringing co-workers together</p>
                    <div className='buttonsBox'>
                        <Link to="/signup"><Button className='buttons' color='primary'>Sign Up</Button></Link>
                        <Link to="/signin"><Button className='buttons' color='success'>Sign In</Button></Link>
                    </div>
                </div>

            </div>
        );
    }
}


export default Landing
