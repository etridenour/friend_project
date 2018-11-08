import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import User from './components/User'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Signout from './components/Signout'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Route exact path="/" component={User}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/signout" component={Signout}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
