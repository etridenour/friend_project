import React from 'react';

import '../styles/Loading.css';
import loading from '../img/loading.gif';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div className='loadingContainer'>
                <img className='loading' src={loading}></img>
            </div>
        );
    }
}


Loading.propTypes = {
    
};

export default Loading
