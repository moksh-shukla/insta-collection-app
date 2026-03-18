import fs from 'fs';
import puppeteer from 'puppeteer';

// We have 68 maps spots. Doing this sequentially via Puppeteer to google search 
// "restaurant_name restaurant_neighborhood nyc" and grab the Knowledge Graph AI summary

const data = JSON.parse(fs.readFileSync('nyc_spots.json', 'utf8'));

// Filter out places that already have highlights (just in case) or notes, or just grab all of them
const mapsSpots = data.google_maps_spots;

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  for (let i = 0; i < mapsSpots.length; i++) {
    const spot = mapsSpots[i];
    
    // Skip if we already added highlights previously
    if (spot.highlights && spot.highlights.length > 0) continue;
    
    const query = encodeURIComponent(`${spot.name} ${spot.type || ''} NYC`);
    console.log(`[${i+1}/${mapsSpots.length}] Searching: ${spot.name}`);
    
    try {
      await page.goto(`https://www.google.com/search?q=${query}`);
      await new Promise(r => setTimeout(r, 2000));
      
      // Look for the Google Knowledge Panel description or AI overview
      const summary = await page.evaluate(() => {
        // Try the standard knowledge panel description
        const kpDesc = document.querySelector('div[data-attrid="description"] span');
        if (kpDesc) return kpDesc.innerText;
        
        // Try the "about" section
        const aboutSection = document.querySelector('div[data-attrid="kc:/local:about"]');
        if (aboutSection) return aboutSection.innerText.replace('About\n', '');
        
        return null;
      });
      
      if (summary) {
        console.log(`  -> Found: ${summary.substring(0, 50)}...`);
        // We'll treat the summary as a "note" and maybe extract pseudo-highlights
        spot.notes = summary;
        // Just make a generic highlight list if we couldn't get one
        spot.highlights = [spot.type, spot.price || "Price varies"].filter(Boolean);
      } else {
        console.log(`  -> No summary found.`);
        spot.highlights = [spot.type, spot.price || "Price varies"].filter(Boolean);
      }
      
    } catch (e) {
      console.log(`  -> Error: ${e.message}`);
    }
  }
  
  await browser.close();
  
  fs.writeFileSync('nyc_spots.json', JSON.stringify(data, null, 2));
  console.log('Complete!');
}

run();
