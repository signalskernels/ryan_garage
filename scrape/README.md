# Ryan Garage Door — Full Site Scrape

Complete archive of **https://garagedoorrepair-il.com/** captured **2026-06-14**, organized
for a ground-up redesign. Everything on the live site — copy, structure, images, styles —
is here so the rebuild can proceed without touching the original site again.

The site is WordPress + Divi. **41 unique pages**, **91 images (4.7 MB)**, all CSS/JS/fonts.

---

## Where to look first (redesign-ready content)

| File | What it is |
|---|---|
| `content/_business-info.md` | NAP, hours, service model, payments, services list, service areas, promos |
| `meta/site_structure.md` | Full IA — every page grouped, with title + meta description |
| `content/_faq-qa.md` | 10 FAQ questions & answers (verbatim) |
| `content/_reviews.md` | **Cross-platform review summary** (Google/HomeAdvisor/Angi/Thumbtack/Nextdoor/Yelp/FB) — aggregates + 19 verbatim + business intel |
| `content/_google-reviews.md` | **All 115 Google Maps reviews** verbatim (105 with text + 10 rating-only) |
| `content/_boilerplate.md` | Header / nav / footer / CTA repeated sitewide (extracted once) |
| `content/*.md` | One file per page: title, meta, heading outline, body copy (boilerplate stripped), images + alt |
| `meta/assets_manifest.csv` | Every image: file, size, which pages use it, alt text |

## Directory layout

```
scrape/
├── README.md                  ← this file
├── content/                   ← clean per-page copy as markdown (THE redesign content)
│   ├── _business-info.md
│   ├── _faq-qa.md
│   ├── _reviews.md
│   ├── _boilerplate.md
│   └── <page-slug>.md         ← 41 pages (e.g. home.md, about.md, garage-door-spring-repair-huntley-il.md)
├── assets/
│   └── images/                ← clean drop-in library: 62 full-resolution originals (logo + all photos, responsive dupes removed)
├── meta/                      ← structured data + indexes
│   ├── site_structure.md      ← human-readable IA
│   ├── content_manifest.json  ← all pages: titles, metas, headings, links, images, unique content
│   ├── business_info.json     ← LocalBusiness schema (raw)
│   ├── reviews.json          ← on-site testimonial(s)
│   ├── reviews_external.json  ← off-site review aggregates + HomeAdvisor/Angi/Thumbtack verbatim
│   ├── google_reviews.json    ← all 115 Google Maps reviews (structured)
│   ├── faqs.json
│   ├── assets_manifest.csv    ← image usage map
│   └── page_urls.txt          ← source list from sitemap
├── raw_mirror/                ← byte-for-byte wget mirror (HTML + all assets, links localized)
│   └── garagedoorrepair-il.com/
│       ├── <page>/index.html  ← original HTML for every page
│       └── wp-content/uploads ← all 91 images (the asset library)
├── _junk/                     ← quarantined WordPress noise (oembed JSON, homepage dupes)
└── *.py                       ← extraction scripts used to build the above (re-runnable)
```

## Business snapshot

- **Ryan Garage Door** — Huntley, IL 60142 · **(224) 770-0587**
- Mobile-only (no storefront) · **Open 24 hours, 7 days** · serves a 50-mile radius
- Payments: Visa, Mastercard, Amex, Discover, PayPal, Cash, Check, CashApp, Zelle
- Google Maps: https://maps.app.goo.gl/AWFXcd6ZD4Suiu3S6
- 6 years in business · discounts for Seniors / Military / New Customers + end-of-month

## Page inventory (41)

- **1 Home**
- **6 Main:** About, Contact, FAQ, Gallery, Testimonials, Blog index
- **7 Service pages** (Huntley): spring repair, roller replacement, installation, replacement, cable repair, maintenance, opener repair
- **5 Service-area pages:** West Chicago, Woodstock, Batavia, Vernon Hills, McHenry
- **8 Blog category** archives + **14 Blog posts**

## Forms (contact page)

Contact form fields: **Name\*, Email\*, Phone (optional), Message (min 5 chars)**, plus a
captcha code. A "Review Us" page (`/rw/`) links out to leave a Google review.

## Notes / caveats

- The live site shows only **1 testimonial** (Janelle Ortiz), but the business has **~265 reviews off-site, all 5.0★**
  (**Google ~115**, Thumbtack 123, HomeAdvisor/Angi 13, Nextdoor 13). See `content/_reviews.md` (summary) and
  `content/_google-reviews.md` (all 115 Google reviews) — surfacing this social proof on the new site is a clear win.
  **124 reviews captured verbatim**. (Google blocks automated fetching from this server — the Google set was copied
  in by the client; the rest are partly JS/login-gated.)
- Reviews surfaced the **full street address** (11713 Woodcreek Dr S, Apt E, Huntley, IL 60142) and a claim
  discrepancy to confirm: Angi says "no emergency service" while the site advertises 24/7.
- No email address is published on the site (phone-only contact).
- Images are WordPress `.webp` and include multiple responsive sizes (e.g. `-400x284`,
  `-768x512`); the no-suffix file is the full-resolution original.
- `raw_mirror/` has links converted to local paths, so it opens offline in a browser for
  visual reference of the old design.
- To regenerate everything from the mirror: `python3 extract.py && python3 structured.py && python3 summarize.py && python3 reviews_compile.py && python3 gmaps_reviews.py`
  (`reviews_compile.py` and `gmaps_reviews.py` hold off-site reviews captured 2026-06-14; they aren't in the mirror.)
