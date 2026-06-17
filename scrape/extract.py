#!/usr/bin/env python3
"""Extract clean content + structured data from the mirrored WordPress site.
Pure stdlib (no external deps). Produces per-page markdown, shared boilerplate,
and a JSON content manifest ready for a redesign.
"""
import html, os, re, json, glob, math
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.abspath(__file__))
MIRROR = os.path.join(ROOT, "raw_mirror", "garagedoorrepair-il.com")
CONTENT = os.path.join(ROOT, "content")
META = os.path.join(ROOT, "meta")
os.makedirs(CONTENT, exist_ok=True)
os.makedirs(META, exist_ok=True)

BLOCK = {'p','div','section','article','header','footer','nav','li','ul','ol',
         'h1','h2','h3','h4','h5','h6','br','tr','table','blockquote','figure',
         'figcaption','main','dd','dt'}
SKIP = {'script','style','noscript','svg','template','iframe','head'}
HEADINGS = {'h1','h2','h3','h4','h5','h6'}


class Extractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.parts = []
        self.headings = []
        self.images = []
        self.links = []
        self.metas = {}
        self.title = None
        self.canonical = None
        self.in_title = False
        self.cur_h = None
        self.cur_h_buf = []
        self.cur_a = None
        self.cur_a_buf = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in SKIP:
            self.skip += 1
            return
        if self.skip:
            return
        if tag == 'title':
            self.in_title = True
        elif tag == 'meta':
            key = a.get('name') or a.get('property')
            if key and a.get('content') is not None:
                self.metas[key] = a['content']
        elif tag == 'link' and a.get('rel') == 'canonical':
            self.canonical = a.get('href')
        elif tag == 'img':
            src = a.get('src', '')
            if src.startswith('data:') or not src:
                src = (a.get('data-lazy-src') or a.get('data-src')
                       or a.get('data-orig-file') or src)
            if not src.startswith('data:') or not (a.get('data-lazy-src') or a.get('data-src')):
                self.images.append({'src': src, 'alt': a.get('alt', ''),
                                    'title': a.get('title', '')})
        elif tag in HEADINGS:
            self.cur_h = int(tag[1]); self.cur_h_buf = []
        elif tag == 'a':
            self.cur_a = a.get('href'); self.cur_a_buf = []
        if tag in BLOCK:
            self.parts.append('\n')

    def handle_endtag(self, tag):
        if tag in SKIP:
            if self.skip:
                self.skip -= 1
            return
        if self.skip:
            return
        if tag == 'title':
            self.in_title = False
        elif tag in HEADINGS and self.cur_h is not None:
            t = ' '.join(''.join(self.cur_h_buf).split())
            if t:
                self.headings.append((self.cur_h, t))
            self.cur_h = None; self.cur_h_buf = []
        elif tag == 'a' and self.cur_a is not None:
            t = ' '.join(''.join(self.cur_a_buf).split())
            self.links.append({'href': self.cur_a or '', 'text': t})
            self.cur_a = None; self.cur_a_buf = []
        if tag in BLOCK:
            self.parts.append('\n')

    def handle_data(self, data):
        if self.skip:
            return
        if self.in_title:
            self.title = (self.title or '') + data
            return
        self.parts.append(data)
        if self.cur_h is not None:
            self.cur_h_buf.append(data)
        if self.cur_a is not None:
            self.cur_a_buf.append(data)

    def lines(self):
        text = ''.join(self.parts)
        out = []
        for raw in text.split('\n'):
            line = ' '.join(raw.split())
            if line:
                out.append(line)
        # collapse consecutive duplicates
        dedup = []
        for l in out:
            if not dedup or dedup[-1] != l:
                dedup.append(l)
        return dedup


def url_from_path(p):
    rel = os.path.relpath(p, MIRROR).replace('\\', '/')
    if rel == 'index.html':
        return 'https://garagedoorrepair-il.com/'
    rel = rel[:-len('index.html')] if rel.endswith('/index.html') else rel
    return 'https://garagedoorrepair-il.com/' + rel


def slug_from_url(u):
    s = u.replace('https://garagedoorrepair-il.com/', '').strip('/')
    return s.replace('/', '__') if s else 'home'


# ---- pass 1: parse every real page ----
page_files = sorted(set(glob.glob(os.path.join(MIRROR, '**', 'index.html'), recursive=True)))

pages = []
for f in page_files:
    with open(f, 'r', encoding='utf-8', errors='replace') as fh:
        raw = fh.read()
    ex = Extractor()
    try:
        ex.feed(raw)
    except Exception as e:
        print('parse error', f, e)
    url = url_from_path(f)
    pages.append({
        'file': os.path.relpath(f, ROOT),
        'url': url,
        'slug': slug_from_url(url),
        'title': html.unescape((ex.title or '').strip()),
        'meta_description': ex.metas.get('description', ''),
        'og_title': ex.metas.get('og:title', ''),
        'og_description': ex.metas.get('og:description', ''),
        'og_image': ex.metas.get('og:image', ''),
        'canonical': ex.canonical or '',
        'headings': ex.headings,
        'images': ex.images,
        'links': ex.links,
        'lines': ex.lines(),
    })

# ---- boilerplate detection ----
n = len(pages)
freq = {}
for p in pages:
    for l in set(p['lines']):
        freq[l] = freq.get(l, 0) + 1
thresh = max(2, math.ceil(0.6 * n))
boiler = {l for l, c in freq.items() if c >= thresh}

# ---- write per-page markdown (unique content) ----
for p in pages:
    body = [l for l in p['lines'] if l not in boiler]
    md = []
    md.append(f"# {p['title'] or p['slug']}\n")
    md.append(f"- **URL:** {p['url']}")
    if p['canonical']:
        md.append(f"- **Canonical:** {p['canonical']}")
    if p['meta_description']:
        md.append(f"- **Meta description:** {p['meta_description']}")
    md.append("")
    md.append("## Heading outline\n")
    for lvl, t in p['headings']:
        md.append(f"{'  ' * (lvl - 1)}- (h{lvl}) {t}")
    md.append("\n## Page content (boilerplate removed)\n")
    md.extend(body if body else ['_(no unique content extracted)_'])
    if p['images']:
        md.append("\n## Images on this page\n")
        for im in p['images']:
            alt = im['alt'] or im['title'] or ''
            md.append(f"- `{im['src']}`" + (f" — alt: {alt}" if alt else ""))
    with open(os.path.join(CONTENT, p['slug'] + '.md'), 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(md) + '\n')

# ---- write shared boilerplate ----
with open(os.path.join(CONTENT, '_boilerplate.md'), 'w', encoding='utf-8') as fh:
    fh.write('# Shared boilerplate (header / footer / CTA repeated across pages)\n\n')
    fh.write(f'Lines appearing on >= {thresh} of {n} pages.\n\n')
    for l in sorted(boiler):
        fh.write(f'- {l}\n')

# ---- JSON manifest (strip lines for compactness, keep structured) ----
manifest = []
for p in pages:
    q = dict(p)
    q['unique_content'] = [l for l in p['lines'] if l not in boiler]
    del q['lines']
    manifest.append(q)
with open(os.path.join(META, 'content_manifest.json'), 'w', encoding='utf-8') as fh:
    json.dump({'pages': manifest, 'boilerplate': sorted(boiler)}, fh, indent=2)

print(f'Parsed {n} pages -> {CONTENT}')
print(f'Boilerplate lines: {len(boiler)} (threshold {thresh})')
