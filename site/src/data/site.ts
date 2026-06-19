/* ============================================================
   Business config. Owner-editable values live in
   src/content/data/settings.json (edited via the CMS); this module
   reads them and adds derived/static fields the site needs.
   ============================================================ */
import s from '../content/data/settings.json';

const digits = s.phone.replace(/\D/g, '');

export const site = {
  name: s.name,
  legalName: s.name,
  tagline: s.tagline,
  phone: s.phone,
  phoneHref: `tel:+1${digits}`,
  email: s.email,
  address: {
    locality: s.city,
    region: s.region,
    postalCode: s.postalCode,
    country: 'US',
    full: `${s.city}, ${s.region} ${s.postalCode}`,
  },
  geo: { lat: 42.1681, lng: -88.4279 }, // Huntley, IL
  mapUrl: s.googleProfileUrl,
  yearsExperience: s.yearsExperience,
  founded: s.founded,
  serviceRadiusMiles: s.serviceRadiusMiles,
  hoursLabel: s.hoursLabel,
  hours247: true,
  paymentAccepted: ['Visa', 'Mastercard', 'American Express', 'Discover', 'PayPal', 'Cash', 'Check', 'CashApp', 'Zelle'],
  openerBrands: ['LiftMaster', 'Chamberlain', 'Genie'],
  team: ['Ryan', 'Badru', 'Muwonge', 'Moush'],

  reviews: {
    total: s.reviewsTotal,
    google: s.reviewsGoogle,
    thumbtack: s.reviewsThumbtack,
    homeadvisor: s.reviewsHomeadvisor,
    nextdoor: s.reviewsNextdoor,
    rating: 5.0,
    googleReviewUrl: 'https://search.google.com/local/writereview?placeid=',
    googleProfileUrl: s.googleProfileUrl,
  },

  links: {
    visualizer: 'https://www.clopaydoor.com/ezdoor',
    financing: '#contact',
  },

  social: {
    facebook: s.facebookUrl,
    google: s.googleProfileUrl,
  },

  // marketing copy (CMS-editable)
  ribbonOffer: s.ribbonOffer,
  hero: { pre: s.heroHeadlinePre, highlight: s.heroHeadlineHighlight, post: s.heroHeadlinePost, sub: s.heroSub },
};

// Primary navigation (header).
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
