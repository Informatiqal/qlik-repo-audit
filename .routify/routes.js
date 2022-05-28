
/**
 * @roxi/routify 2.18.5
 * File generated Sun May 22 2022 03:37:11 GMT+0100 (British Summer Time)
 */

export const __version = "2.18.5"
export const __timestamp = "2022-05-22T02:37:11.878Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "root": true,
  "ownMeta": {
    "preload": "proximity"
  },
  "children": [
    {
      "isFallback": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/_fallback",
      "component": () => import('../src/pages/_fallback.svelte').then(m => m.default)
    },
    {
      "isIndex": true,
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "children": [
        {
          "isPage": true,
          "meta": {
            "recursive": true,
            "preload": "proximity",
            "prerender": true
          },
          "path": "/server/:serverName",
          "id": "_server__serverName",
          "component": () => import('../src/pages/server/[serverName].svelte').then(m => m.default)
        },
        {
          "isIndex": true,
          "isPage": true,
          "meta": {
            "recursive": true,
            "preload": "proximity",
            "prerender": true
          },
          "path": "/server/index",
          "id": "_server_index",
          "component": () => import('../src/pages/server/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": true,
      "ownMeta": {
        "preload": "proximity"
      },
      "meta": {
        "preload": "proximity",
        "recursive": true,
        "prerender": true
      },
      "path": "/server",
      "id": "_server__layout",
      "component": () => import('../src/pages/server/_layout.svelte').then(m => m.default)
    }
  ],
  "isLayout": true,
  "meta": {
    "preload": "proximity",
    "recursive": true,
    "prerender": true
  },
  "path": "/",
  "id": "__layout",
  "component": () => import('../src/pages/_layout.svelte').then(m => m.default)
}


export const {tree, routes} = buildClientTree(_tree)

