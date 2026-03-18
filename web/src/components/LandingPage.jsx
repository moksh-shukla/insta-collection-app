import React from 'react';
import './LandingPage.css';

function LandingPage({ onExplore }) {
  const categoryPills = [
    { label: 'Bars & Cocktails', value: 'Bar' },
    { label: 'Coffee & Cafés', value: 'Café' },
    { label: 'Hidden Speakeasies', value: 'Speakeasy' },
    { label: 'Dinner Spots', value: 'Restaurant' },
    { label: 'Rooftops', value: 'Rooftop Bar' },
    { label: 'Late Night', value: 'Nightclub' }
  ];

  const neighborhoods = [
    'West Village', 'SoHo', 'Lower East Side', 'Williamsburg', 'Greenpoint', 'Astoria', 'East Village'
  ];

  return (
    <div className="landing-wrapper">
      <div className="ambient-grid"></div>
      <div className="ambient-glow-orange"></div>
      <div className="ambient-glow-purple"></div>
      
      <div className="landing-container">
        
        {/* 1. Top Navigation Bar */}
        <nav className="top-nav">
          <div className="brand-mark">
            <span className="brand-dot"></span>
            <span className="brand-text">The Local Edit</span>
          </div>
          <div className="subway-lines">
            <span className="subway-circle line-a">A</span>
            <span className="subway-circle line-f">F</span>
            <span className="subway-circle line-g">G</span>
          </div>
        </nav>

        {/* 2. Hero Section */}
        <section className="hero-section">
          <div className="hero-eyebrow">A personal collection — updated weekly</div>
          <h1 className="hero-headline">
            Where New Yorkers<br />
            <span className="headline-fade">Actually Eat & Drink</span>
          </h1>
          <p className="hero-description">
            89 hand-picked spots sourced from a local's personal maps 
            and saves. No tourist traps. No sponsored posts. Just good places.
          </p>
          <div className="live-indicator">
            <span className="pulse-dot"></span>
            Last updated March 2026
          </div>
        </section>

        {/* 3. Category Filter Pills */}
        <section className="category-pills">
          {categoryPills.map(pill => (
            <button 
              key={pill.label} 
              className="pill-btn"
              onClick={() => onExplore(pill.value)}
            >
              {pill.label}
            </button>
          ))}
        </section>

        {/* 4. Neighborhood Section */}
        <section className="neighborhood-section">
          <div className="neighborhood-label">Browse by neighborhood</div>
          <div className="neighborhood-links">
            {neighborhoods.map((n, i) => (
              <React.Fragment key={n}>
                <span 
                  className="neighborhood-link"
                  onClick={() => {
                    // Assuming App.jsx search box can pick this up if set as filter, 
                    // or just drop them into explore view for now
                    onExplore(null); 
                  }}
                >
                  {n}
                </span>
                {i < neighborhoods.length - 1 && <span className="neighborhood-dot">·</span>}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 5. CTA Section */}
        <section className="cta-section">
          <button className="cta-primary" onClick={() => onExplore(null)}>
            Explore the full list →
          </button>
          <button className="cta-secondary">
            Submit a spot
          </button>
        </section>

        {/* 6. Stats Footer */}
        <section className="stats-footer">
          <div className="stat-card">
            <div className="stat-number">89</div>
            <div className="stat-label">Curated spots</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">14</div>
            <div className="stat-label">Neighborhoods</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">6</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">Sponsored posts</div>
          </div>
        </section>

        {/* 7. Source Credit Footer */}
        <footer className="source-credit">
          Sourced from personal visits, Instagram saves & trusted recommendations. Not affiliated with any venues.
        </footer>
      </div>

      {/* Skyline Silhouette Silhouette */}
      <svg className="skyline-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
         <path fill="currentColor" d="M0 100 V 70 L 20 70 L 20 85 L 45 85 L 45 60 L 60 60 L 60 40 L 80 40 L 80 80 L 120 80 L 120 50 L 150 50 L 150 65 L 180 65 L 180 30 L 210 30 L 210 90 L 240 90 L 240 45 L 260 45 L 260 85 L 300 85 L 300 25 L 320 25 L 320 75 L 360 75 L 360 55 L 400 55 L 400 80 L 440 80 L 440 10 L 470 10 L 470 65 L 500 65 L 500 45 L 530 45 L 530 85 L 580 85 L 580 35 L 610 35 L 610 75 L 650 75 L 650 20 L 680 20 L 680 60 L 720 60 L 720 40 L 750 40 L 750 85 L 780 85 L 780 15 L 810 15 L 810 70 L 850 70 L 850 50 L 880 50 L 880 80 L 920 80 L 920 25 L 940 25 L 940 65 L 980 65 L 980 30 L 1020 30 L 1020 90 L 1060 90 L 1060 45 L 1100 45 L 1100 80 L 1150 80 L 1150 35 L 1180 35 L 1180 65 L 1220 65 L 1220 25 L 1250 25 L 1250 85 L 1300 85 L 1300 40 L 1330 40 L 1330 75 L 1370 75 L 1370 50 L 1400 50 L 1400 90 L 1440 90 V 100 H 0 Z" />
      </svg>
    </div>
  );
}

export default LandingPage;
