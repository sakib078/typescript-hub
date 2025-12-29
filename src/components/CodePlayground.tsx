import { useState } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

interface CodePlaygroundProps {
  initialCode?: string;
  title?: string;
}

export function CodePlayground({ 
  initialCode = `// Try TypeScript here!\nlet message: string = "Hello, TypeScript!";\nconsole.log(message);\n\n// Try adding a type error:\n// message = 123;`,
  title = "TypeScript Playground"
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const runCode = () => {
    setOutput([]);
    setError(null);
    
    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;
    
    // Override console methods
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };
    console.error = (...args) => {
      logs.push(`Error: ${args.join(' ')}`);
    };

    try {
      // Simple TypeScript to JavaScript conversion (strips type annotations)
      const jsCode = code
        .replace(/:\s*\w+(\[\])?(\s*[=,);])/g, '$2') // Remove type annotations
        .replace(/:\s*\w+(\[\])?\s*$/gm, '') // Remove trailing type annotations
        .replace(/<\w+>/g, '') // Remove generic types
        .replace(/interface\s+\w+\s*\{[^}]*\}/g, '') // Remove interfaces
        .replace(/type\s+\w+\s*=\s*[^;]+;/g, '') // Remove type aliases
        .replace(/as\s+\w+/g, ''); // Remove type assertions
      
      // eslint-disable-next-line no-new-func
      new Function(jsCode)();
      setOutput(logs.length > 0 ? logs : ['Code executed successfully (no output)']);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      console.log = originalLog;
      console.error = originalError;
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
    setError(null);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedCode = Prism.highlight(code, Prism.languages.typescript, 'typescript');

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={resetCode}
            className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
          <button
            onClick={runCode}
            className="flex items-center gap-1 bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Play className="h-3 w-3" />
            Run
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-foreground font-mono text-sm p-4 resize-none focus:outline-none z-10"
          spellCheck={false}
          style={{ minHeight: '200px' }}
        />
        <pre className="p-4 font-mono text-sm overflow-x-auto pointer-events-none" style={{ minHeight: '200px' }}>
          <code 
            className="language-typescript"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>

      {/* Output */}
      {(output.length > 0 || error) && (
        <div className="border-t border-border bg-muted/30 p-4">
          <div className="text-xs font-medium text-muted-foreground mb-2">Output:</div>
          <div className="font-mono text-sm space-y-1">
            {error ? (
              <div className="text-destructive">{error}</div>
            ) : (
              output.map((line, idx) => (
                <div key={idx} className="text-foreground">{line}</div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
