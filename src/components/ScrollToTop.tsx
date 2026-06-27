import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window back to the top on every route change. Without this,
 * React Router keeps the previous scroll position, so navigating to a new
 * topic can land you mid-page. Renders nothing; runs client-side only.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
