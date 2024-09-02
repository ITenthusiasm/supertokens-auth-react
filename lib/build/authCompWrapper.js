"use strict";

var jsxRuntime = require("react/jsx-runtime");
var uiEntry = require("./index2.js");

function AuthComponentWrapper({ children, recipeComponentOverrides }) {
    return jsxRuntime.jsx(uiEntry.ComponentOverrideContext.Provider, {
        value: recipeComponentOverrides,
        children: children,
    });
}

exports.AuthComponentWrapper = AuthComponentWrapper;
