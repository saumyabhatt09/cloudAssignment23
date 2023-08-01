import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  const handleSearchBooks = () => {
    console.log('Search Books button clicked');
  };

  const handleViewRequests = () => {
    console.log('View Requests button clicked');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to BookBridge</h1>
        <h3>Connecting Bookworms Everywhere.</h3>
        <br />
        <div className="landing-buttons">
          <Link to="/books">
          <button className="landing-button" onClick={handleSearchBooks}>
            Search Books
          </button>
          </Link>
          <Link to="/requests">
          <button className="landing-button" onClick={handleViewRequests}>
            View Requests
          </button>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default LandingPage;
