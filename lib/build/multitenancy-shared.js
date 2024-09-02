"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");

const [useContext, Provider] = genericComponentOverrideContext.createGenericComponentsOverrideContext();

exports.Provider = Provider;
exports.useContext = useContext;
