import React, { Component } from 'react';
import Navbar from './component/Navbar'
import User from './component/User'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <User />

      </div>
    );
  }
}

export default App;
