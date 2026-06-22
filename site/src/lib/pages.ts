/* Per-page copy loader. Each static page's visible text + image references live
   in src/content/data/pages/<name>.json (CMS-editable via the "Pages"
   collection). This module loads a page's JSON and fills a small set of tokens
   so centralized business values stay single-sourced from settings.json while
   the surrounding copy is freely editable.

   Tokens (use inside any string): {phone} {founded} {years} {radius}
   {reviewsTotal} {reviewsGoogle} {reviewsThumbtack} {reviewsHomeadvisor}
   {reviewsNextdoor} {city} {region} {postalCode} */
import { site } from '@/data/site';

const files = import.meta.glob<{ default: Record<string, unknown> }>(
  '/src/content/data/pages/*.json',
  { eager: true },
);

const tokens: Record<string, string> = {
  phone: site.phone,
  founded: String(site.founded),
  years: String(site.yearsExperience),
  radius: String(site.serviceRadiusMiles),
  reviewsTotal: String(site.reviews.total),
  reviewsGoogle: String(site.reviews.google),
  reviewsThumbtack: String(site.reviews.thumbtack),
  reviewsHomeadvisor: String(site.reviews.homeadvisor),
  reviewsNextdoor: String(site.reviews.nextdoor),
  city: site.address.locality,
  region: site.address.region,
  postalCode: site.address.postalCode,
};

const fillStr = (s: string) => s.replace(/\{(\w+)\}/g, (m, k) => (k in tokens ? tokens[k] : m));

function fill<T>(v: T): T {
  if (typeof v === 'string') return fillStr(v) as unknown as T;
  if (Array.isArray(v)) return v.map(fill) as unknown as T;
  if (v && typeof v === 'object') {
    const out: Record<string, unknown> = {};
    for (const k in v as Record<string, unknown>) out[k] = fill((v as Record<string, unknown>)[k]);
    return out as T;
  }
  return v;
}

const cache: Record<string, unknown> = {};

/** Load a page's CMS copy by name (e.g. page('about')), with tokens filled. */
export function page<T = any>(name: string): T {
  if (!(name in cache)) {
    const mod = files[`/src/content/data/pages/${name}.json`];
    if (!mod) throw new Error(`page() — no page data "src/content/data/pages/${name}.json"`);
    cache[name] = fill(mod.default);
  }
  return cache[name] as T;
}
