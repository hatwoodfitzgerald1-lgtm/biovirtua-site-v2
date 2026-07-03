import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Webflow Cloud is Cloudflare-based. Server output + SSR catch-all avoids the
// subpage trailing-slash redirect loop that plain static /public hits.
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  base: '/',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false }
});
