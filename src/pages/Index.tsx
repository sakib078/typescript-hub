import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ContentSection } from '@/components/ContentSection';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { CheatSheetDownload } from '@/components/CheatSheetDownload';

type ViewMode = 'hero' | 'content' | 'progress' | 'cheatsheets';

function TypeScriptLearningApp() {
  const [viewMode, setViewMode] = useState<ViewMode>('hero');
  const [activeSection, setActiveSection] = useState('introduction');
  const [activeSubsection, setActiveSubsection] = useState('what-is-typescript');

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedTSHub');
    if (hasVisited) {
      const lastSection = localStorage.getItem('lastSection');
      const lastSubsection = localStorage.getItem('lastSubsection');
      if (lastSection && lastSubsection) {
        setActiveSection(lastSection);
        setActiveSubsection(lastSubsection);
        setViewMode('content');
      }
    }
  }, []);

  const handleNavigate = (sectionId: string, subsectionId: string) => {
    setActiveSection(sectionId);
    setActiveSubsection(subsectionId);
    setViewMode('content');
    localStorage.setItem('hasVisitedTSHub', 'true');
    localStorage.setItem('lastSection', sectionId);
    localStorage.setItem('lastSubsection', subsectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = () => handleNavigate('introduction', 'what-is-typescript');
  const handleGoHome = () => { setViewMode('hero'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="flex min-h-screen w-full bg-background">
   
        <Sidebar
          activeSection={activeSection}
          activeSubsection={activeSubsection}
          onNavigate={handleNavigate}
          onGoHome={handleGoHome}
        />

      <div className="flex flex-1 flex-col lg:pl-72">
        <Header onSearch={handleNavigate} />

        <main className="flex-1 px-4 py-8 lg:px-8">
          {viewMode === 'hero' && (
            <HeroSection
              onStartLearning={handleStartLearning}
              onOpenProgress={() => setViewMode('progress')}
              onOpenCheatSheets={() => setViewMode('cheatsheets')}
            />
          )}
          {viewMode === 'content' && (
            <ContentSection
              sectionId={activeSection}
              subsectionId={activeSubsection}
              onNavigate={handleNavigate}
            />
          )}
          {viewMode === 'progress' && <ProgressDashboard onNavigate={handleNavigate} />}
          {viewMode === 'cheatsheets' && <CheatSheetDownload />}
        </main>

        <footer className="border-t border-border px-4 py-6 text-center lg:px-8">
          <p className="text-sm text-muted-foreground">
            TypeScript Learning Hub • Built with React & TypeScript
          </p>
        </footer>
      </div>
    </div>
  );
}

const Index = () => (
  <ThemeProvider>
    <TypeScriptLearningApp />
  </ThemeProvider>
);

export default Index;
