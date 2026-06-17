# Ryan Garage Door — Website Implementation Plan

**Companion to:** `research/garage-door-website-feature-report.md` (the competitive feature research this plan implements).
**Date:** June 14, 2026.
**Scope:** Architecture, stack decision, content model, feature-integration plan, performance/SEO plan, and a phased build roadmap for Ryan Garage Door's new high-end marketing site.
**Proposed stack (client):** TinaCMS on TinaCloud free tier + Netlify. **Verdict below: endorsed, with two refinements (use Astro; mind Netlify's free-tier limits).**

---

## 1. Verdict on the proposed stack

**TinaCMS + TinaCloud (free) + Netlify is a good fit for this project — approved, with three opinions baked in:**

1. **Keep TinaCMS + TinaCloud free.** It's the best git-backed CMS for a *non-technical owner* because editing is visual/in-context (click text on the live page, edit in a sidebar, live preview). The free tier's **2 users** covers the owner + the developer/agency, and TinaCloud removes all server/database ops. The only real cost is a one-time **developer setup** (the owner can't wire up visual editing themselves). This is the right tradeoff for a marketing site.
2. **Build it in Astro, not Next.js.** This site is content + ~25 mostly-static pages + a stack of third-party widgets (booking, chat, reviews, financing, visualizer). Astro's island architecture gives the **best Core Web Vitals** under that widget load, ships near-zero JS by default, and includes first-class **image optimization, sitemap, and Partytown** integrations. Tina now supports **React-free visual editing on Astro** (`@tinacms/astro`). Next.js's advantages (SSR/ISR, heavy React interactivity) don't apply to a static marketing site, and Next-on-Netlify has SSR/ISR edge-case caveats. *Astro is the cleaner choice here.*
3. **Netlify is fine, but go in eyes-open on the free tier.** As of 2025–26 Netlify Free is **credit-based (300 credits/mo) with a HARD STOP** — if you blow the budget (e.g., a traffic spike on un-optimized images), *all sites pause and visitors see an error*. Free also allows **only 1 team member**. For a business where downtime = lost leads, either (a) optimize images aggressively and accept the small risk, (b) pay **$9/mo Personal** for auto-recharge/safety, or (c) host on **Cloudflare Pages** (unlimited bandwidth, no hard stop, commercial use allowed) and use a form service instead of Netlify Forms. **Recommendation: start on Netlify (its built-in free Forms + DX are genuinely convenient); budget the $9 plan once live.** *Do NOT use Vercel's free Hobby tier — its terms explicitly prohibit commercial/for-profit sites.*

**One-line summary:** `Astro + TinaCMS (TinaCloud free) + Netlify` → a fast, cheap (~$0–$9/mo hosting+CMS), owner-editable Jamstack marketing site, with every conversion feature added as a vendor-hosted embed/link.

---

## 2. Stack decision detail & facts

| Layer | Choice | Why | Verified facts / caveats |
|---|---|---|---|
| **Framework** | **Astro** (SSG) | Best CWV under heavy 3rd-party widgets; near-zero JS; great DX for content + programmatic pages | Tina supports React-free visual editing via `@tinacms/astro` (needs SSR adapter for live editing). Next.js is the documented-heaviest Tina pairing but unnecessary here. |
| **CMS** | **TinaCMS + TinaCloud (Free)** | Visual/in-context editing for non-technical owner; git-backed (content as Markdown/JSON in the repo); no DB to run | Free = **2 users**, visual editing included, **no editorial workflow** (drafts/approvals need Team Plus ~$41/mo). 100 MiB/file upload cap; exact storage/request quotas unpublished. Self-hostable later to drop the SaaS dependency. |
| **Hosting** | **Netlify (Free → $9 Personal)** | Built-in free Forms + spam filtering, free SSL/CDN/custom domain, clean DX | Free = **credit model, 300/mo, hard stop**, **1 team member**, Forms now **free**. Alt: **Cloudflare Pages** (unlimited bandwidth, no hard stop, commercial OK, but bring your own form handler). **Avoid Vercel Hobby (commercial-use ban).** |
| **Repo / CI** | GitHub + Netlify auto-deploy | Tina requires a git backend; Netlify builds on push | Free Netlify build minutes (~300/mo equiv.) are ample for a low-change marketing site. |

---

## 3. Information architecture (sitemap)

Mirror and upgrade the current WordPress structure; add programmatic location pages.

```
/                            Home (hero + booking CTA + trust strip + services + reviews + service area)
/about
/contact                     (form + map + hours + click-to-call)
/book                        Online scheduling (booking-platform embed)            ← NEW
/estimate                    Instant-quote / configurator (or multi-step form)     ← NEW
/financing                   Wisetack prequal + payment example                    ← NEW
/membership                  "Worry-Free" maintenance plan                         ← NEW
/visualizer                  Design-your-door CTA → Clopay EZDoor (link-out)       ← NEW
/reviews                     Aggregated reviews + "leave us a review" (Google)     ← UPGRADE
/gallery                     Before/after projects
/faq                         (+ FAQ schema)
/blog  /blog/{post}          Existing 12 posts + new buying guides/videos

Services (one page each, /services/{slug}):
  garage-door-repair, spring-repair, opener-repair, cable-repair,
  roller-replacement, installation, replacement, maintenance, keyless-entry

Locations (programmatic, /service-area/{city}): ~18 city pages          ← EXPAND
  huntley, batavia, mchenry, vernon-hills, west-chicago, woodstock,
  antioch, barrington, belvidere, bloomingdale, cary, geneva, grayslake,
  lindenhurst, north-aurora, south-elgin, sycamore, warrenville, wauconda
  (Service × City matrix can be generated too if SEO warrants it.)
```

**Programmatic pages:** generate all city pages at build time from a single `locations` data collection via Astro `getStaticPaths()`. Each must have **500+ words of unique content** (not city-swapped boilerplate) to rank — write a templated-but-varied body with local landmarks, the specific towns covered, and local testimonials.

---

## 4. Content model (TinaCMS collections)

Define these in `tina/config.ts` so the owner edits everything without touching code:

| Collection | Type | Key fields | Powers |
|---|---|---|---|
| `siteSettings` | single doc | phone, email, address, hours, social links, primary CTAs, discount banners | Header/footer/global |
| `pages` | markdown + blocks | flexible block sections (hero, services-grid, trust-strip, CTA, rich text) | Home, About, static pages |
| `services` | markdown | title, slug, summary, body, icon, FAQ items, related blog | /services/* |
| `locations` | markdown/JSON | city, slug, zip(s), intro, local landmarks, nearby towns, local reviews | programmatic /service-area/* |
| `posts` | markdown | title, slug, date, author, category, hero image, body, video embed | /blog/* |
| `reviews` | JSON | author, source, rating, quote, date, city | reviews carousel + location pages |
| `gallery` | JSON | before img, after img, caption, service, city | /gallery |
| `coupons` | JSON | title, amount, terms, group (military/senior/etc.), active | coupon blocks |
| `faqs` | JSON | question, answer, category | /faq + FAQ schema |
| `membership` | single doc | plan name, price, benefits[], inclusions, terms | /membership |

Block-based `pages` give the owner drag-and-drop section editing with visual preview — the headline benefit of choosing Tina.

---

## 5. Feature integration plan (how each conversion feature is added)

Every feature from the feature report maps to a **vendor-hosted embed or link** — no custom backend. Integration confirmed by research; legend: **EMBED** = drop-in script/iframe, **LINK** = button to a hosted page.

| Feature | Method | Vendor (recommended) | Notes / caveats |
|---|---|---|---|
| **Online booking** (date+time window) | **EMBED** (JS snippet / modal button) | **Housecall Pro** (preferred) or Jobber | HCP also unlocks **Reserve with Google**. Lazy-load behind a button (facade) to protect CWV. |
| **Reserve with Google** | Config (not a site embed) | via HCP + Google LSA | Lives on Google surfaces; set up through GBP + Local Services Ads (US-only). |
| **Instant quote / configurator** | Multi-step form (build) or platform estimate | Custom Astro form → HCP/Jobber, or A1-style staged form | v1 can be a multi-step quote form (gated price range + financing example); a true visual configurator = v2. |
| **Door visualizer** | **LINK-OUT** | **Clopay EZDoor** (`ezdoor.clopay.com`) | EZDoor is free/public but **not embeddable** (frame-blocked) and routes leads to Clopay dealers — best if Ryan carries Clopay. **Renoworks Pro is NOT a self-serve embed** (enterprise/sales-gated, custom integration) — defer to v2 if a branded on-site visualizer is wanted. |
| **Live chat / AI** | **EMBED** (script tag) | Podium (confirmed 1-script), ZyraTalk (~$99/mo), or HCP CSR-AI | Lazy-load (`client:idle`); one chat widget only to limit main-thread cost. |
| **24/7 answering** | Service (off-site) | HCP CSR-AI or **Rosie** (~$149/mo) | Justified by missed-call economics (see feature report §3). |
| **Financing** | **LINK** (prequal button) | **Wisetack** prequal link (or Synchrony) | Just an `<a>` to a unique hosted URL — zero integration. Also surfaces inside HCP/Jobber quotes ($500–$25K). |
| **Reviews display** | **EMBED** (JS widget) | **NiceJob** (~$75/mo, auto-requests) or **Trustindex** (free Google-reviews widget) | Reserve container height to avoid CLS; lazy-mount. |
| **Membership plan** | Native page | — | Model on A1 "Worry-Free Club" (~$12.95/mo). Static content. |
| **Coupons / promos** | Native (Tina `coupons` collection) | — | $50 off repair / $150–$250 off install + 5–10% military/senior/first-responder. "Show on phone, can't combine." |
| **Contact form** | **EMBED**/native | **Netlify Forms** (free) or Formspree/Basin | JS-rendered forms need a static hidden "blueprint" form for Netlify to detect them. |
| **Click-to-call + sticky mobile bar** | Native | `tel:` links + CSS sticky bar | Persistent sitewide CTA. |

**Architecture principle:** the marketing site stays static/fast; all transactional state (scheduling, payments, customer portal, dispatch/ETA) lives in **Housecall Pro/Jobber**, surfaced via embeds. This keeps the build simple and the hosting free.

---

## 6. SEO & performance plan

**Structured data (JSON-LD, build-time in `<head>`):**
- ✅ **LocalBusiness** (name, full address `11713 Woodcreek Dr S, Apt E, Huntley IL 60142`, phone, geo, hours, areaServed = the 18 towns).
- ✅ **Service** schema per service page (so each ranks for service-specific searches).
- ✅ **FAQPage** on /faq and service pages.
- ⚠️ **Do NOT add self-serving Review/AggregateRating schema to your own business** — Google's policy makes self-hosted self-reviews ineligible for star rich-results and it's a manual-action risk. Display reviews via the vendor widget instead; let star ratings come from the Google Business Profile.

**Local SEO:**
- Unique 500+ word pages per service AND per city; internal-link services ↔ locations.
- Optimize the **Google Business Profile** (consistent NAP, "Garage Door Repair Service" category, weekly photos), surface the existing **115 Google + ~265 total reviews** on-site, and keep collecting new ones — see §7.
- Auto-generate `sitemap.xml` (`@astrojs/sitemap`) + `robots.txt` with the sitemap line. Pursue **Google Guaranteed / Local Services Ads**.

**Core Web Vitals (the real risk — many third-party scripts):**
- **Facade pattern:** render a static button/poster; load the real widget only on click (booking modal, chat, visualizer link).
- **Lazy-load** reviews/chat on scroll/interaction; **reserve heights** to prevent CLS.
- **Astro `client:idle` / Partytown** to defer and worker-offload analytics/GTM-type scripts.
- Astro image optimization for all gallery/before-after assets (the most likely bandwidth driver on Netlify's credit budget).

---

## 7. Leverage the existing review advantage (project-specific)

Research into Ryan's current footprint found **~265 reviews across platforms, uniformly 5.0★** — including **115 five-star reviews on Google** (105 with text; manually captured 2026-06-14 in `scrape/content/_google-reviews.md`), 123 on Thumbtack, 13 on HomeAdvisor/Angi, and 13 on Nextdoor — yet the current website surfaces only **1 testimonial**. This is a major, underused asset.

**Plan it into the build:**
- Build the `/reviews` page and homepage trust strip around the strongest verbatim reviews (19 captured; pull more at content time).
- Add a **"Leave us a review" CTA** that deep-links to the **Google** review form — closing the 0-Google-reviews gap is the single biggest local-SEO/trust win, and NiceJob/HCP automate post-job requests to do it continuously.
- Display **trust badges** above the fold (Google Guaranteed once approved, IDA, BBB, "Licensed · Insured · 24/7").
- **Resolve the discrepancy** before launch: Angi lists "no emergency service" but the site claims 24/7 — confirm Ryan's actual after-hours availability so the new site (and booking hours) are accurate.

---

## 8. Phased roadmap

**Phase 0 — Decisions & accounts (before code)**
- Confirm: booking platform (Housecall Pro vs Jobber — run both free trials), door-brand strategy (does Ryan carry Clopay → EZDoor?), 24/7 emergency truth, membership pricing.
- Create: GitHub repo, TinaCloud (free) project, Netlify (or Cloudflare Pages) site, Housecall Pro/Jobber trial, Wisetack merchant, NiceJob/Trustindex, Google Business Profile claim.

**Phase 1 — Foundation (skeleton site)**
- Astro project + TinaCMS wired to TinaCloud; define collections (§4); base layout, header (sticky click-to-call), footer.
- Migrate existing content (home, about, services, 12 blog posts, gallery) into Tina collections.
- Deploy to Netlify with custom domain + SSL; confirm visual editing works for the owner.

**Phase 2 — Conversion core (Tier-1 features)**
- Booking embed (`/book`) + sticky CTAs; contact form (Netlify Forms); reviews widget + `/reviews`; coupons + emergency banner; trust strip.
- JSON-LD (LocalBusiness/Service/FAQ), sitemap, GBP optimization.

**Phase 3 — High-leverage features (Tier-2)**
- Instant-quote/estimate flow (`/estimate`); Wisetack financing (`/financing`); membership page (`/membership`); chat/AI answering; EZDoor visualizer link (`/visualizer`).

**Phase 4 — Local SEO scale & polish (Tier-3)**
- Programmatic ~18 city pages with unique content + internal linking; buying-guide/video content; performance pass (facades, lazy-load, Lighthouse ≥90 mobile); accessibility audit; analytics (GA4/Plausible via Partytown).

**Phase 5 — Launch & growth**
- DNS cutover from current WordPress; 301-redirect old URLs to preserve SEO; submit sitemap; apply for Google Guaranteed/LSAs; turn on automated review requests.

---

## 9. Recurring cost summary (typical)

| Item | Cost |
|---|---|
| TinaCloud | **$0** (free, 2 users) — Team ~$41/mo only if editorial workflow/more editors needed |
| Hosting (Netlify) | **$0** free, or **$9/mo** Personal for overage safety (or Cloudflare Pages $0) |
| Domain | ~$15/yr |
| Booking platform (Housecall Pro / Jobber) | ~$59–$149/mo *(business ops cost, would exist regardless)* |
| Reviews (NiceJob) | ~$75/mo *(optional; Trustindex free alternative)* |
| Chat/answering (Rosie / ZyraTalk) | ~$99–$149/mo *(optional)* |
| Financing (Wisetack) | $0 merchant fees |
| **Website-specific run cost** | **~$0–$9/mo** (CMS + hosting); the rest are business tools |

---

## 10. Risks & open decisions

- **Netlify free hard-stop** → mitigate with image optimization + $9 plan, or use Cloudflare Pages. *(Decision: confirm host.)*
- **Tina visual editing needs an SSR adapter on Astro** → slightly more setup; verify on a current Astro starter before committing the editing model.
- **Visualizer**: EZDoor link-out only benefits Ryan if he carries Clopay; a branded on-site visualizer (Renoworks) is a sales-gated v2 project, not a quick embed. *(Decision: brand strategy.)*
- **Booking platform lock-in**: choose HCP vs Jobber early — it drives booking embed, Reserve-with-Google, payments, ETA texts, and review automation. *(Decision: trial both.)*
- **Gated vs ungated estimate** conversion is unproven for this segment → A/B test post-launch.
- **Emergency-service accuracy** (Angi "no emergency" vs site "24/7") must be resolved before publishing hours/booking windows.
- **Content lift**: 18 unique 500-word city pages + service pages is the largest writing task — budget for it (or it becomes thin/duplicate and won't rank).

---

## 11. Sources (this plan's research)

TinaCMS/TinaCloud: tina.io/pricing · tina.io/docs/tinacloud · tina.io/docs/frameworks · tina.io/docs/frameworks/astro · tina.io/blog/astro-is-becoming-the-default-tinacms-starter · tina.io/docs/self-hosted/overview · luckymedia.dev/insights/tina-cms
Hosting: netlify.com/pricing · docs.netlify.com (credit-based billing FAQ; Forms setup) · netlify.com/blog/introducing-netlify-free-plan · vercel.com/docs/limits/fair-use-guidelines · developers.cloudflare.com/pages/functions/pricing
Integrations: help.housecallpro.com (online booking; Reserve with Google) · help.getjobber.com/hc/en-us/articles/360026249434 · renoworks.com/manufacturers/web-visualizer · clopaydoor.com/ezdoor · assets.podium.com (webchat install) · zyratalk.com · help.nicejob.com (Stories widget) · trustindex.io/widgets/google-reviews-widget · wisetack.com/features/prequal-link
SEO/perf: developers.google.com/search/docs/appearance/structured-data/review-snippet · docs.astro.build (getStaticPaths; sitemap; partytown) · web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript

*(Feature-level competitive sourcing is in `research/garage-door-website-feature-report.md` §10.)*
