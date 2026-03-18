import json
import urllib.request
import urllib.parse
import re
import time
import sys

def fetch_search_results(query):
    url = "https://lite.duckduckgo.com/lite/"
    data = urllib.parse.urlencode({"q": query}).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"User-Agent": "Mozilla/5.0"})
    try:
        html = urllib.request.urlopen(req).read().decode("utf-8")
        snippets = re.findall(r"<td class='result-snippet'[^>]*>(.*?)</td>", html, re.DOTALL | re.IGNORECASE)
        snippets = [re.sub(r"<[^>]+>", "", s).strip() for s in snippets]
        return " ".join(snippets[:4])
    except Exception as e:
        return ""

def extract_rating_reviews_price(text):
    rating = None
    reviews = None
    price = None
    
    # E.g. "4.6 (1,504)" or "Rating: 4.6 - 1,504 reviews" or "4.6 · 1,504 reviews"
    rating_match = re.search(r'(?:Rating:\s*)?([1-5]\.\d)[^\d]{1,15}?([\d,]+)\s*(?:reviews|votes|\))', text, re.IGNORECASE)
    if rating_match:
        rating = rating_match.group(1)
        reviews = rating_match.group(2)
        
    # E.g. "Price: $50–100", "$$ - $$$", "$$$"
    if '$$$$' in text: price = '$$$$'
    elif '$$$' in text: price = '$$$'
    elif '$$' in text: price = '$$'
    elif '$' in text and not '$50' in text and not '$100' in text and not '$20' in text: price = '$'
    
    price_match = re.search(r'\$(\d+(?:–|-)\d+|\d+\+)', text)
    if price_match:
        price = "$" + price_match.group(1)
        
    return rating, reviews, price

# Prompt LLM using local API or simple string matching for summary
# Actually, since I don't have LLM inside python, I will just extract it directly with python
def extract_summary(text):
    # Just take the first two sentences from the snippet as the summary if available
    sentences = re.split(r'(?<=[.!?])\s+', text)
    if len(sentences) > 0:
        return " ".join(sentences[:2])
    return ""

with open("/Users/shuklamoksh/Documents/personal_dev/insta_app/nyc_spots.json", "r") as f:
    data = json.load(f)

print("Processing Instagram Spots...")
for spot in data.get("instagram_spots", []):
    if spot.get("rating") is None or spot.get("reviews") is None or spot.get("price") is None:
        query = f'{spot["name"]} {spot.get("neighborhood", "")} NYC Google Maps reviews rating price'
        print(f"Searching: {query}")
        snippet = fetch_search_results(query)
        time.sleep(1) # rate limiting
        r, rev, p = extract_rating_reviews_price(snippet)
        if spot.get("rating") is None and r: spot["rating"] = r
        if spot.get("reviews") is None and rev: spot["reviews"] = rev
        if spot.get("price") is None and p: spot["price"] = p

print("Processing Google Maps Spots...")
for spot in data.get("google_maps_spots", []):
    # Add an empty highlights array if missing to be consistent
    if "highlights" not in spot:
        spot["highlights"] = []
    
    # We want to extract summary information. Let's do a search.
    # Since there are 67 spots, duckduckgo might rate limit us if we do it all in a row quickly without pause.
    # Let's add 0.5s pause.
    # To avoid rewriting everything, let's only search for ones that don't have descriptive highlights
    # Google maps highlights are like ["Cocktail bar", "$50-100"] which are not real descriptions.
    has_real_highlight = False
    for h in spot.get("highlights", []):
        if len(h.split()) > 3: # A real description is longer than 3 words (not just 'Cocktail bar')
            has_real_highlight = True
            break
            
    if not has_real_highlight:
        query = f'{spot["name"]} NYC restaurant bar description'
        print(f"Searching for summary: {spot['name']}")
        snippet = fetch_search_results(query)
        time.sleep(1)
        summary = extract_summary(snippet)
        if summary and "DuckDuckGo" not in summary:
            # clear the useless highlights and add the summary
            spot["highlights"] = [summary]
        else:
            spot["highlights"] = [f"{spot.get('type','Location')} in NYC"]

# standardize missing fields for Google Maps spots
for spot in data.get("google_maps_spots", []):
    if "id" not in spot:
        spot["id"] = "gm_" + str(hash(spot["name"] + str(spot.get("list", ""))))[:8]
    if "cuisine" not in spot:
        spot["cuisine"] = spot.get("type")
    if "neighborhood" not in spot:
        spot["neighborhood"] = "NYC"
    if "address" not in spot:
        spot["address"] = None
    if "reservations" not in spot:
        spot["reservations"] = "Unknown"
    if "instagram" not in spot:
        spot["instagram"] = None
    if "source_url" not in spot:
        spot["source_url"] = None
    if "notes" not in spot:
        spot["notes"] = spot.get("notes", None)
    if "source_collection" not in spot:
        spot["source_collection"] = spot.pop("list", None)

with open("/Users/shuklamoksh/Documents/personal_dev/insta_app/nyc_spots.json", "w") as f:
    json.dump(data, f, indent=2)

print("Done.")

