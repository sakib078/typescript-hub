import { sections } from '@/data/typescript-content';
import { getQuizForSection } from '@/data/quiz-data';
import { learnPath } from '@/lib/seo';
import { CodeBlock } from './CodeBlock';
import { CodePlayground } from './CodePlayground';
import { Quiz } from './Quiz';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ClientOnly } from 'vite-react-ssg';
import { useState, useEffect } from 'react';

interface ContentSectionProps {
  sectionId: string;
  subsectionId: string;
}

export function ContentSection({ sectionId, subsectionId }: ContentSectionProps) {
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const section = sections.find(s => s.id === sectionId);
  const subsection = section?.subsections.find(s => s.id === subsectionId);

  // Hydrate completion state from localStorage on the client only (SSG renders in Node).
  useEffect(() => {
    const stored = localStorage.getItem('completedSections');
    if (stored) setCompletedSections(JSON.parse(stored));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('completedSections', JSON.stringify(completedSections));
  }, [completedSections, hydrated]);

  if (!section || !subsection) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">Section not found</p>
      </div>
    );
  }

  const currentSectionIndex = sections.findIndex(s => s.id === sectionId);
  const currentSubsectionIndex = section.subsections.findIndex(s => s.id === subsectionId);

  const getNavigation = () => {
    let prev: { sectionId: string; subsectionId: string; title: string } | null = null;
    let next: { sectionId: string; subsectionId: string; title: string } | null = null;

    // Previous
    if (currentSubsectionIndex > 0) {
      const prevSub = section.subsections[currentSubsectionIndex - 1];
      prev = { sectionId, subsectionId: prevSub.id, title: prevSub.title };
    } else if (currentSectionIndex > 0) {
      const prevSection = sections[currentSectionIndex - 1];
      const lastSub = prevSection.subsections[prevSection.subsections.length - 1];
      prev = { sectionId: prevSection.id, subsectionId: lastSub.id, title: lastSub.title };
    }

    // Next
    if (currentSubsectionIndex < section.subsections.length - 1) {
      const nextSub = section.subsections[currentSubsectionIndex + 1];
      next = { sectionId, subsectionId: nextSub.id, title: nextSub.title };
    } else if (currentSectionIndex < sections.length - 1) {
      const nextSection = sections[currentSectionIndex + 1];
      const firstSub = nextSection.subsections[0];
      next = { sectionId: nextSection.id, subsectionId: firstSub.id, title: firstSub.title };
    }

    return { prev, next };
  };

  const { prev, next } = getNavigation();

  const toggleComplete = () => {
    const key = `${sectionId}-${subsectionId}`;
    setCompletedSections(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const isCompleted = completedSections.includes(`${sectionId}-${subsectionId}`);

  const renderContent = (content: string) => {
    // Simple markdown-like parsing
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="mb-4 mt-8 text-xl font-semibold text-foreground">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="mb-3 mt-6 text-lg font-semibold text-foreground">{line.slice(4)}</h3>;
      }

      // List items
      if (line.match(/^\d+\./)) {
        const text = line.replace(/^\d+\.\s*/, '');
        return (
          <li key={idx} className="mb-2 ml-4 list-decimal text-muted-foreground">
            {renderInlineMarkdown(text)}
          </li>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={idx} className="mb-2 ml-4 list-disc text-muted-foreground">
            {renderInlineMarkdown(line.slice(2))}
          </li>
        );
      }

      // Empty lines
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Regular paragraph
      return (
        <p key={idx} className="mb-2 text-muted-foreground leading-relaxed">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
  };

  const renderInlineMarkdown = (text: string) => {
    // Bold
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
    // Code
    text = text.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 text-sm font-mono text-primary">$1</code>');
    
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <article className="mx-auto max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <span>{section.title}</span>
        <span>›</span>
        <span className="text-foreground">{subsection.title}</span>
      </div>

      {/* Title & Actions */}
      <div className="mb-8 flex items-start justify-between">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          {subsection.title}
        </h1>
        <button
          onClick={toggleComplete}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm transition-colors ${
            isCompleted 
              ? 'bg-primary/10 text-primary' 
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          {isCompleted ? 'Completed' : 'Mark Complete'}
        </button>
      </div>

      {/* Content */}
      <div className="prose-custom">
        {renderContent(subsection.content)}
      </div>

      {/* Code Examples */}
      {subsection.codeExamples && subsection.codeExamples.length > 0 && (
        <div className="mt-8">
          {subsection.codeExamples.map((example, idx) => (
            <CodeBlock
              key={idx}
              code={example.code}
              language={example.language}
              title={example.title}
              description={example.description}
            />
          ))}
        </div>
      )}

      {/* Code Playground — only when the topic defines a dedicated runnable example.
          Rendered client-only: it's an interactive widget with no SEO value, and the
          underlying editor isn't server-renderable. */}
      {subsection.playground && (
        <div className="mt-8">
          <ClientOnly
            fallback={
              <div className="flex min-h-[240px] items-center justify-center rounded-lg border border-border bg-card text-sm text-muted-foreground">
                Loading interactive playground…
              </div>
            }
          >
            {() => (
              <CodePlayground
                // Remount per topic so the editor loads THIS subsection's code
                // and clears prior output — useState(initialCode) only seeds on mount.
                key={`${sectionId}-${subsectionId}`}
                title="Try it yourself"
                initialCode={subsection.playground!.code}
                hint={subsection.playground!.hint}
              />
            )}
          </ClientOnly>
        </div>
      )}

      {/* Quiz Section */}
      {getQuizForSection(sectionId, subsectionId) && (
        <div className="mt-8">
          <Quiz 
            title={`Quiz: ${subsection.title}`}
            questions={getQuizForSection(sectionId, subsectionId)!}
            onComplete={(score) => {
              const scores = JSON.parse(localStorage.getItem('quizScores') || '{}');
              scores[subsection.title] = score;
              localStorage.setItem('quizScores', JSON.stringify(scores));
            }}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
        {prev ? (
          <Link
            to={learnPath(prev.sectionId, prev.subsectionId)}
            className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <div className="text-left">
              <div className="text-xs uppercase tracking-wide">Previous</div>
              <div className="text-sm font-medium text-foreground">{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            to={learnPath(next.sectionId, next.subsectionId)}
            className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <div className="text-right">
              <div className="text-xs uppercase tracking-wide">Next</div>
              <div className="text-sm font-medium text-foreground">{next.title}</div>
            </div>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}
