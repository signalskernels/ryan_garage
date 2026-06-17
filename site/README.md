# Ryan Garage Door — website

Fast, static marketing site for **Ryan Garage Door** (Huntley, IL). Built with
**Astro** (SSG) + self-hosted Inter. Designed to run at **~$0/month** (the base
deliverable in the proposal): static hosting + a domain, no server, no database.

- Brand: deep navy + gold (from the logo).
- Content + business facts live in `src/data/*` and `src/content/posts/*`
  (single source of truth, CMS-portable).
- Real service photos in `src/assets/photos` (optimized at build by Astro/sharp).
- Conversion features in the base build: reviews showcase, click-to-call +
  sticky mobile bar, service-request / contact forms, ~19 local service-area
  pages, coupons, 24/7 banner, financing & visualizer link-outs, JSON-LD
  (LocalBusiness / Service / FAQPage), sitemap + robots.

## Develop / build

```bash
npm install
npm run dev       # local dev
npm run build     # static output → dist/
```

Site URL is set via `PUBLIC_SITE_URL` (defaults to the preview subdomain). Set
it for production builds, e.g. `PUBLIC_SITE_URL=https://garagedoorrepair-il.com`.

## Preview deploy (current)

Served as a static nginx container, exposed via a **Cloudflare Tunnel** at
**https://ryan-garage.signalskernels.com**. See `../docker-compose.yml` and
`../cloudflared/config.yml`. From the repo root:

```bash
docker compose up -d --build      # build site + start web + tunnel
docker compose logs -f cloudflared
docker compose down
```

Local debug (no tunnel): http://localhost:8090

## Forms

Forms use Netlify Forms markup (`data-netlify`, hidden blueprint, honeypot) and
submit via AJAX. On the **preview** there's no form backend, so a submit just
shows the success state (no capture). On **Netlify** the same submit is captured
automatically — no code change needed.

## Going live on Netlify (after client sign-off)

1. Push this repo; connect the repo to Netlify (base dir `site`, build
   `npm run build`, publish `dist`). Set `PUBLIC_SITE_URL` to the live domain.
2. Point the domain's DNS at Netlify; enable HTTPS.
3. Forms work automatically; set a notification email under Netlify → Forms.
4. (Optional) Cloudflare Pages works too — bring a form handler (Formspree/Basin).

### Owner editing (CMS) — follow-up

Content is plain Markdown/TS so a git CMS drops in without restructuring. To
keep the **$0/month** promise, prefer a free self-hosted git CMS
(**Decap** or **Sveltia**) over TinaCloud's SaaS free tier. Wire this at/just
before the Netlify cutover.

## Things to confirm with the client before public launch

- **24/7 / emergency hours** — site advertises 24/7; Angi profile currently says
  "no emergency service." Align Google Business Profile + listings with reality.
- **Google review link** — paste the real Place ID into `site.reviews.googleReviewUrl`.
- **Door brand** — visualizer links to Clopay EZDoor; swap if Ryan carries another brand.
- **Coupon amounts / membership pricing** — placeholders pulled from current ads.
