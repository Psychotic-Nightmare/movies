import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import logo from '../src/logo.svg';
import Home from './home';
import Login from './login';
import Signup from './signup';
import Welcome from './welcome'; // Import the Welcome component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} /> {/* Add a route for /welcome */}
        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;