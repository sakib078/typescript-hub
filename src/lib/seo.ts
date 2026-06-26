import type { Subsection } from '@/data/typescript-content';

/** Canonical production origin + base path (GitHub Pages). No trailing slash. */
export const SITE_URL = 'https://sakib078.github.io/typescript-hub';
export const SITE_NAME = 'TypeScript Hub';
// SVG renders in browsers and most crawlers. For guaranteed Twitter/Facebook
// image cards, export this to a 1200x630 PNG at /og-image.png and update here.
export const OG_IMAGE = `${SITE_URL}/og-image.svg`;

/** Route path for a learn topic (relative to the router basename). */
export function learnPath(sectionId: string, subsectionId: string): string {
  return `/learn/${sectionId}/${subsectionId}`;
}

/** Absolute canonical URL for a given route path (e.g. "/learn/types/arrays"). */
export function canonicalUrl(path = ''): string {
  if (!path || path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

/** Strip the lightweight markdown used in content down to plain prose. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Clamp text to a meta-description-friendly length on a word boundary. */
export function clampDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(' ');
  return `${(lastSpace > 60 ? slice.slice(0, lastSpace) : slice).trimEnd()}…`;
}

/** Best meta description for a subsection: explicit seoDescription, else derived. */
export function subsectionDescription(sub: Subsection): string {
  return clampDescription(sub.seoDescription || plainText(sub.content));
}