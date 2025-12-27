import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { sections } from '@/data/typescript-content';

interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  subsectionId: string;
  subsectionTitle: string;
  snippet: string;
}

interface SearchSliderProps {
  onNavigate: (sectionId: string, subsectionId: string) => void;
}

export function SearchSlider({ onNavigate }: SearchSliderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    sections.forEach(section => {
      section.subsections.forEach(subsection => {
        const contentMatch = subsection.content.toLowerCase().includes(lowerQuery);
        const titleMatch = subsection.title.toLowerCase().includes(lowerQuery);
        const codeMatch = subsection.codeExamples?.some(ex => 
          ex.code.toLowerCase().includes(lowerQuery) || 
          ex.title.toLowerCase().includes(lowerQuery)
        );

        if (contentMatch || titleMatch || codeMatch) {
          let snippet = '';
          if (titleMatch) {
            snippet = subsection.title;
          } else if (contentMatch) {
            const idx = subsection.content.toLowerCase().indexOf(lowerQuery);
            const start = Math.max(0, idx - 40);
            const end = Math.min(subsection.content.length, idx + query.length + 40);
            snippet = (start > 0 ? '...' : '') + 
                      subsection.content.slice(start, end).replace(/\n/g, ' ') + 
                      (end < subsection.content.length ? '...' : '');
          } else {
            const matchingExample = subsection.codeExamples?.find(ex => 
              ex.code.toLowerCase().includes(lowerQuery) || 
              ex.title.toLowerCase().includes(lowerQuery)
            );
            snippet = matchingExample?.title || 'Code example';
          }

          searchResults.push({
            sectionId: section.id,
            sectionTitle: section.title,
            subsectionId: subsection.id,
            subsectionTitle: subsection.title,
            snippet
          });
        }
      });
    });

    setResults(searchResults.slice(0, 8));
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    onNavigate(result.sectionId, result.subsectionId);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Sliding search panel */}
      <div
        className={`absolute right-0 top-full mt-2 w-80 origin-top-right transition-all duration-300 ease-out md:w-96 ${
          isOpen 
            ? 'scale-100 opacity-100' 
            : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        <div className="border border-border bg-card shadow-lg">
          <div className="flex items-center gap-2 border-b border-border p-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, concepts, code..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {results.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {results.map((result, idx) => (
                <button
                  key={`${result.sectionId}-${result.subsectionId}-${idx}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full border-b border-border/50 p-3 text-left transition-colors last:border-0 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-primary">{result.sectionTitle}</span>
                    <span className="text-xs text-muted-foreground">›</span>
                    <span className="text-sm font-medium text-foreground">{result.subsectionTitle}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{result.snippet}</p>
                </button>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
            </div>
          )}

          {!query && (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Start typing to search...</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {['types', 'generics', 'interface', 'React'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="bg-muted px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close search */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
