/* Curated verbatim reviews (all 5★). Data is CMS-editable in
   src/content/data/reviews.json; this module types + derives from it. */
import data from '../content/data/reviews.json';

export interface Review {
  author: string;
  source: 'Google' | 'HomeAdvisor' | 'Thumbtack' | 'Website';
  date: string;
  rating: 5;
  text: string;
  tag?: string;
  featured?: boolean;
}

export const reviews = data.reviews as Review[];
export const featuredReviews = reviews.filter((r) => r.featured);
