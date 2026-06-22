# Ryan Garage Door — Website Onboarding & Handoff

Welcome — this is your guide to **owning and running** your new website. It walks
you through taking full ownership of everything (no lock-in), then logging in to
edit your own content whenever you want.

**You own it once.** After handoff, the only recurring cost is your domain name
(~$12–20/year). Hosting, the content editor, and code storage are all on free
plans — **~$0/month, forever.**

- **Your editor (CMS):** `https://<your-site-url>/admin`
  _(currently `https://incomparable-begonia-bfb6f5.netlify.app/admin` until your
  domain is connected)_
- **How it works:** you edit content in the browser → click **Save** → the site
  rebuilds and your change is live in ~1–2 minutes.
- **What you can edit yourself:** business info, hours, phone, homepage text,
  coupons, FAQs, reviews, blog posts, and your live-chat link.

---

## Part 1 — Take ownership (one-time, done with us)

The website is made of three things, and all three become **yours**:

| Piece | What it is | Account |
|-------|------------|---------|
| **Repository** | Your content + the site's code | GitHub (free) |
| **Hosting** | Serves the site to visitors | Netlify (free) |
| **Domain** | Your web address | Your registrar (~$12–20/yr) |

### Step 1 — Create your GitHub account
1. Go to **https://github.com** → **Sign up**. Use a **business email** you'll keep.
2. Save the username + password somewhere safe (a password manager is ideal).
3. GitHub requires **two-factor authentication (2FA)** — set it up and **save the
   backup codes**. You'll need this to log in.

> This account is where your website's content and code live. It's the master key —
> guard it.

### Step 2 — We transfer the repository to you
Once your account exists, send us your **GitHub username**. Then:

- **[We do]** In the current repo → **Settings → General → Danger Zone →
  Transfer ownership** → enter your username.
- **[You do]** You'll get an email — **accept the transfer**.
- **[We do]** Update `site/public/admin/config.yml` (`repo:` field) to
  `<your-username>/ryan_garage` so the editor saves to your repo, and push.
- ✅ Result: the repo now lives at `https://github.com/<your-username>/ryan_garage`
  and belongs to you.

### Step 3 — We move hosting (Netlify) to you
- **[You do]** Create a free account at **https://netlify.com** — sign in **with
  your new GitHub account**.
- **[We do]** Reconnect the site to your transferred repo (or transfer the Netlify
  site to you) and confirm a deploy succeeds.
- **[We do]** Set the `PUBLIC_SITE_URL` setting to your final domain so links and
  the sitemap are correct.

### Step 4 — Connect your domain (when you're ready to go live)
- **[You do]** Buy/own the domain at any registrar.
- **[We do / together]** In Netlify → **Domain settings**, add your domain, update
  the DNS records at your registrar, and enable HTTPS (the padlock).

✅ **After Part 1 you own everything** — code, hosting, and domain. Monthly cost: just the domain.

---

## Part 2 — Log in to edit your content

You sign in to the editor with a **personal access token** — a long password-like
key you generate on GitHub once and paste into the editor.

### Step 5 — Generate your access token
1. Make sure you're **signed in to GitHub as your own account**.
2. Open this link (it pre-selects the right permission):

   **https://github.com/settings/tokens/new?scopes=public_repo&description=Ryan%20Garage%20Door%20CMS**

3. **Expiration:** choose **"No expiration"** for convenience (you won't have to
   redo this), or 90 days if you prefer to refresh it periodically.
4. The **`public_repo`** box is already checked — leave it as is.
   _(If your site repo is ever made private, you'd instead need the broader `repo`
   scope.)_
5. Click **Generate token** and **copy** the `ghp_…` string.
   ⚠️ GitHub shows it **only once** — paste it into your password manager now.

### Step 6 — Sign in to the editor
1. Go to **`https://<your-site-url>/admin`**.
2. Click **"Sign In with Token"** (not "Sign in with GitHub").
3. **Paste your token** into the box → submit.
4. ✅ You're in. Edit away.

> Lost the token, or it expired? Just repeat **Step 5** to make a new one.

---

## Part 3 — How editing works

- **What you can edit today:** Site Settings (business name, phone, email, hours,
  service area, review counts, homepage hero text, top-bar offer, live-chat link),
  **Coupons**, **FAQs**, **Reviews**, and **Blog posts**.
- **Save = publish.** Clicking **Save** records the change and rebuilds the site.
  It's live in about **1–2 minutes**.
- **Images:** use the image upload field on a post; it stores the file with the site.
- **You can't break the layout.** You're only editing words and pictures — the
  design is locked. Every change is version-controlled, so anything can be rolled
  back by a developer if needed.

---

## Part 4 — Turn on your free live chat (Tawk.to)

Your site has a **free live chat** built in — a chat bubble visitors can use to
message you, **answered by you or your team** (not a paid robot), so it stays
**$0/month**. It's **off until you connect your free account**.

### Step 7 — Create your free Tawk.to account
1. Go to **https://tawk.to** → **Sign up** (free).
2. Add your business as a **property**. Tawk.to gives you an embed code that
   contains a URL like **`https://embed.tawk.to/XXXXXXXX/YYYYYYYY`**.
3. Copy that `embed.tawk.to/…` URL.

### Step 8 — Paste it into your site
1. Open your editor at **`/admin` → Site Settings**.
2. Find **"Live chat embed URL"** and **paste** the URL from Step 7.
3. **Save.** In ~1–2 minutes the chat bubble appears on every page.
   _(Clear the field anytime to turn chat off.)_

### Answering chats
- Install the **Tawk.to app** (phone or desktop), or use their web dashboard, to
  reply. You set your **online/away** status and an offline message in Tawk.to.

> The chat loads only after a visitor interacts with the page, so it never slows
> your site down.

---

## What still needs a developer

- **Services** pages and the **74 local service-area** pages are currently in code
  (not in the editor yet). Ask us if you want these made editable — it's the same
  pattern as the rest.
- Design/layout changes, new sections, or new page types.

---

## Please review for accuracy (placeholders from your current ads)

- [ ] **Hours / availability** — the site is worded as *same-day / by appointment*
  (no "24/7" claim). Make sure your Google Business Profile and other listings
  match how you actually operate.
- [ ] **Google review link** — confirm it points to your real Google reviews page.
- [ ] **Door visualizer** — currently links to Clopay; tell us if you carry a
  different brand.
- [ ] **Coupon amounts / membership pricing** — confirm the numbers are current.

---

## Costs summary

| Item | Provider | Cost |
|------|----------|------|
| Code + content | GitHub | Free |
| Hosting | Netlify | Free |
| Content editor (CMS) | Sveltia | Free |
| Live chat | Tawk.to | Free |
| **Domain name** | Your registrar | **~$12–20 / year** |
| **Total recurring** | | **≈ the domain only** |

---

## Quick reference

- **Editor:** `https://<your-site-url>/admin` → **Sign In with Token**
- **New token:** https://github.com/settings/tokens/new?scopes=public_repo&description=Ryan%20Garage%20Door%20CMS
- **Your repo:** `https://github.com/<your-username>/ryan_garage`
- **Hosting dashboard:** https://app.netlify.com

---

## Support

Built by **Signals | Kernels**. Questions during handoff or after?
Contact: `<your Signals | Kernels contact>`.
