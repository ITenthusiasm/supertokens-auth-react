"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var recipe = require("./thirdparty-shared.js");
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
require("supertokens-web-js/recipe/thirdparty");
require("./authRecipe-shared2.js");
require("./recipeModule-shared.js");
require("./multifactorauth-shared.js");
require("supertokens-web-js/recipe/session");
require("./authRecipe-shared.js");
require("./translationContext.js");
require("supertokens-web-js/lib/build/normalisedURLPath");

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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
    /*
     * Static attributes.
     */
    static init(config) {
        return recipe.ThirdParty.init(config);
    }
    static async signOut(input) {
        return recipe.ThirdParty.getInstanceOrThrow().signOut({
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async redirectToThirdPartyLogin(input) {
        const recipeInstance = recipe.ThirdParty.getInstanceOrThrow();
        return recipe.redirectToThirdPartyLogin({
            thirdPartyId: input.thirdPartyId,
            config: recipeInstance.config,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
            recipeImplementation: recipeInstance.webJSRecipe,
        });
    }
    static getStateAndOtherInfoFromStorage(input) {
        return recipe.ThirdParty.getInstanceOrThrow().webJSRecipe.getStateAndOtherInfoFromStorage({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async getAuthorisationURLWithQueryParamsAndSetState(input) {
        return recipe.ThirdParty.getInstanceOrThrow().webJSRecipe.getAuthorisationURLWithQueryParamsAndSetState({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
        });
    }
    static async signInAndUp(input) {
        return recipe.ThirdParty.getInstanceOrThrow().webJSRecipe.signInAndUp({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    /*
     * Providers
     */
    static Apple = recipe.Apple;
    static Bitbucket = recipe.Bitbucket;
    static Discord = recipe.Discord;
    static Github = recipe.Github;
    static Gitlab = recipe.Gitlab;
    static Google = recipe.Google;
    static GoogleWorkspaces = recipe.GoogleWorkspaces;
    static Facebook = recipe.Facebook;
    static LinkedIn = recipe.LinkedIn;
    static ActiveDirectory = recipe.ActiveDirectory;
    static BoxySAML = recipe.BoxySAML;
    static Okta = recipe.Okta;
    static Twitter = recipe.Twitter;
    static ComponentsOverrideProvider = recipe.Provider;
}
const init = Wrapper.init;
const signOut = Wrapper.signOut;
const redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
const getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
const getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
const signInAndUp = Wrapper.signInAndUp;
const ThirdpartyComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.ActiveDirectory = recipe.ActiveDirectory;
exports.Apple = recipe.Apple;
exports.Bitbucket = recipe.Bitbucket;
exports.BoxySAML = recipe.BoxySAML;
exports.Discord = recipe.Discord;
exports.Facebook = recipe.Facebook;
exports.Github = recipe.Github;
exports.Gitlab = recipe.Gitlab;
exports.Google = recipe.Google;
exports.GoogleWorkspaces = recipe.GoogleWorkspaces;
exports.LinkedIn = recipe.LinkedIn;
exports.Okta = recipe.Okta;
exports.Twitter = recipe.Twitter;
exports.ThirdpartyComponentsOverrideProvider = ThirdpartyComponentsOverrideProvider;
exports.default = Wrapper;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
exports.init = init;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.signInAndUp = signInAndUp;
exports.signOut = signOut;
