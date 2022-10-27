import gql from 'vite-plugin-simple-gql';

/** @type {import('vite').UserConfig} */
export default {
  root: './src',
  build: {
    outDir: '../public'
  },
  plugins: [gql()]
}
