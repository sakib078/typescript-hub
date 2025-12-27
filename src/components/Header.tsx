import { Moon, Sun, Github } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { SearchSlider } from './SearchSlider';

interface HeaderProps {
  onSearch: (sectionId: string, subsectionId: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-8">
      <div className="flex items-center gap-4 lg:hidden">
        {/* Space for mobile menu button */}
        <div className="w-10" />
      </div>

      <div className="hidden lg:block">
        <h1 className="text-lg font-medium text-foreground">
          Learn TypeScript
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <SearchSlider onNavigate={onSearch} />
        
        <a
          href="https://github.com/microsoft/TypeScript"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          aria-label="TypeScript on GitHub"
        >
          <Github className="h-5 w-5" />
        </a>

        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
}
