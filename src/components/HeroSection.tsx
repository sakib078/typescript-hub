import { Link } from 'react-router-dom';
import { learningPaths, stats } from '@/data/typescript-content';
import { Zap, Calendar, Award, ArrowRight, Play, FileQuestion, TrendingUp, FileText } from 'lucide-react';

const pathIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Calendar,
  Award
};

export function HeroSection() {
  return (
    <div className="mb-12">
      {/* Hero */}
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 bg-primary/10 px-3 py-1 text-sm text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 bg-primary"></span>
          </span>
          Complete Learning System
        </div>
        <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Master TypeScript
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          A free, hands-on TypeScript course — from your first type to generics,
          utility types, and modern TS 6 / 7 features. Read, run code in the browser,
          and test yourself with quizzes.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/learn/introduction/what-is-typescript"
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Learning
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/progress"
            className="inline-flex items-center gap-2 border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
          >
            <TrendingUp className="h-4 w-4" />
            View Progress
          </Link>
          <Link
            to="/cheatsheets"
            className="inline-flex items-center gap-2 border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
          >
            <FileText className="h-4 w-4" />
            Cheat Sheets
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="border border-border bg-card p-4 text-center">
          <Play className="mx-auto mb-2 h-6 w-6 text-primary" />
          <div className="text-sm font-medium text-foreground">Code Playground</div>
          <div className="text-xs text-muted-foreground">Run code in-browser</div>
        </div>
        <div className="border border-border bg-card p-4 text-center">
          <FileQuestion className="mx-auto mb-2 h-6 w-6 text-primary" />
          <div className="text-sm font-medium text-foreground">Interactive Quizzes</div>
          <div className="text-xs text-muted-foreground">Test your knowledge</div>
        </div>
        <div className="border border-border bg-card p-4 text-center">
          <TrendingUp className="mx-auto mb-2 h-6 w-6 text-primary" />
          <div className="text-sm font-medium text-foreground">Progress Tracking</div>
          <div className="text-xs text-muted-foreground">Track completion</div>
        </div>
        <div className="border border-border bg-card p-4 text-center">
          <FileText className="mx-auto mb-2 h-6 w-6 text-primary" />
          <div className="text-sm font-medium text-foreground">PDF Cheat Sheets</div>
          <div className="text-xs text-muted-foreground">Quick reference</div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border bg-card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Learning Paths */}
      <div>
        <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">
          Choose Your Learning Path
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {learningPaths.map((path) => {
            const Icon = pathIcons[path.icon] || Zap;
            return (
              <div
                key={path.id}
                className="group border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {path.duration}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{path.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{path.description}</p>
                <ul className="space-y-2">
                  {path.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center bg-muted text-xs font-medium">
                        {idx + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
