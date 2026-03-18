import json
import urllib.request
import urllib.parse
import re
import time

def fetch_search_results(query):
    url = "https://lite.duckduckgo.com/lite/"
    data = urllib.parse.urlencode({"q": query}).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"User-Agent": "Mozilla/5.0"})
    try:
        html = urllib.request.urlopen(req).read().decode("utf-8")
        snippets = re.findall(r"<td class='result-snippet'[^>]*>(.*?)</td>", html, re.DOTALL | re.IGNORECASE)
        snippets = [re.sub(r"<[^>]+>", "", s).strip() for s in snippets]
        return " ".join(snippets[:3])
    except Exception as e:
        return ""

print("Testing search:", fetch_search_results("Duomo51 Midtown Manhattan reviews price rating"))

with open("/Users/shuklamoksh/Documents/personal_dev/insta_app/nyc_spots.json", "r") as f:
    data = json.load(f)

print("Insta spots to process:", len(data.get("instagram_spots", [])))
print("Maps spots to process:", len(data.get("google_maps_spots", [])))

