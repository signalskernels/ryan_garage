// Maps every photo in src/assets/photos to its basename (no extension) so
// components can fetch an optimizable ImageMetadata object by name.
// Using src/assets (not public/) lets Astro's <Image> generate responsive,
// compressed variants at build time — important for Core Web Vitals.
import type { ImageMetadata } from 'astro';

// Match common raster formats so images uploaded through the CMS (which may be
// jpg/png/avif, not just webp) are also optimized by Astro's <Image> and keyed
// here. Anything committed to src/assets/photos is picked up on the next build.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/*.{webp,jpg,jpeg,png,avif,gif}',
  { eager: true },
);

const byName: Record<string, ImageMetadata> = {};
for (const path in modules) {
  const base = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  // Don't clobber an existing basename (webp is globbed first), so duplicate
  // basenames across formats resolve deterministically.
  if (!(base in byName)) byName[base] = modules[path].default;
}

// Fallback image used when a referenced photo name is missing (e.g. a typo
// entered via the CMS) — degrade gracefully instead of failing the build.
const FALLBACK = 'Garage-Door-Service';

// Reduce whatever the CMS stored — a bare basename ("Garage-Door-Service"), a
// filename ("Garage-Door-Service.webp"), or a full path
// ("/src/assets/photos/Garage-Door-Service.webp") — to a lookup basename.
export function toBasename(value: string): string {
  return (value || '')
    .split(/[?#]/)[0]          // drop query / hash
    .split('/').pop()!         // drop directory
    .replace(/\.[^.]+$/, '');  // drop extension
}

/** Get a photo by name or CMS path (e.g. "Garage-Door-Service"). Falls back if missing. */
export function photo(name: string): ImageMetadata {
  const base = toBasename(name);
  const img = byName[base] ?? byName[FALLBACK];
  if (!img) throw new Error(`photo() — no image "${name}" and no fallback "${FALLBACK}".`);
  if (!byName[base]) console.warn(`photo() — unknown image "${name}", using fallback.`);
  return img;
}

/** Safe lookup that returns undefined instead of throwing. */
export function photoMaybe(name: string): ImageMetadata | undefined {
  return byName[toBasename(name)];
}

/** All photos whose basename starts with the given prefix (for the gallery). */
export function photosByPrefix(prefix: string): { name: string; img: ImageMetadata }[] {
  return Object.keys(byName)
    .filter((n) => n.startsWith(prefix))
    .sort()
    .map((name) => ({ name, img: byName[name] }));
}
