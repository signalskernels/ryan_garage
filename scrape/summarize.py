#!/usr/bin/env python3
"""Generate human-readable summary docs from harvested data."""
import json, os

ROOT = os.path.dirname(os.path.abspath(__file__))
META = os.path.join(ROOT, "meta")
CONTENT = os.path.join(ROOT, "content")

cm = json.load(open(os.path.join(META, 'content_manifest.json')))
biz = json.load(open(os.path.join(META, 'business_info.json')))
reviews = json.load(open(os.path.join(META, 'reviews.json')))
faqs = json.load(open(os.path.join(META, 'faqs.json')))

# ---------- business_info.md ----------
addr = biz.get('address', {})
b = []
b.append("# Business Information — Ryan Garage Door\n")
b.append("_Source: LocalBusiness JSON-LD + sitewide footer (verbatim from the live site)._\n")
b.append("| Field | Value |")
b.append("|---|---|")
b.append(f"| Business name | {biz.get('name','')} |")
b.append(f"| Phone | {biz.get('telephone','')} |")
b.append(f"| Email | {biz.get('email','') or '(none listed on site)'} |")
b.append(f"| City / Region | {addr.get('addressLocality','')}, {addr.get('addressRegion','')} {addr.get('postalCode','')} |")
b.append(f"| Service model | Mobile-only (no storefront) |")
b.append(f"| Area served | 50-mile radius from Huntley, IL |")
b.append(f"| Hours | Open 24 hours, 7 days/week (24-hour emergency service) |")
b.append(f"| Payment accepted | {biz.get('paymentAccepted','')} |")
b.append(f"| Google Maps | {biz.get('hasMap','')} |")
b.append(f"| Logo | {biz.get('logo','')} |")
b.append(f"| Years in business | 6 years (per About/FAQ copy) |")
b.append("\n## Services offered\n")
for s in ["Garage Door Spring Repair", "Garage Door Roller Replacement",
          "Garage Door Installation", "Garage Door Replacement",
          "Garage Door Cable Repair", "Garage Door Maintenance",
          "Garage Door Opener Repair", "Keyless Entry System Installation"]:
    b.append(f"- {s}")
b.append("\n## Service-area pages (nearby cities)\n")
for c in ["Huntley, IL (primary)", "West Chicago, IL", "Woodstock, IL",
          "Batavia, IL", "Vernon Hills, IL", "McHenry, IL"]:
    b.append(f"- {c}")
b.append("\n## Promotions (from homepage)\n")
b.append("- Senior, Military & New Customer discount")
b.append("- End-of-Month discount")
open(os.path.join(CONTENT, '_business-info.md'), 'w').write('\n'.join(b) + '\n')

# ---------- faq.md (clean Q&A) ----------
f = ["# FAQ — verbatim Q&A (from FAQPage schema)\n"]
for q, a in faqs.items():
    f.append(f"### {q}\n\n{a}\n")
open(os.path.join(CONTENT, '_faq-qa.md'), 'w').write('\n'.join(f) + '\n')

# ---------- reviews.md ----------
r = ["# Customer Reviews (verbatim)\n",
     f"_Total on site: {len(reviews)}._\n"]
for rev in reviews:
    r.append(f"### {rev['title']} — {rev['rating']}★\n")
    r.append(f"**{rev['author']}** · {rev['date']}\n")
    r.append(f"{rev['body']}\n")
open(os.path.join(CONTENT, '_reviews.md'), 'w').write('\n'.join(r) + '\n')

# ---------- site_structure.md ----------
def section(p):
    s = p['slug']
    if s == 'home': return '0 Home'
    if s.startswith('blog__') and s.count('__') == 1 and 'garage-door-' in s and '-il' not in s and len(s.split('__')[1].split('-')) <= 4:
        return '4 Blog categories'
    if s.startswith('blog__'): return '5 Blog posts'
    if s == 'blog': return '4 Blog categories'
    if s.endswith('-huntley-il'): return '2 Service pages'
    if s.endswith('-il'): return '3 Service-area pages'
    return '1 Main pages'

groups = {}
for p in cm['pages']:
    groups.setdefault(section(p), []).append(p)

st = ["# Site Structure / Information Architecture\n",
      f"Total pages scraped: **{len(cm['pages'])}**. Live URL: https://garagedoorrepair-il.com/\n"]
for g in sorted(groups):
    st.append(f"\n## {g[2:]}\n")
    for p in sorted(groups[g], key=lambda x: x['url']):
        st.append(f"### {p['url']}")
        st.append(f"- **Title:** {p['title']}")
        if p['meta_description']:
            st.append(f"- **Meta description:** {p['meta_description']}")
        st.append(f"- **Content file:** `content/{p['slug']}.md`")
        st.append("")
open(os.path.join(META, 'site_structure.md'), 'w').write('\n'.join(st) + '\n')

print("Wrote _business-info.md, _faq-qa.md, _reviews.md, site_structure.md")
print("Page groups:", {g[2:]: len(v) for g, v in sorted(groups.items())})
