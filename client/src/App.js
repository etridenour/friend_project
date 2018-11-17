import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom'
import * as actions from './actions/authActions';
import { connect } from 'react-redux';

import Landing from './components/Landing'
import User from './components/User'
import Profile from './components/Profile'
import Employees from './components/Employees'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Signout from './components/Signout'
import Main from './components/Main'
import Loading from './components/Loading'

class App extends Component {

  constructor(props){
    super(props)
    this.props.autoSignin(() => {
      console.log('auto logged in')
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/loading" component={Loading}/>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/user" component={User}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/employees" component={Employees}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/signout" component={Signout}/>
          <Route exact path="/main" component={Main}/>
        </div>
      </BrowserRouter>
    );
  }
}


const mapStateToProps = state => ({

});

export default connect(mapStateToProps,actions)(App)
