# The Local Edit 🗽

**The Local Edit** is a curated, front-end web application that serves as a highly-visual, map-alternative directory for discovering the best places to eat and drink in New York City. Built with an anti-tourist-trap philosophy, the application displays hand-picked spots sourced from a local's personal saves and recommendations.

![The Local Edit](https://github.com/moksh-shukla/insta-collection-app/assets/placeholder)<!-- Replace with actual screenshot -->

## ✨ Features
- **Curated Selection**: Browse 89 hand-picked cafes, restaurants, bars, speakeasies, and nightclubs across 14 NYC neighborhoods.
- **Editorial Design**: A premium, mobile-responsive UI featuring a dark-mode native palette, glassmorphic elements, ambient glow effects, and a custom CSS skyline silhouette.
- **Dynamic Filtering**: Instantly narrow down spots by Category (Type), Neighborhood, or Price point using the custom drop-down filters.
- **Instant Search**: Look up specific venues, vibes, or cuisines through the integrated lightning-fast search bar.
- **Spot Cards**: View detailed cards for each location featuring insider tips, category badges, MTA subway indicators, and direct links to Instagram posts and Google Maps.

## 🛠 Tech Stack
- **Framework**: [React.js](https://reactjs.org/) (functional components, hooks)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, Grid, custom animations)
- **Deployment**: [Vercel](https://vercel.com)

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/moksh-shukla/insta-collection-app.git
   cd insta-collection-app/web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Visit the app**
   Open your browser and navigate to `http://localhost:5173`.

## 📂 Project Structure
- `/web/src/components`: Contains all modular React components (`LandingPage`, `FilterBar`, `SpotGrid`, `SpotCard`, etc.).
- `/web/src/data`: Holds the static `nyc_spots.json` data source driving the application.
- `/web/public`: Contains static assets like the custom `favicon.svg`.

## 📊 Data Source
The directory is powered by a static JSON file (`nyc_spots.json`), which consolidates structured venue data extracted from personal Instagram saves and Google Maps lists.

---
*Built as a personal collection of the spots locals actually go to.*
