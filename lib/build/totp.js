"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var recipe = require("./totp-shared.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("react/jsx-runtime");
require("supertokens-web-js/recipe/totp");
require("./multifactorauth-shared2.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");
require("./multifactorauth-shared.js");
require("supertokens-web-js/recipe/session");

/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
class Wrapper {
    static init(config) {
        return recipe.TOTP.init(config);
    }
    static createDevice(input) {
        return recipe.TOTP.getInstanceOrThrow().webJSRecipe.createDevice({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static verifyCode(input) {
        return recipe.TOTP.getInstanceOrThrow().webJSRecipe.verifyCode({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static verifyDevice(input) {
        return recipe.TOTP.getInstanceOrThrow().webJSRecipe.verifyDevice({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static removeDevice(input) {
        return recipe.TOTP.getInstanceOrThrow().webJSRecipe.removeDevice({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static listDevices(input) {
        return recipe.TOTP.getInstanceOrThrow().webJSRecipe.listDevices({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static ComponentsOverrideProvider = recipe.Provider;
}
const init = Wrapper.init;
const createDevice = Wrapper.createDevice;
const verifyCode = Wrapper.verifyCode;
const verifyDevice = Wrapper.verifyDevice;
const removeDevice = Wrapper.removeDevice;
const listDevices = Wrapper.listDevices;
const TOTPComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.TOTPComponentsOverrideProvider = TOTPComponentsOverrideProvider;
exports.createDevice = createDevice;
exports.default = Wrapper;
exports.init = init;
exports.listDevices = listDevices;
exports.removeDevice = removeDevice;
exports.verifyCode = verifyCode;
exports.verifyDevice = verifyDevice;
