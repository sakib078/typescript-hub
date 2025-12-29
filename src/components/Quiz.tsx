import { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'code-completion';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  codeTemplate?: string;
}

interface QuizProps {
  title: string;
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export function Quiz({ title, questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [codeAnswer, setCodeAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const checkAnswer = () => {
    const isCorrect = question.type === 'code-completion'
      ? codeAnswer.trim().toLowerCase() === String(question.correctAnswer).toLowerCase()
      : selectedAnswer === question.correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      setCompleted(true);
      onComplete?.(score);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setCodeAnswer('');
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setCodeAnswer('');
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  const isCorrect = question.type === 'code-completion'
    ? codeAnswer.trim().toLowerCase() === String(question.correctAnswer).toLowerCase()
    : selectedAnswer === question.correctAnswer;

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <Trophy className="mx-auto h-12 w-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Quiz Complete!</h3>
        <p className="text-3xl font-bold text-primary mb-2">{percentage}%</p>
        <p className="text-muted-foreground mb-6">
          You got {score} out of {questions.length} questions correct
        </p>
        <button
          onClick={resetQuiz}
          className="flex items-center gap-2 mx-auto px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="border-b border-border bg-muted/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{title}</span>
          <span className="text-xs text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <h4 className="text-lg font-medium text-foreground mb-4">{question.question}</h4>

        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-2">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !showResult && setSelectedAnswer(idx)}
                disabled={showResult}
                className={`w-full text-left p-3 rounded border transition-colors ${
                  showResult
                    ? idx === question.correctAnswer
                      ? 'border-primary bg-primary/10 text-foreground'
                      : selectedAnswer === idx
                        ? 'border-destructive bg-destructive/10 text-foreground'
                        : 'border-border text-muted-foreground'
                    : selectedAnswer === idx
                      ? 'border-primary bg-primary/5 text-foreground'
                      : 'border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-mono text-sm">{option}</span>
                  {showResult && idx === question.correctAnswer && (
                    <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />
                  )}
                  {showResult && selectedAnswer === idx && idx !== question.correctAnswer && (
                    <XCircle className="ml-auto h-5 w-5 text-destructive" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {question.type === 'code-completion' && (
          <div className="space-y-3">
            {question.codeTemplate && (
              <pre className="p-3 bg-muted rounded font-mono text-sm text-muted-foreground">
                {question.codeTemplate}
              </pre>
            )}
            <input
              type="text"
              value={codeAnswer}
              onChange={(e) => setCodeAnswer(e.target.value)}
              disabled={showResult}
              placeholder="Type your answer..."
              className="w-full p-3 bg-background border border-border rounded font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
        )}

        {/* Result feedback */}
        {showResult && (
          <div className={`mt-4 p-4 rounded ${isCorrect ? 'bg-primary/10' : 'bg-destructive/10'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium text-primary">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-destructive" />
                  <span className="font-medium text-destructive">Incorrect</span>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-border px-6 py-4 flex justify-end gap-3">
        {!showResult ? (
          <button
            onClick={checkAnswer}
            disabled={selectedAnswer === null && !codeAnswer.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}
