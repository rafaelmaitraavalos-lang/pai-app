#!/usr/bin/env python3
"""
Fetch one hero image per lesson from Unsplash.
Usage: python3 scripts/fetch-images.py YOUR_ACCESS_KEY
Images saved to public/images/lessons/lesson-{id}.jpg
"""

import sys, os, time, urllib.request, json, urllib.parse

if len(sys.argv) < 2:
    print("Usage: python3 scripts/fetch-images.py YOUR_ACCESS_KEY")
    sys.exit(1)

KEY = sys.argv[1]
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'lessons')
os.makedirs(OUT, exist_ok=True)

# Search query for each lesson — tuned for editorial/educational feel
LESSONS = {
    # World 1 — What Is AI?
    1:  "ancient greek philosophy scroll manuscript",
    2:  "artificial intelligence technology abstract",
    3:  "smartphone technology human connection",
    4:  "chess robot versus human",
    5:  "machine learning data neural network",
    6:  "algorithm error code technology",
    7:  "brain neuroscience thinking abstract",
    # World 2 — How AI Thinks
    8:  "neuron synapse brain microscope",
    9:  "data training fitness sports",
    10: "layered architecture depth abstract",
    11: "chatbot conversation interface screen",
    12: "recommendation feed social media scroll",
    13: "camera lens vision optics photography",
    14: "black box mystery closed system",
    15: "decision justice scale courtroom",
    # World 3 — AI and Society
    16: "factory automation robot worker",
    17: "art creativity painting generative",
    18: "privacy surveillance camera city",
    19: "hospital doctor medical technology",
    20: "classroom student learning technology",
    21: "democracy vote election ballot",
    22: "laboratory science research discovery",
    23: "city life smartphone commute everyday",
    # World 4 — AI Ethics
    24: "ethics philosophy books library",
    25: "bias inequality scale justice",
    26: "consent privacy document signing",
    27: "accountability responsibility leadership",
    28: "transparency glass window light",
    29: "manipulation puppet strings control",
    30: "alignment compass direction navigation",
    31: "government policy people vote",
    # World 5 — AI in Context
    32: "future technology horizon landscape",
    33: "AGI robot superintelligence science fiction",
    34: "alignment safety guard protection",
    35: "existential risk catastrophe warning",
    36: "regulation policy government building",
    37: "identity human face reflection",
    38: "generation young people future technology",
    39: "action hands building creation",
    # World 6 — How Neural Networks Work
    40: "mathematics equation formula blackboard",
    41: "signal wave forward propagation",
    42: "loss gradient slope mountain descent",
    43: "backpropagation feedback loop cycle",
    44: "activation function switch electricity",
    45: "attention focus spotlight beam",
    46: "transformer architecture building structure",
    47: "scale large server data center",
    # World 7 — Build With AI
    48: "prompt writing keyboard creative",
    49: "engineering blueprint design technical",
    50: "API interface code developer screen",
    51: "database retrieval search library",
    52: "fine tuning instrument music adjust",
    53: "agent autonomous robot task",
    54: "evaluation testing assessment chart",
    55: "responsible building construction team",
    # World 8 — The Frontier
    56: "multimodal collage visual audio text",
    57: "agent swarm network autonomous",
    58: "frontier horizon telescope stars",
    59: "science discovery breakthrough laboratory",
    60: "robot embodied physical world",
    61: "safety shield protection research",
    62: "geopolitics globe map power",
    63: "future dawn sunrise horizon hope",
}

BASE = "https://api.unsplash.com/search/photos"

def fetch(lesson_id, query):
    dest = os.path.join(OUT, f"lesson-{lesson_id}.jpg")
    if os.path.exists(dest):
        print(f"  [{lesson_id:02d}] already exists, skipping")
        return True

    params = urllib.parse.urlencode({
        'query': query,
        'per_page': 1,
        'orientation': 'landscape',
        'content_filter': 'high',
    })
    url = f"{BASE}?{params}"
    req = urllib.request.Request(url, headers={
        'Authorization': f'Client-ID {KEY}',
        'Accept-Version': 'v1',
    })

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())

        results = data.get('results', [])
        if not results:
            print(f"  [{lesson_id:02d}] NO RESULTS for '{query}'")
            return False

        photo = results[0]
        img_url = photo['urls']['regular']  # ~1080px wide
        photographer = photo['user']['name']
        unsplash_url = photo['links']['html']

        # Download image
        urllib.request.urlretrieve(img_url, dest)
        print(f"  [{lesson_id:02d}] ✓ '{query[:40]}' — Photo by {photographer}")
        return True

    except Exception as e:
        print(f"  [{lesson_id:02d}] ERROR: {e}")
        return False

print(f"Fetching {len(LESSONS)} images from Unsplash...\n")
ok = 0
for lid, q in LESSONS.items():
    if fetch(lid, q):
        ok += 1
    time.sleep(0.4)  # stay well under 50 req/min

print(f"\nDone: {ok}/{len(LESSONS)} images saved to public/images/lessons/")
