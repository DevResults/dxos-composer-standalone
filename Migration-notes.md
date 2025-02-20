1. Created a new folder and initialized git
2. Copied over the contents of `packages/apps/composer-app` (except for `node_modules`)
3. Updated the `.gitignore` and added `.gitattributes` files
4. Tried to run `pnpm i` which failed
5. In `package.json` replaced all `"workspace:*"` with `"^0.x"`
6. Continued picking at things and trying `pnpm i` after each change below:

- Removed `"@dxos/vite-plugin-icons": "^0.x",`
- Changed package version `"@dxos/storybook-utils": "0.7.5-labs.5f04cf6",` per pnpm suggesting that is the latest version
- Removed `"@dxos/devtools": "^0.x",`
- Removed `"@dxos/brand": "^0.x",`
- Changed package version `"@dxos/plugin-canvas": "0.7.5-main.499c70c",`
- Removed `"@dxos/plugin-theme-editor": "^0.x",`
- Changed package version `"@dxos/plugin-token-manager": "0.7.5-feature-compute.4d9d99a",`
- Error with `pnpm i`

  ```shell
  pnpm i
   ERR_PNPM_WORKSPACE_PKG_NOT_FOUND  In : "@dxos/log@workspace:*" is in the dependencies but no package named "@dxos/log" is present in the workspace

  This error happened while installing the dependencies of @dxos/storybook-utils@0.7.5-labs.5f04cf6

  Packages found in the workspace:
  Progress: resolved 151, reused 149, downloaded 0, added 0
  ```

- Removed `"@dxos/storybook-utils": "0.7.5-labs.5f04cf6",`
- Error with `pnpm i`

  ```shell
  pnpm i
   ERR_PNPM_FETCH_404  GET https://registry.npmjs.org/@dxos%2Fdevtools: Not Found - 404

  This error happened while installing the dependencies of @dxos/plugin-debug@0.7.4

  @dxos/devtools is not in the npm registry, or you have no permission to fetch it.

  No authorization header was set for the request.
  Progress: resolved 307, reused 267, downloaded 9, added 0
  ```

- Removed `"@dxos/plugin-debug": "^0.x",`
- Error with `pnpm i`

  ```shell
   pnpm i
   ERR_PNPM_WORKSPACE_PKG_NOT_FOUND  In : "@dxos/log@workspace:*" is in the dependencies but no package named "@dxos/log" is present in the workspace

  This error happened while installing the dependencies of @dxos/plugin-automation@0.7.4
   at @dxos/assistant@0.7.4

  Packages found in the workspace:
  Progress: resolved 697, reused 659, downloaded 19, added 0
  ```

- Removed `"@dxos/plugin-automation": "^0.x",`
- Error with `pnpm i`

  ```shell
  pnpm i
   ERR_PNPM_NO_MATCHING_VERSION  No matching version found for @dxos/storybook-utils@0.7.5-feature-compute.4d9d99a

  This error happened while installing the dependencies of @dxos/plugin-token-manager@0.7.5-feature-compute.4d9d99a
   at @dxos/app-framework@0.7.5-feature-compute.4d9d99a

  The latest release of @dxos/storybook-utils is "0.7.5-labs.5f04cf6".

  Other releases are:
    * labs: 0.7.5-labs.a279d8c

  If you need the full list of all 2 published versions run "$ pnpm view @dxos/storybook-utils versions".
  Progress: resolved 1099, reused 789, downloaded 32, added 0
  ```
