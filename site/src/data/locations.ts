/* Service-area cities. Each entry carries genuinely local detail (county,
   landmarks, nearby towns) so the programmatic /service-area/{slug} pages
   read as real local content, not city-swapped boilerplate.
   NOTE (content pass): expand each to 500+ unique words + a local review
   before the SEO push — see research/implementation-plan.md §10.
   Data is CMS-editable in src/content/data/locations.json. */
import data from '../content/data/locations.json';

export interface LocationFaq {
  q: string;
  a: string;
}

export interface Location {
  name: string;
  slug: string;
  county: string;
  primary?: boolean;
  blurb: string;          // distinctive 1–2 sentence local intro
  intro?: string[];       // unique multi-paragraph body copy (local SEO)
  spots: string[];        // local landmarks / neighborhoods
  nearby: string[];       // slugs of nearby towns we also serve
  faqs?: LocationFaq[];   // city-specific Q&A (renders + FAQPage schema)
}

export const locations = data.locations as Location[];

export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug);
