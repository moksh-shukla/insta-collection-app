import React from 'react';
import './SpotCard.css';

const categoryStyles = {
  'Rooftop Bar': { color: '#f472b6', bg: 'rgba(244, 114, 182, 0.15)', border: '#6366f1' },
  'Café': { color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)', border: '#10b981' },
  'Bar': { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.15)', border: '#f97316' },
  'Speakeasy': { color: '#c084fc', bg: 'rgba(192, 132, 252, 0.15)', border: '#a855f7' },
  'Restaurant': { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', border: '#eab308' },
  'Late Night': { color: '#f87171', bg: 'rgba(248, 113, 113, 0.15)', border: '#ef4444' }
};

function getCategoryStyle(type) {
  return categoryStyles[type] || categoryStyles['Restaurant'];
}

function SpotCard({ spot, onClick }) {
  const catStyle = getCategoryStyle(spot.normalizedType);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      className="dir-spot-card" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${spot.name}`}
    >
      <div className="dir-card-header">
        <span 
          className="dir-category-badge" 
          style={{ color: catStyle.color, backgroundColor: catStyle.bg }}
        >
          {spot.normalizedType}
        </span>
        
        <div className="dir-header-right">
          {spot.normalizedPrice && <span className="dir-price">{spot.normalizedPrice}</span>}
          {spot.isNew && <span className="dir-new-badge">NEW</span>}
        </div>
      </div>
      
      <h3 className="dir-venue-name">{spot.name}</h3>
      
      <div className="dir-location">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#f97316" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        </svg>
        <span>{spot.normalizedNeighborhood || spot.neighborhood}</span>
      </div>

      <div className="dir-description">
        {spot.highlights && spot.highlights.length > 0 ? (
          spot.highlights.slice(0, 3).join(' • ')
        ) : spot.cuisine ? (
          spot.cuisine
        ) : 'No description available'}
      </div>

      {spot.notes && (
        <div 
          className="dir-insider-tip"
          style={{ borderLeftColor: catStyle.border, color: catStyle.color }}
        >
          {spot.notes}
        </div>
      )}

      <div className="dir-card-footer">
        {spot.instagram && (
          <a href={`https://instagram.com/${spot.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="dir-ig-handle" onClick={e => e.stopPropagation()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
              <path d="M17.5 6.5h.01"/>
            </svg>
            <span>{spot.instagram.startsWith('@') ? spot.instagram : `@${spot.instagram}`}</span>
          </a>
        )}
        
        {spot.source_url || spot.instagram ? (
          <a href={spot.source_url || `https://instagram.com/${spot.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="dir-view-post" onClick={e => e.stopPropagation()}>
            <span>View Post</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"/>
            </svg>
          </a>
        ) : (
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' New York')}`} target="_blank" rel="noopener noreferrer" className="dir-view-post" onClick={e => e.stopPropagation()}>
            <span>View Maps</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default SpotCard;
