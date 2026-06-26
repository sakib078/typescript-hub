import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const BASE = "/typescript-hub/";

// Dev-only: visiting the base without a trailing slash ("/typescript-hub")
// makes Vite show a "did you mean to visit /typescript-hub/" message instead
// of serving the app. Redirect it so the URL just works in the browser.
// (GitHub Pages already does this redirect in production.)
function redirectBaseSlash(): Plugin {
  const noSlash = BASE.replace(/\/$/, "");
  return {
    name: "redirect-base-trailing-slash",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? "";
        if (url === noSlash || url.startsWith(noSlash + "?")) {
          res.writeHead(302, { Location: BASE + url.slice(noSlash.length) });
          res.end();
          return;
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    redirectBaseSlash(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  base: BASE,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
