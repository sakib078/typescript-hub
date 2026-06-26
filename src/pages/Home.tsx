import { HeroSection } from '@/components/HeroSection';
import { Seo } from '@/components/Seo';
import { sections } from '@/data/typescript-content';
import { courseJsonLd } from '@/lib/structuredData';

export default function Home() {
  return (
    <>
      <Seo
        title="TypeScript Hub — Learn TypeScript Free, From Zero to Advanced"
        description="Learn TypeScript free with a hands-on, interactive course: types, functions, interfaces, generics, utility types, narrowing, React, and modern TypeScript (TS 6 & 7). Read, run code in the browser, and take quizzes."
        path=""
        keywords="learn typescript, typescript tutorial, typescript course, typescript for beginners, typescript examples, typescript online"
        jsonLd={courseJsonLd(sections)}
      />
      <HeroSection />
    </>
  );
}
