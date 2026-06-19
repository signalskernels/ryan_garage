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

---

## CMS (Sveltia) + CI/CD (Netlify git deploys)

**Architecture:** The repo is connected to **Netlify's git integration**, which
builds + deploys automatically: production on `main`, deploy previews on `dev`
and PRs. The owner edits content in **Sveltia CMS** at `/admin`; saves commit to
`main` → Netlify redeploys. All $0/month. The **GitHub Actions workflow is a
build/CI gate only** (it does NOT deploy) and is the required status check on
`main`, so a broken build blocks the merge before Netlify builds.

**Branch model:**
- `dev` — working branch. Pushes get a Netlify **deploy preview** (unique URL) to review.
- `main` — production. Merges get a Netlify **production deploy**. Protected: requires a PR + the passing `build-deploy` check.
- PRs targeting `main` also get a deploy preview.

Day-to-day: branch off `dev` → open a PR → review the Netlify deploy preview → merge to `dev`,
then merge `dev → main` to publish.

### What's CMS-editable now
Site Settings (business info, hours, promos, homepage hero copy), Coupons, FAQs,
Reviews, and Blog posts. Data lives in `src/content/data/*.json` + `src/content/posts/*.md`.
**Next (same pattern):** Services and the 74 service-area pages are still in
`src/data/*.ts` — move them to JSON to make them owner-editable too.

### Netlify (already connected — git deploys)
Netlify builds the site itself (`netlify.toml` sets base `site`, command
`npm run build`, publish `dist`). To finish:
1. In Netlify **Site config → Environment variables**, set `PUBLIC_SITE_URL` to
   the live domain (or the Netlify URL for now) so canonical URLs + sitemap are
   correct — otherwise it falls back to the preview URL in `astro.config.mjs`.
2. At launch, point the domain DNS at Netlify and enable HTTPS.
3. After a deploy + a test form submission, confirm **Forms** show up under
   Netlify → Forms (forms render as static HTML, so Netlify detects them).
- Do **not** add `NETLIFY_AUTH_TOKEN`/`NETLIFY_SITE_ID` as GitHub secrets — the
  Actions workflow is build-only and adding them wouldn't enable a deploy (kept
  this way on purpose so there's a single deploy path: Netlify git).

### One-time setup — Sveltia auth (owner editing)
1. **GitHub OAuth App** (GitHub → Settings → Developer settings → OAuth Apps → New):
   Homepage = your site; Authorization callback = `https://<worker>.workers.dev/callback`
   (fill in after step 2). Note the **Client ID**; generate a **Client secret**.
2. **Deploy the `sveltia-cms-auth` Cloudflare Worker** (github.com/sveltia/sveltia-cms-auth):
   `wrangler deploy`, then set worker secrets `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`,
   and `ALLOWED_DOMAINS` = your site domain. Copy the worker URL.
3. Set the OAuth App's callback to the worker `/callback`, and set `base_url:` in
   `public/admin/config.yml` to the worker URL. Confirm `repo:` matches.
4. **Invite the owner as a repo collaborator** (free) so he has write access. He
   goes to `yoursite.com/admin` → "Sign in with GitHub" → edits → saves.
5. Note: only **GitHub login** works on the free static path. Account-less
   (Google/email) editing would require a paid SaaS — out of scope for $0/mo.

