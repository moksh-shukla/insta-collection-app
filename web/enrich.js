import fs from 'fs';

const data = JSON.parse(fs.readFileSync('nyc_spots.json', 'utf8'));

// 1. Gather all Instagram spots that need Maps data
const igSpots = data.instagram_spots;

// 2. Gather all Maps spots that need AI highlights
const mapsSpots = data.google_maps_spots;

console.log(`Need Maps data for ${igSpots.length} Instagram spots.`);
console.log(`Need Highlights for ${mapsSpots.length} Google Maps spots.`);
