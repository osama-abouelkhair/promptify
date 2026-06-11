import { t as __exportAll } from "./chunks/chunk-qL-ZPAcD.js";
import { setGlobalContext_prodBuildEntry } from "vike/__internal";
//#region \0virtual:vike:server:constantsGlobalThis
globalThis.__VIKE__IS_DEV = false;
globalThis.__VIKE__IS_CLIENT = false;
globalThis.__VIKE__IS_DEBUG = false;
//#endregion
//#region \0virtual:vike:global-entry:server
var _virtual_vike_global_entry_server_exports = /* @__PURE__ */ __exportAll({
	neverLoaded: () => neverLoaded,
	pageConfigGlobalSerialized: () => pageConfigGlobalSerialized,
	pageConfigsSerialized: () => pageConfigsSerialized,
	pageFilesEager: () => pageFilesEager,
	pageFilesExportNamesEager: () => pageFilesExportNamesEager,
	pageFilesExportNamesLazy: () => pageFilesExportNamesLazy,
	pageFilesLazy: () => pageFilesLazy,
	pageFilesList: () => pageFilesList
});
var pageFilesLazy = {};
var pageFilesEager = {};
var pageFilesExportNamesLazy = {};
var pageFilesExportNamesEager = {};
var pageFilesList = [];
var neverLoaded = {};
var pageConfigsSerialized = [{
	pageId: "/",
	isErrorPage: void 0,
	routeFilesystem: {
		"routeString": "/",
		"definedAtLocation": "/"
	},
	loadVirtualFilePageEntry: () => ({
		moduleId: "virtual:vike:page-entry:server:ROOT",
		moduleExportsPromise: import("./entries/root.mjs")
	}),
	configValuesSerialized: {
		["isClientRuntimeLoaded"]: {
			type: "computed",
			definedAtData: null,
			valueSerialized: {
				type: "js-serialized",
				value: true
			}
		},
		["clientRouting"]: {
			type: "standard",
			definedAtData: {
				"filePathToShowToUser": "vike-react/config",
				"fileExportPathToShowToUser": ["default", "clientRouting"]
			},
			valueSerialized: {
				type: "js-serialized",
				value: true
			}
		}
	}
}];
var pageConfigGlobalSerialized = { configValuesSerialized: {} };
pageFilesLazy[".page"] = { .../* @__PURE__ */ Object.assign({}) };
pageFilesExportNamesEager[".page"] = { .../* @__PURE__ */ Object.assign({}) };
pageFilesLazy[".page.server"] = { .../* @__PURE__ */ Object.assign({}) };
pageFilesExportNamesEager[".page.server"] = { .../* @__PURE__ */ Object.assign({}) };
pageFilesEager[".page.route"] = { .../* @__PURE__ */ Object.assign({}) };
pageFilesExportNamesEager[".page.client"] = { .../* @__PURE__ */ Object.assign({}) };
//#endregion
//#region \0virtual:@brillout/vite-plugin-server-entry:serverEntry
setGlobalContext_prodBuildEntry({
	virtualFileExportsGlobalEntry: _virtual_vike_global_entry_server_exports,
	assetsManifest: {
  "_chunk-COv5agXF.js": {
    "file": "assets/chunks/chunk-COv5agXF.js",
    "name": "renderPageClient"
  },
  "node_modules/vike/dist/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.DO5B2-pC.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-COv5agXF.js"
    ],
    "dynamicImports": [
      "virtual:vike:page-entry:client:ROOT"
    ]
  },
  "virtual:vike:page-entry:client:ROOT": {
    "file": "assets/entries/root.CS1BMEyD.js",
    "name": "entries/root",
    "src": "virtual:vike:page-entry:client:ROOT",
    "isEntry": true,
    "imports": [
      "_chunk-COv5agXF.js"
    ]
  }
},
	buildInfo: {
		"versionAtBuildTime": "0.4.259",
		"usesClientRouter": false,
		"viteConfigRuntime": {
			"root": "/home/runner/work/promptify/promptify",
			"build": { "outDir": "/home/runner/work/promptify/promptify/dist/" },
			"_baseViteOriginal": "/",
			"vitePluginServerEntry": {}
		}
	}
});
//#endregion
export {};
