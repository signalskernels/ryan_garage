/* Promotions advertised by the business. Shown on /coupons + homepage strip.
   "Show on phone at time of service. Cannot be combined with other offers." */

export interface Coupon {
  title: string;
  amount: string;
  detail: string;
  group?: string;     // who it's for
  badge?: string;
}

export const coupons: Coupon[] = [
  {
    title: 'New Customer Discount',
    amount: '10% OFF',
    detail: 'First-time customers save 10% on any garage door service. Welcome to the family.',
    group: 'New customers',
    badge: 'Most popular',
  },
  {
    title: 'Senior Discount',
    amount: '10% OFF',
    detail: 'A thank-you to our senior neighbors — 10% off your service call.',
    group: 'Seniors 65+',
  },
  {
    title: 'Military & First Responder',
    amount: '10% OFF',
    detail: 'For active military, veterans, and first responders — thank you for your service.',
    group: 'Military · Veterans · First responders',
  },
  {
    title: 'End-of-Month Special',
    amount: 'Ask Us',
    detail: 'Booking near the end of the month? Ask about our end-of-month savings when you call.',
    group: 'Everyone',
  },
];

export const couponTerms = 'Mention the offer when you book. Show on your phone at the time of service. One offer per visit — cannot be combined with other discounts.';
