import React from 'react';
import './FilterBar.css';

function FilterBar({ filters, setFilters, availableFilters, clearFilters, resultCount, totalCount }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="filter-bar-wrapper">
      <div className="filter-bar-container glass-panel">
        <div className="filter-controls">
          <div className="custom-select-wrapper">
            <select 
              value={filters.type} 
              onChange={(e) => handleChange('type', e.target.value)}
              className="filter-select"
            >
              <option value="All">All Types</option>
              {availableFilters.types.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="custom-select-wrapper">
            <select 
              value={filters.neighborhood} 
              onChange={(e) => handleChange('neighborhood', e.target.value)}
              className="filter-select"
            >
              <option value="All">All Neighborhoods</option>
              {availableFilters.neighborhoods.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="custom-select-wrapper">
            <select 
              value={filters.price} 
              onChange={(e) => handleChange('price', e.target.value)}
              className="filter-select"
            >
              <option value="All">All Prices</option>
              {availableFilters.prices.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          
          <button className="clear-btn" onClick={clearFilters}>
            Clear
          </button>
        </div>
        
        <div className="filter-results">
          Showing {resultCount} of {totalCount} spots
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
