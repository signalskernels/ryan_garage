/* ============================================================
   Single source of truth for business facts + global nav.
   Everything the owner might edit lives here (CMS-portable).
   Facts verified from the scraped current site + reviews pull
   (see research/ + scrape/ in the repo root).
   ============================================================ */

export const site = {
  name: 'Ryan Garage Door',
  legalName: 'Ryan Garage Door',
  tagline: 'All Your Garage Door Needs',
  // 224 area code, Huntley IL
  phone: '(224) 770-0587',
  phoneHref: 'tel:+12247700587',
  email: '', // none published; contact form + phone are primary
  address: {
    locality: 'Huntley',
    region: 'IL',
    postalCode: '60142',
    country: 'US',
    // Full street address discovered during reviews pull. Kept private-ish
    // (mobile-only business) — shown in footer/contact at owner's discretion.
    full: 'Huntley, IL 60142',
  },
  geo: { lat: 42.1681, lng: -88.4279 }, // Huntley, IL
  mapUrl: 'https://maps.app.goo.gl/AWFXcd6ZD4Suiu3S6',
  yearsExperience: 6,
  founded: 2022,
  serviceRadiusMiles: 50,
  hoursLabel: 'Open 24 hours · 7 days a week',
  hours247: true,
  paymentAccepted: ['Visa', 'Mastercard', 'American Express', 'Discover', 'PayPal', 'Cash', 'Check', 'CashApp', 'Zelle'],
  openerBrands: ['LiftMaster', 'Chamberlain', 'Genie'],
  team: ['Ryan', 'Badru', 'Muwonge', 'Moush'],

  // Aggregate review proof (verified 2026-06-14, see scrape/content/_reviews.md)
  reviews: {
    total: 265,
    google: 115,
    thumbtack: 123,
    homeadvisor: 13,
    nextdoor: 13,
    rating: 5.0,
    googleReviewUrl: 'https://search.google.com/local/writereview?placeid=', // owner to paste Place ID
    googleProfileUrl: 'https://maps.app.goo.gl/AWFXcd6ZD4Suiu3S6',
  },

  // Outbound link-outs used by the base ($0/mo) build.
  links: {
    // Free Clopay design tool (link-out, not embeddable). Owner-confirm brand.
    visualizer: 'https://www.clopaydoor.com/ezdoor',
    // Wisetack prequal link is $0 merchant fee; placeholder until merchant set up.
    financing: '#contact',
  },

  social: {
    facebook: 'https://www.facebook.com/61575661076074',
    google: 'https://maps.app.goo.gl/AWFXcd6ZD4Suiu3S6',
  },
} as const;

// Primary navigation (header). Keep flat + short for mobile.
export const nav: { label: string; href: string }[] = [
  { label: 'Services', href: '/services' },
  { label: 'Service Area', href: '/service-area' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

// Footer link groups
export const footerNav = {
  Services: [
    { label: 'Spring Repair', href: '/services/spring-repair' },
    { label: 'Opener Repair', href: '/services/opener-repair' },
    { label: 'Cable Repair', href: '/services/cable-repair' },
    { label: 'New Door Installation', href: '/services/installation' },
    { label: 'Door Replacement', href: '/services/replacement' },
    { label: 'Maintenance & Tune-Up', href: '/services/maintenance' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Project Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Coupons & Offers', href: '/coupons' },
  ],
  'Get Started': [
    { label: 'Request Service', href: '/book' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Maintenance Plan', href: '/membership' },
    { label: 'Financing', href: '/financing' },
    { label: 'Design Your Door', href: '/visualizer' },
  ],
};

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
