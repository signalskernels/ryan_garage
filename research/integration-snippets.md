# Integration code snippets (internal / dev reference)

Moved out of the client-facing PDF report (customers don't need code). These are reference embeds for the actual build; swap `YOUR_…` placeholders for real account IDs at setup. Each maps to a service row in the report's Section 5 / cost Section 4.

## Online booking — Housecall Pro
Adds a real-time "Book Online" button + scheduling window; booked jobs flow into the HCP dispatch dashboard. Also the path to Reserve with Google. Load on click (facade) to protect Core Web Vitals.
```html
<!-- Housecall Pro Online Booking -->
<a class="hcp-button" data-token="YOUR_HCP_TOKEN" data-orgname="ryan-garage-door">Book Online</a>
<script async type="text/javascript"
  src="https://online-booking.housecallpro.com/script.js?token=YOUR_HCP_TOKEN&orgName=ryan-garage-door"></script>
```

## Online booking — Jobber (alternative)
Inline work-request/booking form embedded directly in the page.
```html
<!-- Jobber Work Request / Online Booking -->
<div data-jobber-work-request-embed data-client-hub-id="YOUR_JOBBER_HUB_ID"></div>
<script async clienthub-id="YOUR_JOBBER_HUB_ID"
  src="https://clienthub.getjobber.com/client_hubs/YOUR_JOBBER_HUB_ID/public/work_request_embed.js"></script>
```

## Website live chat — Tawk.to (free)
Free chat box answered by owner/staff. An AI chat tool (~$99/mo) drops in the same way.
```html
<!-- Tawk.to live chat (free) -->
<script type="text/javascript">
  var Tawk_API = Tawk_API || {};
  (function () {
    var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  })();
</script>
```

## Google reviews — Trustindex (free display) / NiceJob (automated collection)
```html
<!-- Trustindex Google Reviews widget (free tier) -->
<script defer async src="https://cdn.trustindex.io/loader.js?YOUR_WIDGET_ID"></script>

<!-- NiceJob reviews widget — auto-requests reviews after each job ($75–$125/mo) -->
<div class="nicejob-reviews" data-id="YOUR_NICEJOB_ID"></div>
<script defer src="https://cdn.nicejob.co/js/sdk.min.js?id=YOUR_NICEJOB_ID"></script>
```

## Reserve with Google
No site code — configured via the Google Business Profile + booking provider (Housecall Pro). Set up during the booking rollout so "Book" appears in the Google listing/Maps.

## Click-to-call sticky bar (free, base build)
```html
<a class="call-bar" href="tel:+12247700587">Call Ryan Garage Door — (224) 770-0587</a>
<style>
.call-bar{ position:fixed; bottom:0; left:0; right:0; z-index:50;
  background:#000; color:#fff; text-align:center; padding:14px; font-weight:700; }
@media (min-width:768px){ .call-bar{ display:none; } } /* phones only */
</style>
```

## LocalBusiness structured data (free, base build)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Ryan Garage Door",
  "telephone": "+1-224-770-0587",
  "url": "https://garagedoorrepair-il.com",
  "address": { "@type": "PostalAddress", "addressLocality": "Huntley",
    "addressRegion": "IL", "postalCode": "60142", "addressCountry": "US" },
  "openingHoursSpecification": { "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00", "closes": "23:59" },
  "areaServed": ["Huntley IL","Batavia IL","McHenry IL","Vernon Hills IL",
                 "West Chicago IL","Woodstock IL","Barrington IL","Geneva IL"]
}
</script>
```
> Note: per `garage-door-website-feature-report.md` §6, do NOT add self-serving Review/AggregateRating schema to the business's own site (Google policy — ineligible for stars + manual-action risk). Let stars come from the Google Business Profile; display reviews via the Trustindex/NiceJob widget.

## Lead-capture quote form (free, base build — Netlify Forms)
JS-rendered (Astro island) forms need a static hidden "blueprint" form for Netlify to detect them.
```html
<form name="quote" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="quote">
  <p hidden><input name="bot-field"></p>
  <input name="name" placeholder="Your name" required>
  <input name="phone" placeholder="Phone" required>
  <select name="service">
    <option>Spring repair</option><option>Opener repair</option>
    <option>New door / replacement</option><option>Maintenance / tune-up</option>
  </select>
  <textarea name="details" placeholder="Tell us about your door"></textarea>
  <button type="submit">Request my quote</button>
</form>
```
