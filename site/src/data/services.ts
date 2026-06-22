/* Service catalog — structured so each /services/{slug} page renders a
   consistent, high-converting layout. Data is CMS-editable in
   src/content/data/services.json; this module types it and adds the
   slug lookup helper. */
import data from '../content/data/services.json';

export interface Service {
  slug: string;
  title: string;          // nav / card label
  h1: string;             // page headline
  icon: string;           // inline svg key (see ServiceIcon.astro)
  photo: string;          // basename in src/assets/photos
  short: string;          // one-line card blurb
  priceHint?: string;     // friendly range note (no hard quote)
  emergency?: boolean;
  intro: string[];        // opening paragraphs
  benefits: string[];     // "what you get" bullets
  signs?: { heading: string; items: string[] }; // when to call
  faqs?: { q: string; a: string }[];
}

export const services = data.services as Service[];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
