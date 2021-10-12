import React, { Component } from 'react';
import './App.css';

class Protected extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">WELCOME PROTECTED</h1>
        </header>
        <p className="App-intro"></p>
      </div>
    );
  }
}

export default Protected;