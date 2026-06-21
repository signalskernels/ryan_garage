// Maps every photo in src/assets/photos to its basename (no extension) so
// components can fetch an optimizable ImageMetadata object by name.
// Using src/assets (not public/) lets Astro's <Image> generate responsive,
// compressed variants at build time — important for Core Web Vitals.
import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/*.webp',
  { eager: true },
);

const byName: Record<string, ImageMetadata> = {};
for (const path in modules) {
  const base = path.split('/').pop()!.replace(/\.webp$/, '');
  byName[base] = modules[path].default;
}

// Fallback image used when a referenced photo name is missing (e.g. a typo
// entered via the CMS) — degrade gracefully instead of failing the build.
const FALLBACK = 'Garage-Door-Service';

/** Get a photo by basename (e.g. "Garage-Door-Service"). Falls back if missing. */
export function photo(name: string): ImageMetadata {
  const img = byName[name] ?? byName[FALLBACK];
  if (!img) throw new Error(`photo() — no image "${name}" and no fallback "${FALLBACK}".`);
  if (!byName[name]) console.warn(`photo() — unknown image "${name}", using fallback.`);
  return img;
}

/** Safe lookup that returns undefined instead of throwing. */
export function photoMaybe(name: string): ImageMetadata | undefined {
  return byName[name];
}

/** All photos whose basename starts with the given prefix (for the gallery). */
export function photosByPrefix(prefix: string): { name: string; img: ImageMetadata }[] {
  return Object.keys(byName)
    .filter((n) => n.startsWith(prefix))
    .sort()
    .map((name) => ({ name, img: byName[name] }));
}
