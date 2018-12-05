import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../styles/PasswordSent.css';


class PasswordSent extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
            <div className='sentBg'></div>
                <div className='sentBox'>
                    <p className='sentMessage'>Password reset instructions have been emailed. Please check your inbox.</p>
                    <Link to="/signin"><Button className='sentButton' color='warning'>Sign In</Button></Link>
                </div>
                
        </div>
        );
    }
}


export default PasswordSent
