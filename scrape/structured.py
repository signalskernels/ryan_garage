#!/usr/bin/env python3
"""Harvest all JSON-LD across mirrored pages -> business info, reviews, FAQ.
Also build the asset manifest (uploads images + which pages use them)."""
import re, json, glob, os, csv

ROOT = os.path.dirname(os.path.abspath(__file__))
MIRROR = os.path.join(ROOT, "raw_mirror", "garagedoorrepair-il.com")
META = os.path.join(ROOT, "meta")
CONTENT = os.path.join(ROOT, "content")

LD_RE = re.compile(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', re.S)

def iter_ld():
    for f in glob.glob(os.path.join(MIRROR, '**', 'index.html'), recursive=True) + \
             [os.path.join(MIRROR, 'index.html')]:
        if not os.path.exists(f):
            continue
        url = 'https://garagedoorrepair-il.com/' + os.path.relpath(f, MIRROR).replace('index.html', '')
        html = open(f, encoding='utf-8', errors='replace').read()
        for blk in LD_RE.findall(html):
            try:
                yield url, json.loads(blk)
            except Exception:
                pass

local_business = None
reviews = {}
faqs = {}
services = {}

for url, data in iter_ld():
    nodes = data.get('@graph', [data]) if isinstance(data, dict) else (data if isinstance(data, list) else [data])
    for node in nodes:
        if not isinstance(node, dict):
            continue
        t = node.get('@type', '')
        types = t if isinstance(t, list) else [t]
        if 'LocalBusiness' in types and not local_business:
            local_business = node
        if 'Review' in types:
            key = (node.get('author', {}).get('name', ''), node.get('name', ''))
            reviews[key] = {
                'author': node.get('author', {}).get('name', ''),
                'title': node.get('name', ''),
                'rating': node.get('reviewRating', {}).get('ratingValue', ''),
                'date': node.get('datePublished', ''),
                'body': node.get('reviewBody', ''),
            }
        if 'FAQPage' in types:
            for q in node.get('mainEntity', []):
                ans = q.get('acceptedAnswer', {})
                faqs[q.get('name', '')] = re.sub('<[^>]+>', '', ans.get('text', '')).strip()
        if 'Service' in types:
            services[node.get('name', '')] = node.get('description', '')

# business info
os.makedirs(META, exist_ok=True)
with open(os.path.join(META, 'business_info.json'), 'w') as fh:
    json.dump(local_business or {}, fh, indent=2)

# reviews
rev_list = list(reviews.values())
with open(os.path.join(META, 'reviews.json'), 'w') as fh:
    json.dump(rev_list, fh, indent=2)

# faqs
with open(os.path.join(META, 'faqs.json'), 'w') as fh:
    json.dump(faqs, fh, indent=2)

# ---- asset manifest ----
cm = json.load(open(os.path.join(META, 'content_manifest.json')))
img_pages = {}   # filename -> set(pages)
img_alts = {}    # filename -> set(alts)
# alt text from the parsed manifest (match by basename)
alt_by_base = {}
for p in cm['pages']:
    for im in p['images']:
        if 'wp-content/uploads' in im.get('src', '') and im.get('alt'):
            alt_by_base[os.path.basename(im['src'])] = im['alt']
# usage: scan raw HTML of each page for upload references (catches lazy-load)
UP_RE = re.compile(r'wp-content/uploads/([^"\'?\s)]+\.(?:webp|jpg|jpeg|png|gif|svg))', re.I)
for f in glob.glob(os.path.join(MIRROR, '**', 'index.html'), recursive=True) + \
         [os.path.join(MIRROR, 'index.html')]:
    if not os.path.exists(f):
        continue
    slug = os.path.relpath(f, MIRROR).replace('/index.html', '').replace('index.html', 'home') or 'home'
    html = open(f, encoding='utf-8', errors='replace').read()
    for fn in set(UP_RE.findall(html)):
        # strip WP size suffix (-400x284) to map thumbnails to their source asset too
        img_pages.setdefault(fn, set()).add(slug)
        alt = alt_by_base.get(os.path.basename(fn))
        if alt:
            img_alts.setdefault(fn, set()).add(alt)

# every downloaded upload file (even if not referenced)
uploads = []
ubase = os.path.join(MIRROR, 'wp-content', 'uploads')
for f in glob.glob(os.path.join(ubase, '**', '*'), recursive=True):
    if os.path.isfile(f):
        rel = os.path.relpath(f, ubase)
        size = os.path.getsize(f)
        uploads.append((rel, size))

with open(os.path.join(META, 'assets_manifest.csv'), 'w', newline='') as fh:
    w = csv.writer(fh)
    w.writerow(['file', 'bytes', 'used_on_pages', 'alt_texts'])
    for rel, size in sorted(uploads):
        pages = sorted(img_pages.get(rel, []))
        alts = ' | '.join(sorted(img_alts.get(rel, [])))
        w.writerow([rel, size, ';'.join(pages), alts])

print('LocalBusiness:', bool(local_business))
print('Reviews:', len(rev_list))
print('FAQs:', len(faqs))
print('Services (schema):', len(services))
print('Upload files catalogued:', len(uploads))
print('Referenced uploads:', len(img_pages))
