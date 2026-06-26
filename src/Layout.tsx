import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

const queryClient = new QueryClient();

/** App shell shared by every route: providers + sidebar + header + footer. */
export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="flex min-h-screen w-full bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col lg:pl-72">
              <Header />
              <main className="flex-1 px-4 py-8 pb-20 lg:px-8">
                <Outlet />
              </main>
              <footer className="border-t border-border px-4 py-6 text-center lg:px-8">
                <p className="text-sm text-muted-foreground">
                  TypeScript Hub • Built with React &amp; TypeScript
                </p>
              </footer>
            </div>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
