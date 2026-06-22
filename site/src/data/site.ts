/* ============================================================
   Business config. Owner-editable values live in
   src/content/data/settings.json (edited via the CMS); this module
   reads them and adds derived/static fields the site needs.
   ============================================================ */
import s from '../content/data/settings.json';
import navData from '../content/data/navigation.json';

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
  paymentAccepted: s.paymentAccepted,
  openerBrands: s.openerBrands,
  team: s.team,

  reviews: {
    total: s.reviewsTotal,
    google: s.reviewsGoogle,
    thumbtack: s.reviewsThumbtack,
    homeadvisor: s.reviewsHomeadvisor,
    nextdoor: s.reviewsNextdoor,
    rating: 5.0,
    googleReviewUrl: s.googleReviewUrl,
    googleProfileUrl: s.googleProfileUrl,
  },

  links: {
    visualizer: s.visualizerUrl,
    financing: s.financingLink,
  },

  social: {
    facebook: s.facebookUrl,
    google: s.googleProfileUrl,
  },

  // marketing copy (CMS-editable)
  ribbonOffer: s.ribbonOffer,
  hero: { pre: s.heroHeadlinePre, highlight: s.heroHeadlineHighlight, post: s.heroHeadlinePost, sub: s.heroSub },
};

// Navigation — CMS-editable in src/content/data/navigation.json.
export interface NavLink { label: string; href: string; }
export interface FooterColumn { heading: string; links: NavLink[]; }

// Primary navigation (header).
export const nav = navData.nav as NavLink[];

// Footer link columns.
export const footerNav = navData.footer as FooterColumn[];

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
