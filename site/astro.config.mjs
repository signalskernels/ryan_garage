// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Public site URL. Override at build time with PUBLIC_SITE_URL so the same
// build works on the preview subdomain and on the final production domain.
//   preview:    https://ryan-garage.signalskernels.com
//   production: https://garagedoorrepair-il.com (or the client's chosen domain)
const SITE = process.env.PUBLIC_SITE_URL || 'https://ryan-garage.signalskernels.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap(),
  ],
  image: {
    // Local image optimization (sharp) at build time.
    responsiveStyles: true,
  },
});
