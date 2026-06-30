import { HeroSection } from '@/components/HeroSection';
import { Seo } from '@/components/Seo';
import { sections } from '@/data/typescript-content';
import { courseJsonLd } from '@/lib/structuredData';

export default function Home() {
  return (
    <>
      <Seo
        title="TypeScript Hub — Learn TypeScript Free, From Zero to Advanced"
        description="Learn TypeScript free: a hands-on course on types, generics, utility types, narrowing, and React. Read, run code in the browser, and take quizzes."
        path=""
        keywords="learn typescript, typescript tutorial, typescript course, typescript for beginners, typescript examples, typescript online"
        jsonLd={courseJsonLd(sections)}
      />
      <HeroSection />
    </>
  );
}
