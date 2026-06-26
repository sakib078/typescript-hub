import { ProgressDashboard } from '@/components/ProgressDashboard';
import { Seo } from '@/components/Seo';

export default function ProgressPage() {
  return (
    <>
      <Seo
        title="Your Progress"
        description="Track your TypeScript learning progress, completed lessons, and quiz scores."
        path="/progress"
        noindex
      />
      <ProgressDashboard />
    </>
  );
}
