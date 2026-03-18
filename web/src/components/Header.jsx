import React from 'react';
import './Header.css';

function Header({ search, setSearch }) {
  return (
    <div className="dir-header-section">
      <div className="mta-indicators">
        <span className="mta-circle mta-1">1</span>
        <span className="mta-circle mta-6">6</span>
        <span className="mta-circle mta-n">N</span>
      </div>
      <h1 className="dir-main-title">
        <span className="title-food">NYC Food</span> & <span className="title-drink">Drink</span>
      </h1>
      <p className="dir-tagline">The spots locals actually go to</p>
      
      <div className="dir-search-container">
        <svg className="dir-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search by name, neighborhood, or vibe..." 
          className="dir-search-input"
        />
      </div>
    </div>
  );
}

export default Header;
