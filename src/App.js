import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import BooksPage from './BooksPage';
import ViewRequests from './ViewRequests'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/books" element={<BooksPage />} />}
          <Route path="/requests" element={<ViewRequests />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
