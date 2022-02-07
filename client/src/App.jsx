import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AppNavbar from './components/AppNavbar';
import Callback from './components/Callback';
import Home from './components/Home';

function App() {
  return (
    <>
      <AppNavbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
