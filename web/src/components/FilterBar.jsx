import React from 'react';
import './FilterBar.css';

function FilterBar({ filters, setFilters, availableFilters, clearFilters, resultCount, totalCount }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="dir-filters-row">
      <div className="dir-filters-left">
        <div className="dir-select-wrapper">
          <select 
            value={filters.type} 
            onChange={(e) => handleChange('type', e.target.value)}
            className="dir-filter-select"
          >
            <option value="All">All Types</option>
            {availableFilters.types.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <svg className="dir-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="dir-select-wrapper">
          <select 
            value={filters.neighborhood} 
            onChange={(e) => handleChange('neighborhood', e.target.value)}
            className="dir-filter-select"
          >
            <option value="All">Neighborhood</option>
            {availableFilters.neighborhoods.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <svg className="dir-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="dir-select-wrapper">
          <select 
            value={filters.price} 
            onChange={(e) => handleChange('price', e.target.value)}
            className="dir-filter-select"
          >
            <option value="All">Price</option>
            {availableFilters.prices.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <svg className="dir-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {(filters.type !== 'All' || filters.neighborhood !== 'All' || filters.price !== 'All') && (
          <button className="dir-clear-btn" onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>
      
      <div className="dir-filters-right">
        <span className="dir-live-dot"></span>
        <span className="dir-count-text">
          Showing <span className="dir-count-highlight">{resultCount}</span> of <span className="dir-count-highlight">{totalCount}</span> spots
        </span>
      </div>
    </div>
  );
}

export default FilterBar;
