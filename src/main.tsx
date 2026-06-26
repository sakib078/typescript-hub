import './index.css';
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';

// ViteReactSSG renders these routes to static HTML at build time (for SEO)
// and hydrates them into an interactive SPA in the browser.
export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
});
