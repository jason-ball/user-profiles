import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Callback from './components/Callback';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <>
        <button onClick={this.handleSignInClick}>Sign in with GitHub</button>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
        </Router>
      </>
    );
  }

  async handleSignInClick() {
    const serverURL = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:4200'
    window.location.href = `${serverURL}/auth/github`
  }
}

export default App;
