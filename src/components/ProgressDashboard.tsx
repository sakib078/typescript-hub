import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, Clock, Trophy, TrendingUp } from 'lucide-react';
import { sections } from '@/data/typescript-content';

interface ProgressDashboardProps {
  onNavigate: (sectionId: string, subsectionId: string) => void;
}

export function ProgressDashboard({ onNavigate }: ProgressDashboardProps) {
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const stored = localStorage.getItem('completedSections');
    if (stored) {
      setCompletedSections(JSON.parse(stored));
    }
    const scores = localStorage.getItem('quizScores');
    if (scores) {
      setQuizScores(JSON.parse(scores));
    }
  }, []);

  // Calculate total subsections
  const totalSubsections = sections.reduce((acc, s) => acc + s.subsections.length, 0);
  const completedCount = completedSections.length;
  const progressPercentage = Math.round((completedCount / totalSubsections) * 100);

  // Calculate stats per section
  const sectionStats = sections.map(section => {
    const completed = section.subsections.filter(sub => 
      completedSections.includes(`${section.id}-${sub.id}`)
    ).length;
    return {
      ...section,
      completed,
      total: section.subsections.length,
      percentage: Math.round((completed / section.subsections.length) * 100)
    };
  });

  // Find next uncompleted section
  const nextSection = sections.find(section => 
    section.subsections.some(sub => 
      !completedSections.includes(`${section.id}-${sub.id}`)
    )
  );
  const nextSubsection = nextSection?.subsections.find(sub => 
    !completedSections.includes(`${nextSection.id}-${sub.id}`)
  );

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Your Learning Progress
        </h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          {/* Progress Circle */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${progressPercentage * 2.83} 283`}
                  strokeLinecap="round"
                  className="text-primary transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{progressPercentage}%</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Overall Progress</p>
          </div>

          {/* Stats */}
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalSubsections}</p>
                <p className="text-xs text-muted-foreground">Total Lessons</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedCount}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>

          {/* Continue Learning */}
          {nextSection && nextSubsection && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Continue Learning</p>
              <p className="font-medium text-foreground mb-1">{nextSubsection.title}</p>
              <p className="text-sm text-muted-foreground mb-3">{nextSection.title}</p>
              <button
                onClick={() => onNavigate(nextSection.id, nextSubsection.id)}
                className="w-full px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section Progress */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Progress by Section</h3>
        <div className="space-y-4">
          {sectionStats.map(section => (
            <div key={section.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{section.title}</span>
                <span className="text-xs text-muted-foreground">
                  {section.completed}/{section.total} completed
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${section.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Scores */}
      {Object.keys(quizScores).length > 0 && (
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Quiz Scores
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {Object.entries(quizScores).map(([quizId, score]) => (
              <div key={quizId} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <span className="text-sm text-foreground">{quizId}</span>
                <span className="text-sm font-medium text-primary">{score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
