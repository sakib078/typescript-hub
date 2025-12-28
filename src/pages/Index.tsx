import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ContentSection } from '@/components/ContentSection';

function TypeScriptLearningApp() {
  const [showHero, setShowHero] = useState(true);
  const [activeSection, setActiveSection] = useState('introduction');
  const [activeSubsection, setActiveSubsection] = useState('what-is-typescript');

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisitedTSHub');
    if (hasVisited) {
      const lastSection = localStorage.getItem('lastSection');
      const lastSubsection = localStorage.getItem('lastSubsection');
      if (lastSection && lastSubsection) {
        setActiveSection(lastSection);
        setActiveSubsection(lastSubsection);
        setShowHero(false);
      }
    }
  }, []);

  const handleNavigate = (sectionId: string, subsectionId: string) => {
    setActiveSection(sectionId);
    setActiveSubsection(subsectionId);
    setShowHero(false);
    localStorage.setItem('hasVisitedTSHub', 'true');
    localStorage.setItem('lastSection', sectionId);
    localStorage.setItem('lastSubsection', subsectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = () => {
    handleNavigate('introduction', 'what-is-typescript');
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar
        activeSection={activeSection}
        activeSubsection={activeSubsection}
        onNavigate={handleNavigate}
      />
      
      <div className="flex flex-1 flex-col">
        <Header onSearch={handleNavigate} />
        
        <main className="flex-1 px-4 py-8 lg:px-8">
          {showHero ? (
            <HeroSection onStartLearning={handleStartLearning} />
          ) : (
            <ContentSection
              sectionId={activeSection}
              subsectionId={activeSubsection}
              onNavigate={handleNavigate}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-border px-4 py-6 text-center lg:px-8">
          <p className="text-sm text-muted-foreground">
            TypeScript Learning Hub • Built with React & TypeScript
          </p>
        </footer>
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <ThemeProvider>
      <TypeScriptLearningApp />
    </ThemeProvider>
  );
};

export default Index;
