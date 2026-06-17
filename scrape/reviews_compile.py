#!/usr/bin/env python3
"""Compile all customer reviews gathered across platforms into the scraped content.
Verbatim reviews + per-platform aggregates + links + access notes.
Captured 2026-06-14."""
import json, os

ROOT = os.path.dirname(os.path.abspath(__file__))
META = os.path.join(ROOT, "meta")
CONTENT = os.path.join(ROOT, "content")

# ---- platform aggregates ----
platforms = [
    {"platform": "Google Maps", "rating": 5.0, "review_count": 115,
     "url": "https://www.google.com/maps?cid=14099083416139631943",
     "note": "~115 reviews, all 5★ (RYAN GARAGE DOOR, feature id 0x4500cafc059a08b:0xc3aa01aab59a8d47). Full verbatim list in content/_google-reviews.md. Captured manually — Google blocks automated fetching from this environment (verified)."},
    {"platform": "HomeAdvisor", "rating": 5.0, "review_count": 13,
     "url": "https://www.homeadvisor.com/rated.RyanGarageDoor.144832131.html",
     "note": "100% five-star. All 13 captured verbatim below."},
    {"platform": "Angi", "rating": 5.0, "review_count": 13,
     "url": "https://www.angi.com/companylist/us/il/huntley/ryan-garage-door-reviews-1.htm",
     "note": "Same backend as HomeAdvisor — identical 13 reviews (not duplicated below)."},
    {"platform": "Thumbtack", "rating": 5.0, "review_count": 123, "hires": 160,
     "url": "https://www.thumbtack.com/il/huntley/garage-door-repair/ryan-garage-door/service/512784037060321286",
     "note": "123 reviews / 160 hires, all 5.0. Only 5 most-recent are publicly extractable (rest load behind JS pagination / need Thumbtack login or the client's pro dashboard export)."},
    {"platform": "Nextdoor", "rating": None, "review_count": 13,
     "url": "https://nextdoor.com/pages/ryan-garage-door-huntley-il/",
     "note": "13 neighbor recommendations; individual texts are login-gated (only a summary is public)."},
    {"platform": "Yelp", "rating": None, "review_count": None,
     "url": "https://www.yelp.com/biz/ryan-garage-door-chicago",
     "note": "Listing exists but is login/anti-bot walled — could not extract."},
    {"platform": "Facebook", "rating": None, "review_count": None,
     "url": "https://www.facebook.com/61575661076074",
     "note": "Page exists (RYAN garage DOOR, Huntley IL) but reviews are login-walled."},
    {"platform": "On-site (WP-Customer-Reviews)", "rating": 5.0, "review_count": 1,
     "url": "https://garagedoorrepair-il.com/testimonials/",
     "note": "One testimonial published on the current website."},
]

# ---- verbatim reviews ----
homeadvisor = [
    ("Jaspreet S.", "Dec 2025", 5, "Garage Door Opener Installation and Replacement", "$150",
     "I liked his service a lot. It was very cold last Saturday but he got the job done. I have no complaints."),
    ("Angelique B.", "Dec 2025", 5, "Garage Door Opener Installation and Replacement", None,
     "Was able to come out within 24 hours of reaching out after a major company did not show up to do the job. Service was great and came prepared with us having a part missing from the box (FedEx delivered in open/damaged box). I 100% recommend Ryan Garage! Installed both kits on our 3-car garage. Great price - other companies were overcharging to do the same job."),
    ("William U.", "Jun 2025", 5, "Garage Door Opener Repair or Adjustment", None,
     "Ryan showed up exactly when he said he would. Very professional and a sincerely Great guy! Finished the gear box repair in a timely matter. Excellent work and extremely neat. Price was right!! Can't go wrong with Ryan. Kudos!!"),
    ("Mark T.", "Jun 2025", 5, "Garage Door Repair", "$215",
     "Garage door spring broke and after some quotes I settled on Ryan Garage Door in Huntley to do the job for me he showed up within a few hours and did a quick & FANTASTIC JOB at a GREAT PRICE & even included free maintenance on the door! I give Ryan Garage a 1000% percent rating on not only their work but also their reasonable pricing! If you need any garage door services, I definitely recommend RYAN GARAGE you won't be disappointed! Mark T Elgin Il Before & After"),
    ("William S.", "Jun 2025", 5, "Garage Door Opener Installation and Replacement", "$350",
     "Person was polite, knowledgeable, efficient and cleaned everything up. Definitely would use again."),
    ("James B.", "May 2025", 5, "Garage Door Opener Installation and Replacement", "$485",
     "He was very professional did a great job. Came over in 30 minutes had job done in couple hours, even set my button on rear mirror to open and close door without remote like i had with previous unit. I would hire him for any other garage door work if i need to."),
    ("Dharmendra P.", "May 2025", 5, None, None,
     "Best garages door ever very professional and did a very clean job also help fix other problems"),
    ("James A.", "Apr 2025", 5, "Garage Door Opener Installation and Replacement", None,
     "Very professional and garage door opener works great"),
    ("Doug G.", "Apr 2025", 5, "Garage Door Installation and Replacement", None,
     "Ryan and his team are phenomenal! I got numerous quotes for a garage door and opener replacement, Ryan’s price was the best by far and there is zero drop off in quality of work or customer care from the higher priced contractors. I 100% recommend working with Ryan Garage Door!"),
    ("Sean P.", "Mar 2025", 5, None, None,
     "Showed up did a great job and was very fast and efficient. Very cost effective."),
    ("Bryan B.", "Dec 2024", 5, "Garage Door Opener Installation and Replacement", None,
     "Very quick to respond and provide an estimate. Was able to install the new garage door openers the same day. Very professional and did good work at a fair price."),
    ("David H.", "Nov 2024", 5, "Garage Door Installation and Replacement", None,
     "The job was fast and right. Ryan was more like a friend than just a workman."),
    ("Tahil F.", "May 2024", 5, None, "$4,000",
     "I would highly recommend anyone to contact Ryan garage door. They are professionals and do excellent work and keep time."),
]

thumbtack = [
    ("Gerry D.", "Jan 17, 2026", 5,
     "Ryan called, to set up an appointment to come look at the problem. He gave a time of arrival, then when running late, messaged with an apology and new ETA, which he made on time. He arrived and within 15 seconds knew what the issue was, but was polite enough to let me go through my story of what happened and why I called. He quickly quoted what he believed needed to be done, and then mentioned that additional work may be needed if first resolution did not work. Quoted all work. He got to work and fixed the issue with just the first idea he had. The entire experience was handled very professionally! Recommend him 100%"),
    ("Matthew C.", "Dec 12, 2025", 5,
     "Quoted me a price up front. Showed up on time, even in a snow storm. Did the work efficiently and had the door working better than it has in the nearly 4 years we've lived in our house."),
    ("Claudia K.", "Dec 14, 2025", 5,
     "Great experience with Ryan. I was in a bit of a situation as my garage door with not go up, and I had to leave my car out in freezing temperatures. Fortunately, he diagnosed the problem quickly, and within an hour or so, all was well. I felt his price was fair, and I would definitely call him again, or recommend him to others."),
    ("Kathryn S.", "Sep 19, 2025", 5,
     "Ryan was wonderful! I have very old, unique garage doors that no other technician would attempt to repair. He understood how much we loved the doors and found a reliable solution. He not only fixed the issue but walked through some general upkeep we could do at home to preserve the old style we have. I love supporting honest and reliable businesses and I can say for certain that Ryan will be my first call for any garage doors needs."),
    ("Mohammad A.", "Jan 18, 2026", 5,
     "Had a great experience with the garage service that I needed. I took his card and will pass it to family and friends. Will call again for future needs!"),
]

# on-site review (from existing scrape)
onsite = json.load(open(os.path.join(META, "reviews.json"))) if os.path.exists(os.path.join(META, "reviews.json")) else []

# ---- build structured JSON ----
structured = {
    "captured": "2026-06-14",
    "business": "Ryan Garage Door",
    "address_detail": "11713 Woodcreek Dr S, Apt E, Huntley, IL 60142 (per HomeAdvisor/Angi/Nextdoor)",
    "platforms": platforms,
    "reviews": {
        "homeadvisor_angi": [
            {"author": a, "date": d, "rating": r, "service": s, "price": p, "text": t}
            for (a, d, r, s, p, t) in homeadvisor],
        "thumbtack_recent": [
            {"author": a, "date": d, "rating": r, "text": t}
            for (a, d, r, t) in thumbtack],
        "onsite": onsite,
    },
}
json.dump(structured, open(os.path.join(META, "reviews_external.json"), "w"), indent=2)

# ---- build human-readable markdown ----
m = []
m.append("# Customer Reviews — all platforms (verbatim)\n")
m.append("_Gathered 2026-06-14 for the redesign. Use these as social proof / testimonials on the new site._\n")
m.append("## Summary by platform\n")
m.append("| Platform | Rating | Reviews | Captured verbatim | Link |")
m.append("|---|---|---|---|---|")
for p in platforms:
    rating = f"{p['rating']:.1f}★" if p.get("rating") else "—"
    cnt = p["review_count"] if p["review_count"] is not None else "?"
    cap = {"Google Maps": "105 text + 10 rating-only → _google-reviews.md", "HomeAdvisor": "13", "Angi": "(same as HomeAdvisor)",
           "Thumbtack": "5 of 123", "Nextdoor": "0 (gated)", "Yelp": "0 (walled)",
           "Facebook": "0 (walled)", "On-site (WP-Customer-Reviews)": "1"}[p["platform"]]
    m.append(f"| {p['platform']} | {rating} | {cnt} | {cap} | [link]({p['url']}) |")
m.append("")
m.append("**Totals:** ~265 reviews across platforms, uniformly **5.0★** "
         "(Google ~115, Thumbtack 123, HomeAdvisor/Angi 13, Nextdoor 13, on-site 1; some reviewers overlap platforms). "
         "**124 captured verbatim** (105 Google + 13 HomeAdvisor/Angi + 5 Thumbtack + 1 on-site). "
         "Full Google list: `content/_google-reviews.md`.\n")
m.append("**Notes:**")
for p in platforms:
    m.append(f"- **{p['platform']}** — {p['note']}")
m.append("\n---\n")

m.append("## HomeAdvisor / Angi — 13 reviews (5.0★, 100% five-star)\n")
for (a, d, r, s, p, t) in homeadvisor:
    extra = " · ".join(x for x in [s, p] if x)
    m.append(f"**{a}** — {d} — {r}.0★" + (f" · {extra}" if extra else ""))
    m.append(f"> {t}\n")

m.append("## Thumbtack — 5 of 123 reviews (5.0★, 160 hires)\n")
for (a, d, r, t) in thumbtack:
    m.append(f"**{a}** — {d} — {r}★")
    m.append(f"> {t}\n")

m.append("## On-site testimonial (current website)\n")
for rev in onsite:
    m.append(f"**{rev.get('author','')}** — {rev.get('date','')} — {rev.get('rating','')}★ — *{rev.get('title','')}*")
    m.append(f"> {rev.get('body','')}\n")

m.append("---\n")
m.append("## Extra business facts discovered while pulling reviews\n")
m.append("- **Full street address:** 11713 Woodcreek Dr S, Apt E, Huntley, IL 60142 "
         "(the website only shows \"Huntley, IL 60142\").")
m.append("- **Free estimates:** Yes (HomeAdvisor/Angi).")
m.append("- **Most common jobs:** garage door opener install/replace (≈6 of 13), door install/replace, spring/cable repair.")
m.append("- **Typical ticket sizes seen in reviews:** $150–$485 for openers/repairs; ~$4,000 for a full door+opener job.")
m.append("- **Owner-operated, with a small team:** customers name \"Ryan\" most, plus technicians **Badru** "
         "(aka \"Badareyou\"), **Muwonge**, and **Moush** — useful for an authentic \"meet the team\" section.")
m.append("- **Legal name may be \"Ryan Garage Door Ltd\"** (per a Google review) — verify for footer/legal.")
m.append("- **Opener brands carried:** Genie, Chamberlain, LiftMaster; pushes **WiFi / smartphone-app smart openers** "
         "(belt-drive upgrades, app setup) — a sellable feature for the new site.")
m.append("- **Real service radius is wider than the site implies:** reviews mention Elgin, Wheaton, Chicagoland, "
         "and even **Racine, Wisconsin** — consider broader geo-targeting.")
m.append("- **Lead sources customers mention:** Thumbtack, Nextdoor, Facebook Marketplace, and the **Sunday newspaper** "
         "— shows where demand currently comes from.")
m.append("- **Strongest recurring themes** (great for headline copy): same-day/emergency response, works in extreme cold, "
         "honest diagnosis (won't upsell), and beats competitors' prices.")
m.append("- ⚠️ **Discrepancy to confirm with client:** Angi/HomeAdvisor profile says *\"does not offer emergency services,\"* "
         "but the website advertises 24/7 and many reviews praise same-day/late-night emergency work. Clarify before carrying either claim onto the new site.")

open(os.path.join(CONTENT, "_reviews.md"), "w").write("\n".join(m) + "\n")

print("Wrote meta/reviews_external.json and content/_reviews.md")
print(f"Verbatim reviews: {len(homeadvisor)} HA/Angi + {len(thumbtack)} Thumbtack + {len(onsite)} on-site = {len(homeadvisor)+len(thumbtack)+len(onsite)}")
