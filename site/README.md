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

## CMS (Sveltia) + CI/CD (GitHub Actions → Netlify)

**Architecture:** GitHub Actions builds the site (free runner minutes) and pushes
the prebuilt `dist/` to Netlify via the Netlify CLI — so builds never touch
Netlify's credit budget. The owner edits content in **Sveltia CMS** at `/admin`;
saves commit to `main`, which triggers the Action → redeploy. All $0/month.

**Branch model:**
- `dev` — working branch. Pushes get a Netlify **draft/preview deploy** (unique URL) to review before merging.
- `main` — production. Merges/pushes get a Netlify **production deploy**.
- PRs targeting `main` also get a preview deploy.
- Before the Netlify secrets are set, the workflow still **builds** (CI check) and just skips the deploy.

Day-to-day: branch off `dev` → open a PR → review the preview deploy → merge to `dev`,
then merge `dev → main` to publish.

### What's CMS-editable now
Site Settings (business info, hours, promos, homepage hero copy), Coupons, FAQs,
Reviews, and Blog posts. Data lives in `src/content/data/*.json` + `src/content/posts/*.md`.
**Next (same pattern):** Services and the 74 service-area pages are still in
`src/data/*.ts` — move them to JSON to make them owner-editable too.

### One-time setup — Netlify host + GitHub Actions
You need to do these (they require your Netlify/GitHub accounts):
1. **Create the Netlify site as CLI/manual deploy** (do NOT connect it to Git for
   builds, or it will double-deploy). Dashboard → Add new site → Deploy manually,
   or `netlify sites:create`. Copy the **Site ID** (Site config → General → API ID).
2. **Create a Netlify personal access token** (User settings → Applications → New).
3. **Add GitHub repo secrets** (repo → Settings → Secrets and variables → Actions):
   `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`.
4. *(At DNS cutover)* add repo **variable** `PUBLIC_SITE_URL` = the live domain
   (until then it falls back to the preview URL in `astro.config.mjs`).
5. Push to `dev` (preview deploy) or merge to `main` (production deploy) → the Action builds + deploys.
6. Point the domain DNS at Netlify, enable HTTPS. After the first deploy with a
   test submission, confirm **Forms** show up under Netlify → Forms (the forms
   render as static HTML, so Netlify detects them on deploy).

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

