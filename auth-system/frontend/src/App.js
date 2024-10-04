import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
       
         
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} /> {/* Redirect to /signup on the root path */}
        </Routes>
         
       
    </Router>
  );
}

export default App;
