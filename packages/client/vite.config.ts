import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
    tsconfigPaths(),
    nodePolyfills({
      globals: {
        Buffer: true,
      },
    }),
  ],
  server: {
    port: parseInt(process.env.VITE_PORT) || 3000,
    fs: {
      strict: true,
    },
  },
  build: {
    target: "es2022",
    minify: true,
    sourcemap: false,
    rollupOptions: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onLog(level, log: any, handler) {
        if (
          log.cause &&
          log.cause.message === `Can't resolve original location of error.`
        ) {
          return;
        }
        handler(level, log);
      },
    },
  },
  base: "/",
  resolve: {},
});
