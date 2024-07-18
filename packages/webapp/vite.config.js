import { defineConfig, searchForWorkspaceRoot } from 'vite'
import path from "path";
import react from "@vitejs/plugin-react";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
// import gql from "vite-plugin-simple-gql";

/** @type {import('vite').UserConfig} */
export default {
  root: "./src",
  build: {
    outDir: "../public",
  },
  plugins: [
    // gql(),
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
  ],
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(path.resolve(__dirname, '..', '..'))],
    }
  },
  resolve: {
    alias: {
      AthenaComponents: path.resolve(__dirname, "./src/components"),
      src: path.resolve(__dirname, "./src"),
    },
  },
};
