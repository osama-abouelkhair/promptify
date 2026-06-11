import { t as __exportAll } from "../chunks/chunk-qL-ZPAcD.js";
import { onRenderHtml } from "vike-react/__internal/integration/onRenderHtml";
import { jsx, jsxs } from "react/jsx-runtime";
import import5 from "vike-react/__internal/integration/Loading";
//#region +Page.jsx
var _Page_exports = /* @__PURE__ */ __exportAll({ default: () => Page });
function Page() {
	return /* @__PURE__ */ jsxs("main", {
		className: "p-8 text-center",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "text-4xl font-bold text-gray-900",
			children: "Promptify"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-4 text-lg text-gray-600",
			children: "High-quality prompts, pre-rendered for maximum SEO performance."
		})]
	});
}
//#endregion
//#region +title.js
var _title_exports = /* @__PURE__ */ __exportAll({ default: () => _title_default });
var _title_default = "Promptify - Best AI Prompts";
//#endregion
//#region +description.js
var _description_exports = /* @__PURE__ */ __exportAll({ default: () => _description_default });
var _description_default = "Discover, share, and optimize your AI prompts with Promptify.";
//#endregion
//#region \0virtual:vike:page-entry:server:ROOT
var configValuesSerialized = {
	["isClientRuntimeLoaded"]: {
		type: "computed",
		definedAtData: null,
		valueSerialized: {
			type: "js-serialized",
			value: true
		}
	},
	["onRenderHtml"]: {
		type: "standard",
		definedAtData: {
			"filePathToShowToUser": "vike-react/__internal/integration/onRenderHtml",
			"fileExportPathToShowToUser": []
		},
		valueSerialized: {
			type: "pointer-import",
			value: onRenderHtml
		}
	},
	["Page"]: {
		type: "standard",
		definedAtData: {
			"filePathToShowToUser": "/+Page.jsx",
			"fileExportPathToShowToUser": []
		},
		valueSerialized: {
			type: "plus-file",
			exportValues: _Page_exports
		}
	},
	["passToClient"]: {
		type: "cumulative",
		definedAtData: [{
			"filePathToShowToUser": "vike-react/config",
			"fileExportPathToShowToUser": ["default", "passToClient"]
		}],
		valueSerialized: [{
			type: "js-serialized",
			value: ["_configViaHook"]
		}]
	},
	["title"]: {
		type: "standard",
		definedAtData: {
			"filePathToShowToUser": "/+title.js",
			"fileExportPathToShowToUser": []
		},
		valueSerialized: {
			type: "plus-file",
			exportValues: _title_exports
		}
	},
	["description"]: {
		type: "standard",
		definedAtData: {
			"filePathToShowToUser": "/+description.js",
			"fileExportPathToShowToUser": []
		},
		valueSerialized: {
			type: "plus-file",
			exportValues: _description_exports
		}
	},
	["Loading"]: {
		type: "standard",
		definedAtData: {
			"filePathToShowToUser": "vike-react/__internal/integration/Loading",
			"fileExportPathToShowToUser": []
		},
		valueSerialized: {
			type: "pointer-import",
			value: import5
		}
	}
};
//#endregion
export { configValuesSerialized };
