import { useParams } from 'react-router-dom';
import { sections } from '@/data/typescript-content';
import { getQuizForSection } from '@/data/quiz-data';
import { ContentSection } from '@/components/ContentSection';
import { Seo } from '@/components/Seo';
import { learnPath, subsectionDescription } from '@/lib/seo';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/structuredData';
import NotFound from './NotFound';

export default function LearnPage() {
  const { sectionId, subsectionId } = useParams();
  const section = sections.find((s) => s.id === sectionId);
  const subsection = section?.subsections.find((s) => s.id === subsectionId);

  if (!section || !subsection || !sectionId || !subsectionId) {
    return <NotFound />;
  }

  const description = subsectionDescription(subsection);
  const path = learnPath(sectionId, subsectionId);

  const jsonLd: Record<string, unknown>[] = [
    articleJsonLd(section, subsection, description, path),
    breadcrumbJsonLd(section, subsection, path),
  ];
  const quiz = getQuizForSection(sectionId, subsectionId);
  if (quiz) jsonLd.push(faqJsonLd(quiz));

  return (
    <>
      <Seo
        title={`${subsection.title} in TypeScript`}
        description={description}
        path={path}
        keywords={subsection.keywords}
        jsonLd={jsonLd}
      />
      <ContentSection sectionId={sectionId} subsectionId={subsectionId} />
    </>
  );
}
