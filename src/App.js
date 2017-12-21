import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Info from './components/Info';
import { connect } from 'react-redux';
import { setUser } from './ducks/users';
import './App.css';
import axios from 'axios';

class App extends Component {

  componentDidMount() {
    // axios.get('http://localhost:3005/auth/check').then(response => {
      this.props.setUser();
      // return response.data;
    // });
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Auth0-CORS</h1>
          {JSON.stringify(this.props.user.username, null, 3)}
        </header>

        <div className="App__main">
          <Switch>
            <Route render={props => <Login {...props} />} exact path="/" />
            <Route render={props => <Info {...props} />} path="/info" />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(({ user }) => ({ user }), { setUser })(App);