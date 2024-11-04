import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Daily from './Components/Daily';
import Archive from './Components/Archive'; 

function App() {
  return (
    <Router> 
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="nav-links">
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Daily />} /> {/* Main page rendering Daily component */}
          <Route path="/archive" element={<Archive />} /> {/* Archive page rendering Archive component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
