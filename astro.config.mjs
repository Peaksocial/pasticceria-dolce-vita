// @ts-check
import { defineConfig } from 'astro/config';

// Static output for Cloudflare Pages. 'file' format builds /about as about.html,
// which Cloudflare serves at /about without a trailing-slash redirect.
export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});
