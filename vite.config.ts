//
// Copyright 2022 DXOS.org
//

import ReactPlugin from '@vitejs/plugin-react-swc';
import { join, resolve } from 'node:path';
import SourceMapsPlugin from 'rollup-plugin-sourcemaps';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
// import { VitePWA } from 'vite-plugin-pwa';
import WasmPlugin from 'vite-plugin-wasm';

import { ConfigPlugin } from '@dxos/config/vite-plugin';
import { ThemePlugin } from '@dxos/react-ui-theme/plugin';
import { IconsPlugin } from '@ch-ui/vite-plugin-icons';

const rootDir = __dirname;
const phosphorIconsCore = join(rootDir, '/node_modules/@phosphor-icons/core/assets');

const contentExtensions = '{js,mjs,ts,jsx,tsx,md,css,pcss,html}'

const isTrue = (str?: string) => str === 'true' || str === '1';
const isFalse = (str?: string) => str === 'false' || str === '0';

// https://vitejs.dev/config
export default defineConfig((env) => ({
  server: {
    fs: {
      strict: false,
    },
  },
  esbuild: {
    keepNames: true,
  },
  build: {
    sourcemap: true,
    minify: !isFalse(process.env.DX_MINIFY),
    target: ['chrome89', 'edge89', 'firefox89', 'safari15'],
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
      },
    },
  },
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
  worker: {
    format: 'es' as const,
    plugins: () => [WasmPlugin(), SourceMapsPlugin()],
  },
  plugins: [
    SourceMapsPlugin(),
    ConfigPlugin(),
    ThemePlugin({
      root: __dirname,
      content: [
        join(__dirname, './index.html'),
        join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
        join(__dirname, 'node_modules/@dxos/**/*.{js,ts,jsx,tsx}'),
        join(__dirname, 'node_modules/.vite/deps/chunk-*.js'),
      ],
    }),
    IconsPlugin({
      symbolPattern: 'ph--([a-z]+[a-z-]*)--(bold|duotone|fill|light|regular|thin)',
      assetPath: (name, variant) =>
        `${phosphorIconsCore}/${variant}/${name}${variant === 'regular' ? '' : `-${variant}`}.svg`,
      spriteFile: 'icons.svg',
      contentPaths: [
        join(__dirname, 'index.html'),
        join(__dirname, `src/**/*.${contentExtensions}`),
        join(__dirname, `node_modules/@dxos/**/*.${contentExtensions}`),
        join(__dirname, `node_modules/.vite/deps/*.${contentExtensions}`),
      ],
      // verbose: true,
    }),
    WasmPlugin(),
    ReactPlugin({
      plugins: [
        // TODO(wittjosiah): This isn't published yet.
        // [
        //   '@dxos/swc-log-plugin',
        //   {
        //     to_transform: [
        //       {
        //         name: 'log',
        //         package: '@dxos/log',
        //         param_index: 2,
        //         include_args: false,
        //         include_call_site: true,
        //         include_scope: true,
        //       },
        //       {
        //         name: 'invariant',
        //         package: '@dxos/invariant',
        //         param_index: 2,
        //         include_args: true,
        //         include_call_site: false,
        //         include_scope: true,
        //       },
        //       {
        //         name: 'Context',
        //         package: '@dxos/context',
        //         param_index: 1,
        //         include_args: false,
        //         include_call_site: false,
        //         include_scope: false,
        //       },
        //     ],
        //   },
        // ],
      ],
    }),
    // TODO(wittjosiah): This plugin wasn't working for some reason. Add back in.
    // VitePWA({
    //   // No PWA for e2e tests because it slows them down (especially waiting to clear toasts).
    //   // No PWA in dev to make it easier to ensure the latest version is being used.
    //   // May be mitigated in the future by https://github.com/dxos/dxos/issues/4939.
    //   // https://vite-pwa-org.netlify.app/guide/unregister-service-worker.html#unregister-service-worker
    //   // NOTE: Check cached resources (on CF, and in the PWA).
    //   // curl -I --header "Cache-Control: no-cache" https://staging.composer.space/icons.svg
    //   selfDestroying: process.env.DX_PWA === 'false',
    //   workbox: {
    //     maximumFileSizeToCacheInBytes: 30000000,
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm,woff2}'],
    //   },
    //   includeAssets: ['favicon.ico'],
    //   manifest: {
    //     name: 'DXOS Composer',
    //     short_name: 'Composer',
    //     description: 'DXOS Composer',
    //     theme_color: '#003E70',
    //     icons: [
    //       {
    //         "src": "pwa-64x64.png",
    //         "sizes": "64x64",
    //         "type": "image/png"
    //       },
    //       {
    //         "src": "pwa-192x192.png",
    //         "sizes": "192x192",
    //         "type": "image/png"
    //       },
    //       {
    //         "src": "pwa-512x512.png",
    //         "sizes": "512x512",
    //         "type": "image/png"
    //       },
    //       {
    //         "src": "maskable-icon-512x512.png",
    //         "sizes": "512x512",
    //         "type": "image/png",
    //         "purpose": "maskable"
    //       }
    //     ],
    //   },
    // }),
  ],
}));
