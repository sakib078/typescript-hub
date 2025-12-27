import { useState } from 'react';
import { ChevronDown, BookOpen, Settings, Code, Zap, Box, Layers, Sparkles, Wrench, Filter, Cloud, Menu, X } from 'lucide-react';
import { sections, Section } from '@/data/typescript-content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Settings,
  Code,
  Zap,
  Box,
  Layers,
  Sparkles,
  Wrench,
  Filter,
  Cloud,
  Atom: Sparkles,
};

interface SidebarProps {
  activeSection: string;
  activeSubsection: string;
  onNavigate: (sectionId: string, subsectionId: string) => void;
}

export function Sidebar({ activeSection, activeSubsection, onNavigate }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([activeSection]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleNavigate = (sectionId: string, subsectionId: string) => {
    onNavigate(sectionId, subsectionId);
    if (!expandedSections.includes(sectionId)) {
      setExpandedSections(prev => [...prev, sectionId]);
    }
    setIsMobileOpen(false);
  };

  const SidebarContent = () => (
    <nav className="h-full overflow-y-auto py-4">
      <div className="mb-6 px-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Learning Path
        </h2>
      </div>
      
      <ul className="space-y-1 px-2">
        {sections.map((section) => {
          const Icon = iconMap[section.icon] || BookOpen;
          const isExpanded = expandedSections.includes(section.id);
          const isActive = activeSection === section.id;

          return (
            <li key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{section.title}</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              {isExpanded && (
                <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                  {section.subsections.map((sub) => (
                    <li key={sub.id}>
                      <button
                        onClick={() => handleNavigate(section.id, sub.id)}
                        className={`w-full px-3 py-1.5 text-left text-sm transition-colors ${
                          activeSubsection === sub.id
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {sub.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center bg-card text-foreground shadow-md lg:hidden"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 transform border-r border-border bg-card transition-transform lg:static lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-center border-b border-border px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground">
              <Code className="h-4 w-4" />
            </div>
            <span className="font-semibold text-foreground">TypeScript Hub</span>
          </div>
        </div>
        <SidebarContent />
      </aside>
    </>
  );
}
