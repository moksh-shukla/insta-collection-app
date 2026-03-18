import fs from 'fs';

const data = JSON.parse(fs.readFileSync('nyc_spots.json', 'utf8'));

const updates = {
  "ig_1": { rating: "4.6", reviews: "1,504", price: "$50–100" }, // Duomo51
  "ig_2": { rating: "4.6", reviews: "218", price: "$10–20" }, // Sawada
  "ig_3": { rating: "4.4", reviews: "74", price: "$20–30" }, // The Domino Room
  "ig_4": { rating: "4.2", reviews: null, price: "$100+" }, // Baccarat Bar
  "ig_5": { rating: "4.3", reviews: null, price: "$50–100" }, // The Club Room
  "ig_6": { rating: "4.2", reviews: "9", price: "$20–30" }, // Opera House
  "ig_7": { rating: "4.2", reviews: "1,900", price: "$20–30" }, // The Back Room
  "ig_8": { rating: "4.5", reviews: "4,600", price: "$20–30" }, // Dear Irving
  "ig_9": { rating: "4.5", reviews: "2,200", price: "$10–20" }, // Coby Club
  "ig_10": { rating: "4.8", reviews: "3,000", price: "$50–100" }, // La Goulue
  "ig_11": { rating: "3.9", reviews: "324", price: "$100+" }, // The Nines
  "ig_12": { rating: "4.7", reviews: "935", price: "$30–50" }, // Le Dive
  "ig_13": { rating: "4.7", reviews: "605", price: "$30–50" }, // Olio e Piu
  "ig_14": { rating: "4.7", reviews: "4,164", price: "$100+" }, // Fandi Mata
  "ig_15": { rating: "4.3", reviews: null, price: "$100+" }, // Gage & Tollner
  "ig_16": { rating: "4.5", reviews: "248", price: "$100+" }, // Clover Hill (Closed)
  "ig_17": { rating: "4.7", reviews: "3,707", price: "$100+" }, // Manhatta
  "ig_18": { rating: "4.7", reviews: "1,000", price: "$10–20" }, // Urban Backyard
  "ig_19": { rating: "4.0", reviews: "140", price: "$10–20" }, // Birley Bakery
  "ig_20": { rating: "4.7", reviews: "1,000", price: "$10–20" }, // Urban Backyard (duplicate in JSON, updating anyway)
  "ig_21": { rating: "4.0", reviews: "140", price: "$10–20" }, // Birley Bakery (duplicate in JSON)
};

data.instagram_spots = data.instagram_spots.map(spot => {
  if (updates[spot.id]) {
    return { ...spot, ...updates[spot.id] };
  }
  return spot;
});

fs.writeFileSync('nyc_spots.json', JSON.stringify(data, null, 2));
console.log('Successfully injected Maps metadata into Instagram spots.');
