import React from 'react';
import './SpotCard.css';

function getBadgeColor(typeStr) {
  if (!typeStr) return '#3b82f6';
  const lower = typeStr.toLowerCase();
  
  if (lower.includes('speakeasy')) return '#ef4444'; // red
  if (lower.includes('nightclub') || lower.includes('live music')) return '#ec4899'; // pink
  if (lower.includes('café') || lower.includes('cafe')) return '#14b8a6'; // teal
  if (lower.includes('deli')) return '#22c55e'; // green
  if (lower.includes('bar') || lower.includes('rooftop')) return '#8b5cf6'; // purple
  if (lower.includes('restaurant') || lower.includes('korean') || lower.includes('indian') || lower.includes('chinese') || lower.includes('japanese') || lower.includes('thai') || lower.includes('mexican') || lower.includes('french') || lower.includes('italian') || lower.includes('pizza')) return '#f59e0b'; // amber
  
  return '#3b82f6'; // blue fallback
}

function SpotCard({ spot, onClick }) {
  const badgeColor = getBadgeColor(spot.normalizedType);

  // Meta string: e.g. "📍 SoHo · $$$"
  const metaParts = [];
  if (spot.normalizedNeighborhood || spot.neighborhood) metaParts.push(`📍 ${spot.normalizedNeighborhood || spot.neighborhood}`);
  if (spot.normalizedPrice || spot.price) metaParts.push(spot.normalizedPrice || spot.price);
  const metaString = metaParts.join(' · ');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // prevent page scroll on space
      onClick();
    }
  };

  return (
    <div 
      className="spot-card glass-panel" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${spot.name}`}
    >
      {/* 1. First row: TYPE BADGE + ★ rating */}
      <div className="spot-top-row">
        <span className="badge" style={{ backgroundColor: badgeColor }}>
          {spot.normalizedType}
        </span>
        {spot.rating && (
          <div className="spot-rating-row">
            <span className="star">★</span> {spot.rating} <span className="reviews">({spot.reviews})</span>
          </div>
        )}
      </div>
      
      {/* 2. Venue name */}
      <h3 className="spot-name">{spot.name}</h3>
      
      {/* 3. Single line meta */}
      {metaString && (
        <div className="spot-meta-line">
          {metaString}
        </div>
      )}

      {/* 4. Highlights as plain inline list */}
      {spot.highlights && spot.highlights.length > 0 && (
        <div className="spot-highlights-inline">
          {spot.highlights.slice(0, 3).join(' • ')}
        </div>
      )}

      {/* 5. Notes in italic with left border */}
      {spot.notes && (
        <div className="spot-notes">
          <p>{spot.notes}</p>
        </div>
      )}

      {/* 6. Footer: Links */}
      <div className="spot-footer">
        {spot.instagram && (
          <a href={`https://instagram.com/${spot.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="action-link ig-link" onClick={e => e.stopPropagation()}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="ig-icon">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            {spot.instagram.startsWith('@') ? spot.instagram : `@${spot.instagram}`}
          </a>
        )}
        
        {spot.source_url ? (
          <a href={spot.source_url} target="_blank" rel="noopener noreferrer" className="action-link" onClick={e => e.stopPropagation()}>
            View Post ↗
          </a>
        ) : (
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' New York')}`} target="_blank" rel="noopener noreferrer" className="action-link" onClick={e => e.stopPropagation()}>
            View on Maps ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default SpotCard;
