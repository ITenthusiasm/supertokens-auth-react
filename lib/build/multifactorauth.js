"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var componentOverrideContext = require("./multifactorauth-shared3.js");
var recipe = require("./multifactorauth-shared2.js");
var types = require("./multifactorauth-shared.js");
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
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");
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
    static MultiFactorAuthClaim = recipe.MultiFactorAuth.MultiFactorAuthClaim;
    static FactorIds = types.FactorIds;
    static init(config) {
        return recipe.MultiFactorAuth.init(config);
    }
    static resyncSessionAndFetchMFAInfo(input) {
        return recipe.MultiFactorAuth.getInstanceOrThrow().webJSRecipe.resyncSessionAndFetchMFAInfo({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static redirectToFactor(factorId, forceSetup = false, redirectBack = true, navigate, userContext) {
        return recipe.MultiFactorAuth.getInstanceOrThrow().redirectToFactor(
            factorId,
            forceSetup,
            redirectBack,
            navigate,
            userContext
        );
    }
    static redirectToFactorChooser(redirectBack = true, nextFactorOptions = [], navigate, userContext) {
        return recipe.MultiFactorAuth.getInstanceOrThrow().redirectToFactorChooser(
            redirectBack,
            nextFactorOptions,
            navigate,
            userContext
        );
    }
    static ComponentsOverrideProvider = componentOverrideContext.Provider;
}
const init = Wrapper.init;
const resyncSessionAndFetchMFAInfo = Wrapper.resyncSessionAndFetchMFAInfo;
const redirectToFactor = Wrapper.redirectToFactor;
const redirectToFactorChooser = Wrapper.redirectToFactorChooser;
const MultiFactorAuthComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
const MultiFactorAuthClaim = recipe.MultiFactorAuth.MultiFactorAuthClaim;

exports.FactorIds = types.FactorIds;
exports.MultiFactorAuthClaim = MultiFactorAuthClaim;
exports.MultiFactorAuthComponentsOverrideProvider = MultiFactorAuthComponentsOverrideProvider;
exports.default = Wrapper;
exports.init = init;
exports.redirectToFactor = redirectToFactor;
exports.redirectToFactorChooser = redirectToFactorChooser;
exports.resyncSessionAndFetchMFAInfo = resyncSessionAndFetchMFAInfo;
