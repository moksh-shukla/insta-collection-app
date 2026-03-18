export function normalizeType(raw) {
  if (!raw) return 'Other';
  const lower = raw.toLowerCase();

  if (lower.includes('speakeasy')) return 'Speakeasy';
  if (lower.includes('nightclub') || lower.includes('night club')) return 'Nightclub';
  if (lower.includes('rooftop')) return 'Rooftop Bar';
  if (lower.includes('jazz') || lower.includes('live music')) return 'Live Music';
  if (lower.includes('cafe') || lower.includes('café') || lower.includes('coffee') || lower.includes('bakery')) return 'Café';
  if (lower.includes('korean')) return 'Korean';
  if (lower.includes('indian')) return 'Indian';
  if (lower.includes('sichuan') || lower.includes('chinese')) return 'Chinese';
  if (lower.includes('japanese')) return 'Japanese';
  if (lower.includes('thai')) return 'Thai';
  if (lower.includes('mexican')) return 'Mexican';
  if (lower.includes('french')) return 'French';
  if (lower.includes('italian')) return 'Italian';
  if (lower.includes('pizza')) return 'Pizza';
  if (lower.includes('bar') || lower.includes('lounge') || lower.includes('cocktail') || lower.includes('pub')) return 'Bar';
  if (lower.includes('deli') || lower.includes('bodega') || lower.includes('sandwich') || lower.includes('bagel')) return 'Deli';
  if (lower.includes('museum') || lower.includes('event venue') || lower.includes('book store')) return 'Events & Culture';
  if (lower.includes('restaurant') || lower.includes('diner') || lower.includes('american') || lower.includes('fast food')) return 'Restaurant';

  return 'Other';
}

export function normalizeNeighborhood(raw) {
  if (!raw) return raw;
  const lower = raw.toLowerCase();

  if (lower.includes('west village')) return 'West Village';
  if (lower.includes('soho') && lower.includes('nolita')) return 'SoHo / Nolita';
  if (lower === 'nolita') return 'SoHo / Nolita';
  if (lower.includes('soho')) return 'SoHo';
  if (lower.includes('koreatown') || lower.includes('k-town')) return 'Koreatown';
  if (lower.includes('chinatown') && lower.includes('lower east side')) return 'Chinatown / LES';
  if (lower.includes('lower east side')) return 'Lower East Side';
  if (lower.includes('chinatown')) return 'Chinatown';
  if (lower.includes('midtown') || lower.includes('murray hill')) return 'Midtown';
  if (lower.includes('upper east side')) return 'Upper East Side';
  if (lower.includes('east village')) return 'East Village';
  if (lower.includes('greenwich village')) return 'Greenwich Village';
  if (lower.includes('manhattan')) return 'Manhattan';

  return raw;
}

export function normalizePrice(raw) {
  if (!raw) return null;
  const lower = raw.trim().toLowerCase();
  
  if (lower === '$' || lower === '$10–20') return 'Budget';
  if (['$20–30', '$30–40', '$30–50', '$40–50', '$$$', 'moderately priced'].includes(lower)) return 'Mid-range';
  if (lower === '$50–100') return 'Upscale';
  if (lower === '$100+') return 'Splurge';

  return null;
}

export function sortPrices(arr) {
  const order = { 'Budget': 1, 'Mid-range': 2, 'Upscale': 3, 'Splurge': 4 };
  return [...arr].sort((a, b) => (order[a] || 99) - (order[b] || 99));
}
