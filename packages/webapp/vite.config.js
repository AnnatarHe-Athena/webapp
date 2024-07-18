import { defineConfig, searchForWorkspaceRoot } from 'vite'
import path from "path";
import react from "@vitejs/plugin-react-swc";

/** @type {import('vite').UserConfig} */
export default {
  root: "./src",
  build: {
    outDir: "../public",
  },
  plugins: [
    // gql(),
    react(),
  ],
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(path.resolve(__dirname, '..', '..'))],
    }
  },
};
