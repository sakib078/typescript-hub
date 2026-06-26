import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Home from './pages/Home';
import LearnPage from './pages/LearnPage';
import ProgressPage from './pages/ProgressPage';
import CheatSheetsPage from './pages/CheatSheetsPage';
import NotFound from './pages/NotFound';
import { sections } from './data/typescript-content';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'learn/:sectionId/:subsectionId',
        element: <LearnPage />,
        // Tells vite-react-ssg which topic URLs to pre-render to static HTML.
        getStaticPaths: () =>
          sections.flatMap((section) =>
            section.subsections.map((sub) => `/learn/${section.id}/${sub.id}`),
          ),
      },
      { path: 'progress', element: <ProgressPage /> },
      { path: 'cheatsheets', element: <CheatSheetsPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
