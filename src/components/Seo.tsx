import { Head } from 'vite-react-ssg';
import { OG_IMAGE, SITE_NAME, canonicalUrl } from '@/lib/seo';

interface SeoProps {
  /** Page title (without the site-name suffix, which is added automatically). */
  title: string;
  description: string;
  /** Route path for the canonical URL, e.g. "/learn/types/arrays". "" = home. */
  path?: string;
  keywords?: string;
  /** One or more JSON-LD structured-data blocks. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Set true on app-only views (progress, cheatsheets) to keep them out of search. */
  noindex?: boolean;
}

/**
 * Per-page <head> manager. During the static build, vite-react-ssg inlines
 * these tags into each route's HTML so every topic ships real SEO metadata.
 */
export function Seo({ title, description, path = '', keywords, jsonLd, noindex }: SeoProps) {
  const canonical = canonicalUrl(path);
  const fullTitle = path === '' ? title : `${title} | ${SITE_NAME}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex ? (
        <meta name="robots" content="noindex,follow" />
      ) : (
        <link rel="canonical" href={canonical} />
      )}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Head>
  );
}