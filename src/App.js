import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="App__main">
          <Switch>

          </Switch>
        </div>

      </div>
    );
  }
}

export default App;
