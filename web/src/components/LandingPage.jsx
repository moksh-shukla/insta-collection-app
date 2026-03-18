import React from 'react';
import './LandingPage.css';

function LandingPage({ onExplore }) {
  const chips = [
    'Bar', 'Café', 'Speakeasy', 'Restaurant', 'Rooftop Bar', 'Nightclub'
  ];

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-headline">NYC Food & Drink</h1>
        <p className="landing-subheadline">
          89 Curated Spots — Restaurants, Bars, Speakeasies & More
        </p>
        <p className="landing-tagline">
          Sourced From Instagram Saves & Google Maps Lists
        </p>
        
        <div className="landing-chips">
          {chips.map(chip => (
            <button 
              key={chip} 
              className="landing-chip glass-panel"
              onClick={() => onExplore(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        <button 
          className="explore-btn"
          onClick={() => onExplore(null)}
        >
          Explore All Spots →
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
