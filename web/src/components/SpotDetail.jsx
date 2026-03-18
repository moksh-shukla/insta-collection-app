import React, { useEffect } from 'react';
import './SpotDetail.css';

function getBadgeColor(typeStr) {
  if (!typeStr) return '#3b82f6';
  const lower = typeStr.toLowerCase();
  
  if (lower.includes('speakeasy')) return '#ef4444'; // red
  if (lower.includes('nightclub') || lower.includes('live music')) return '#ec4899'; // pink
  if (lower.includes('café') || lower.includes('cafe')) return '#14b8a6'; // teal
  if (lower.includes('deli')) return '#22c55e'; // green
  if (lower.includes('bar') || lower.includes('rooftop')) return '#8b5cf6'; // purple
  if (lower.includes('restaurant') || lower.includes('korean') || lower.includes('indian') || lower.includes('chinese') || lower.includes('japanese') || lower.includes('thai') || lower.includes('mexican') || lower.includes('french') || lower.includes('italian') || lower.includes('pizza')) return '#f59e0b'; // amber
  
  return '#3b82f6'; // blue fallack
}

function SpotDetail({ spot, onClose }) {
  // Handle Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && spot) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, spot]);

  // We always render the panel so it can animate in/out. We apply the .open class when a spot exists.
  // If there's no spot selected yet, we still need to render the structure to animate correctly, 
  // so we'll optionally render the contents based on whether spot is populated or if we keep a cached version.
  // For simplicity, we just conditionally render the inner HTML or use the spot data directly. We'll use optional chaining if spot is null.

  return (
    <div className={`spot-detail-panel ${spot ? 'open' : ''}`}>
      {spot && (
        <>
          <button className="panel-close-btn" onClick={onClose} aria-label="Close panel">×</button>

          <div className="panel-top-row">
            <span className="badge" style={{ backgroundColor: getBadgeColor(spot.normalizedType) }}>
              {spot.normalizedType}
            </span>
            {spot.rating && (
              <div className="spot-rating-row">
                <span className="star">★</span> {spot.rating} <span className="reviews">({spot.reviews || 0})</span>
              </div>
            )}
          </div>

          <h2 className="panel-title">{spot.name}</h2>

          <div className="panel-info-grid">
            <div className="info-item">
              <span className="info-icon">📍</span> 
              <span>{spot.normalizedNeighborhood || spot.neighborhood}</span>
              {spot.price && <> <span className="info-separator">·</span> <span>{spot.price}</span></>}
            </div>
          </div>

          <div className="divider"></div>

          <div className="panel-info-grid">
            {spot.address && (
              <div className="info-item">
                <span className="info-item-label">🗺</span> {spot.address}
              </div>
            )}
            {spot.cuisine && (
              <div className="info-item">
                <span className="info-item-label">🍽</span> {spot.cuisine}
              </div>
            )}
            {spot.reservations && (
              <div className="info-item">
                <span className="info-item-label">📅</span> {spot.reservations}
              </div>
            )}
          </div>

          {spot.highlights && spot.highlights.length > 0 && (
            <>
              <h3 className="panel-section-title">Highlights</h3>
              <ul className="panel-highlights-list">
                {spot.highlights.map((hl, i) => (
                  <li key={i}>{hl}</li>
                ))}
              </ul>
            </>
          )}

          {spot.notes && (
            <div className="panel-notes">
              {spot.notes}
            </div>
          )}

          {(spot.source_collection || spot.list) && (
            <div>
              <span className="source-chip">From: {spot.source_collection || spot.list}</span>
            </div>
          )}

          <div className="panel-footer">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' New York')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="panel-btn btn-primary"
            >
              📍 Open in Google Maps
            </a>
            
            {spot.instagram && (
              <a 
                href={`https://instagram.com/${spot.instagram.replace('@', '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="panel-btn btn-secondary"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="ig-icon" style={{marginRight: '8px'}}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                {spot.instagram.startsWith('@') ? spot.instagram : `@${spot.instagram}`}
              </a>
            )}

            {spot.source_url && (
              <a 
                href={spot.source_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="panel-btn btn-secondary"
              >
                View Source Post ↗
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SpotDetail;
