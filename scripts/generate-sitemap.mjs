// Generates dist/sitemap.xml from the pages vite-react-ssg actually pre-rendered.
// Walking dist/ guarantees the sitemap matches what really shipped.
import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://sakib078.github.io/typescript-hub';
const DIST = fileURLToPath(new URL('../dist', import.meta.url));

// Routes that exist as HTML but should not be advertised to search engines.
const EXCLUDE = new Set(['404', 'progress']);

if (!existsSync(DIST)) {
  console.error('[sitemap] dist/ not found — run the build first.');
  process.exit(1);
}

/**
 * Recursively collect every prerendered *.html under dist and turn it into a
 * route path. vite-react-ssg emits flat files: dist/index.html (home),
 * dist/cheatsheets.html, dist/learn/types/arrays.html, etc.
 */
function collectRoutes(dir) {
  const routes = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets' || entry.name === 'static-loader-data') continue;
      routes.push(...collectRoutes(full));
    } else if (entry.name.endsWith('.html')) {
      const rel = relative(DIST, full)
        .replace(/\\/g, '/')
        .replace(/\.html$/, '')
        .replace(/^index$/, ''); // home page -> ''
      routes.push(rel);
    }
  }
  return routes;
}

const priorityFor = (route) => {
  if (route === '') return '1.0';
  if (route.startsWith('learn/')) return '0.8';
  return '0.6';
};

const today = new Date().toISOString().slice(0, 10);

const routes = collectRoutes(DIST)
  .filter((r) => !EXCLUDE.has(r))
  .sort((a, b) => a.localeCompare(b));

const urls = routes
  .map((route) => {
    const loc = route === '' ? `${SITE_URL}/` : `${SITE_URL}/${route}`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>weekly</changefreq>`,
      `    <priority>${priorityFor(route)}</priority>`,
      '  </url>',
    ].join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(join(DIST, 'sitemap.xml'), xml);
console.log(`[sitemap] wrote ${routes.length} URLs to dist/sitemap.xml`);
