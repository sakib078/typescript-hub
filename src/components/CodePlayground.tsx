import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

interface CodePlaygroundProps {
  initialCode?: string;
  title?: string;
  hint?: string;
}

export function CodePlayground({
  initialCode = `// Try TypeScript here!\nlet message: string = "Hello, TypeScript!";\nconsole.log(message);`,
  title = 'TypeScript Playground',
  hint,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);

  const runCode = async () => {
    setRunning(true);
    setOutput([]);
    setError(null);

    const logs: string[] = [];
    const format = (args: unknown[]) =>
      args
        .map((arg) =>
          typeof arg === 'object' && arg !== null ? JSON.stringify(arg, null, 2) : String(arg),
        )
        .join(' ');

    const sandboxConsole = {
      log: (...args: unknown[]) => logs.push(format(args)),
      info: (...args: unknown[]) => logs.push(format(args)),
      warn: (...args: unknown[]) => logs.push(format(args)),
      error: (...args: unknown[]) => logs.push(`Error: ${format(args)}`),
    };

    try {
      // Lazy-load the real TypeScript compiler only when the user runs code,
      // so it ships as a separate on-demand chunk (not in the initial bundle).
      const ts = await import('typescript');
      const { outputText, diagnostics } = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.ESNext,
        },
        reportDiagnostics: true,
      });

      if (diagnostics && diagnostics.length > 0) {
        const messages = diagnostics.map((d) =>
          ts.flattenDiagnosticMessageText(d.messageText, '\n'),
        );
        setError(messages.join('\n'));
        return;
      }

      // Run the transpiled JS in a sandbox with a captured console.
      const fn = new Function('console', outputText);
      fn(sandboxConsole);
      setOutput(logs.length > 0 ? logs : ['Code executed successfully (no output)']);
    } catch (err) {
      setError(err instanceof Error ? `${err.name}: ${err.message}` : 'An error occurred');
    } finally {
      setRunning(false);
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

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={resetCode}
            className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
          <button
            onClick={runCode}
            disabled={running}
            className="flex items-center gap-1 bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            <Play className="h-3 w-3" />
            {running ? 'Running…' : 'Run'}
          </button>
        </div>
      </div>

      {hint && (
        <div className="border-b border-border bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
          {hint}
        </div>
      )}

      {/* Editor — react-simple-code-editor keeps the caret aligned with the
          syntax-highlighted layer (textarea + highlight share identical metrics). */}
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(input) => Prism.highlight(input, Prism.languages.typescript, 'typescript')}
        padding={16}
        textareaClassName="focus:outline-none"
        className="language-typescript min-h-[200px] font-mono text-sm"
        style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 14, lineHeight: 1.6 }}
      />

      {/* Output */}
      {(output.length > 0 || error) && (
        <div className="border-t border-border bg-muted/30 p-4">
          <div className="mb-2 text-xs font-medium text-muted-foreground">Output:</div>
          <div className="space-y-1 font-mono text-sm">
            {error ? (
              <pre className="whitespace-pre-wrap text-destructive">{error}</pre>
            ) : (
              output.map((line, idx) => (
                <pre key={idx} className="whitespace-pre-wrap text-foreground">
                  {line}
                </pre>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
