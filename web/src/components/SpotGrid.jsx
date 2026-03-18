import React from 'react';
import SpotCard from './SpotCard';
import './SpotGrid.css';

function SpotGrid({ spots, onSelect, clearFilters }) {
  if (spots.length === 0) {
    return (
      <div className="empty-state glass-panel">
        <h3>No spots found</h3>
        <p>Try adjusting your filters or search.</p>
        {clearFilters && (
          <button className="empty-state-clear-btn" onClick={clearFilters}>
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="spot-grid">
      {spots.map((spot, idx) => (
        <SpotCard key={spot.id || `spot-${idx}`} spot={spot} onClick={() => onSelect(spot)} />
      ))}
    </div>
  );
}

export default SpotGrid;
