import type { Section, Subsection } from '@/data/typescript-content';
import type { QuizQuestion } from '@/components/Quiz';
import { SITE_NAME, SITE_URL, canonicalUrl, plainText } from '@/lib/seo';

/** JSON-LD for a single learn topic (helps Google show it as a rich article result). */
export function articleJsonLd(
  section: Section,
  subsection: Subsection,
  description: string,
  path: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${subsection.title} in TypeScript`,
    description,
    url: canonicalUrl(path),
    articleSection: section.title,
    inLanguage: 'en',
    isAccessibleForFree: true,
    keywords: subsection.keywords,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl(path) },
  };
}

/** Breadcrumb trail: Home › Section › Topic. */
export function breadcrumbJsonLd(
  section: Section,
  subsection: Subsection,
  path: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: section.title },
      { '@type': 'ListItem', position: 3, name: subsection.title, item: canonicalUrl(path) },
    ],
  };
}

/** Turn a topic's quiz into FAQ structured data (eligible for FAQ rich results). */
export function faqJsonLd(quiz: QuizQuestion[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: quiz.map((q) => {
      const answer =
        q.type === 'multiple-choice' && q.options
          ? `${q.options[q.correctAnswer as number]}. ${plainText(q.explanation)}`
          : `${q.correctAnswer}. ${plainText(q.explanation)}`;
      return {
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      };
    }),
  };
}

/** Course-level JSON-LD for the home page. */
export function courseJsonLd(sections: Section[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Learn TypeScript — Free Interactive Course',
    description:
      'A free, hands-on TypeScript course covering types, functions, interfaces, generics, utility types, narrowing, React, and modern TypeScript features.',
    url: `${SITE_URL}/`,
    inLanguage: 'en',
    isAccessibleForFree: true,
    provider: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'P4W',
    },
    about: sections.map((s) => s.title),
  };
}
