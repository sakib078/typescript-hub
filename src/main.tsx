import './index.css';
import { ViteReactSSG } from 'vite-react-ssg';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { routes } from './routes';

// vite-react-ssg auto-injects a per-route `loader` that, on every client-side
// navigation, fetches a CONTENT-HASHED `static-loader-data/.../<hash>.json` file.
// Our routes define no real loaders, so this machinery is pure failure surface:
// the hash changes on every build, so after any redeploy a still-open tab (or a
// CDN-cached page) requests the previous build's now-deleted JSON, gets the 404
// HTML page back, and React Router crashes the route with
//   "Unexpected token '<', "<!doctype "... is not valid JSON".
// We strip those injected loaders on the client, so navigation never fetches
// them — page content comes from route params, not loader data.
function stripLoaders(input: RouteObject[]): RouteObject[] {
  return input.map((route) => {
    const next: RouteObject = { ...route };
    delete next.loader;
    if (next.children) next.children = stripLoaders(next.children);
    return next;
  });
}

// ViteReactSSG renders these routes to static HTML at build time (for SEO)
// and hydrates them into an interactive SPA in the browser.
export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
  customCreateRouter: (dataRoutes, options) =>
    createBrowserRouter(stripLoaders(dataRoutes), options),
});
