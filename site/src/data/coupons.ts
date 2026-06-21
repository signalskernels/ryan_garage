/* Promotions. CMS-editable in src/content/data/coupons.json. */
import data from '../content/data/coupons.json';

export interface Coupon {
  title: string;
  amount: string;
  detail: string;
  group?: string;
  badge?: string;
}

export const coupons = data.coupons as Coupon[];
export const couponTerms = data.terms as string;
