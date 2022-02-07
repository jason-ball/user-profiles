import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { fetchProfile } from './api';
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
