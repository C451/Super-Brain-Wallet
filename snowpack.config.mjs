import * as fs from 'fs';

const cert = fs.readFileSync('./keys/server.crt', 'utf-8');
const key = fs.readFileSync('./keys/server.key', 'utf-8');

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
      src: '/',
      assets: '/assets'
  },
  plugins: [
    /* ... */
    '@snowpack/plugin-svelte',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
      port: 8888,
      secure: {cert, key}
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
