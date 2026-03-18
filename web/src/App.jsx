import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import SpotGrid from './components/SpotGrid';
import SpotDetail from './components/SpotDetail';
import LandingPage from './components/LandingPage';
import spotsData from './data/nyc_spots.json';
import { normalizeType, normalizeNeighborhood, normalizePrice, sortPrices } from './utils/normalize';

function App() {
  const allSpots = useMemo(() => {
    // Both IG spots and maps spots combined
    const combined = [...(spotsData.instagram_spots || []), ...(spotsData.google_maps_spots || [])];
    return combined.map(spot => ({
      ...spot,
      normalizedType: normalizeType(spot.type),
      normalizedNeighborhood: normalizeNeighborhood(spot.neighborhood),
      normalizedPrice: normalizePrice(spot.price)
    }));
  }, []);

  const [view, setView] = useState('landing');
  const [initialType, setInitialType] = useState(null);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    type: 'All',
    neighborhood: 'All',
    price: 'All'
  });
  
  const [selectedSpot, setSelectedSpot] = useState(null);

  // Close modal on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setSelectedSpot(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Set initial filter when returning from landing page
  useEffect(() => {
    if (view === 'explore' && initialType) {
      setFilters(prev => ({ ...prev, type: initialType }));
      setInitialType(null);
    }
  }, [view, initialType]);

  const availableFilters = useMemo(() => {
    const types = new Set();
    const neighborhoods = new Set();
    const prices = new Set();

    allSpots.forEach(s => {
      if (s.normalizedType && s.normalizedType !== 'Other') types.add(s.normalizedType);
      if (s.normalizedNeighborhood) neighborhoods.add(s.normalizedNeighborhood);
      if (s.normalizedPrice) prices.add(s.normalizedPrice);
    });

    return {
      types: Array.from(types).sort(),
      neighborhoods: Array.from(neighborhoods).sort(),
      prices: sortPrices(Array.from(prices))
    };
  }, [allSpots]);

  const filteredSpots = useMemo(() => {
    return allSpots.filter(spot => {
      // Search
      if (search) {
        const query = search.toLowerCase();
        const searchStr = [
          spot.name, 
          spot.normalizedNeighborhood || spot.neighborhood, 
          spot.normalizedType || spot.type,
          spot.cuisine,
          ...(spot.highlights || [])
        ].filter(Boolean).join(' ').toLowerCase();
        
        if (!searchStr.includes(query)) return false;
      }

      // Filters
      if (filters.type !== 'All' && spot.normalizedType !== filters.type) return false;
      if (filters.neighborhood !== 'All' && spot.normalizedNeighborhood !== filters.neighborhood) return false;
      if (filters.price !== 'All' && spot.normalizedPrice !== filters.price) return false;

      return true;
    });
  }, [allSpots, search, filters]);

  const clearFilters = () => {
    setSearch('');
    setFilters({ type: 'All', neighborhood: 'All', price: 'All' });
  };

  const handleExplore = (type) => {
    if (type) {
      setInitialType(type);
    } else {
      clearFilters();
    }
    setView('explore');
  };

  return (
    <div className="app-main">
      {view === 'landing' ? (
        <LandingPage onExplore={handleExplore} />
      ) : (
        <div className={`content-area ${selectedSpot ? 'panel-open' : ''}`}>
          {/* Ambient Effects for Directory View */}
          <div className="dir-ambient-grid"></div>
          <div className="dir-ambient-glow"></div>
          
          <div className="dir-container">
            <button className="dir-back-btn" onClick={() => setView('landing')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back to home</span>
            </button>
            
            <Header 
              search={search} 
              setSearch={setSearch} 
            />
            <FilterBar 
              filters={filters} 
              setFilters={setFilters} 
              availableFilters={availableFilters}
              clearFilters={clearFilters}
              resultCount={filteredSpots.length}
              totalCount={allSpots.length}
            />
            <SpotGrid spots={filteredSpots} onSelect={setSelectedSpot} clearFilters={clearFilters} />
          </div>
        </div>
      )}
      
      {/* We always render SpotDetail so it can animate in/out in Phase 3, but right now it renders only when selected in Phase 2 */}
      <SpotDetail spot={selectedSpot} onClose={() => setSelectedSpot(null)} />
    </div>
  );
}

export default App;
