"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var recipe = require("./passwordless-shared.js");
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
require("supertokens-web-js/recipe/passwordless");
require("./authRecipe-shared2.js");
require("./recipeModule-shared.js");
require("./multifactorauth-shared.js");
require("supertokens-web-js/recipe/session");
require("./multifactorauth-shared2.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./authRecipe-shared.js");

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
    static init(config) {
        return recipe.Passwordless.init(config);
    }
    static async signOut(input) {
        return recipe.Passwordless.getInstanceOrThrow().signOut({
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async createCode(input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.createCode({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async resendCode(input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.resendCode({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async consumeCode(input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.consumeCode({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static getLinkCodeFromURL(input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.getLinkCodeFromURL({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static getPreAuthSessionIdFromURL(input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.getPreAuthSessionIdFromURL({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async doesEmailExist(input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.doesEmailExist({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
        });
    }
    static async doesPhoneNumberExist(input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.doesPhoneNumberExist({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
        });
    }
    static async getLoginAttemptInfo(input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.getLoginAttemptInfo({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async setLoginAttemptInfo(input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.setLoginAttemptInfo({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
        });
    }
    static async clearLoginAttemptInfo(input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.clearLoginAttemptInfo({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static ComponentsOverrideProvider = recipe.Provider;
}
const init = Wrapper.init;
const createCode = Wrapper.createCode;
const resendCode = Wrapper.resendCode;
const consumeCode = Wrapper.consumeCode;
const getLinkCodeFromURL = Wrapper.getLinkCodeFromURL;
const getPreAuthSessionIdFromURL = Wrapper.getPreAuthSessionIdFromURL;
const doesEmailExist = Wrapper.doesEmailExist;
const doesPhoneNumberExist = Wrapper.doesPhoneNumberExist;
const getLoginAttemptInfo = Wrapper.getLoginAttemptInfo;
const setLoginAttemptInfo = Wrapper.setLoginAttemptInfo;
const clearLoginAttemptInfo = Wrapper.clearLoginAttemptInfo;
const signOut = Wrapper.signOut;
const PasswordlessComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.PasswordlessComponentsOverrideProvider = PasswordlessComponentsOverrideProvider;
exports.clearLoginAttemptInfo = clearLoginAttemptInfo;
exports.consumeCode = consumeCode;
exports.createCode = createCode;
exports.default = Wrapper;
exports.doesEmailExist = doesEmailExist;
exports.doesPhoneNumberExist = doesPhoneNumberExist;
exports.getLinkCodeFromURL = getLinkCodeFromURL;
exports.getLoginAttemptInfo = getLoginAttemptInfo;
exports.getPreAuthSessionIdFromURL = getPreAuthSessionIdFromURL;
exports.init = init;
exports.resendCode = resendCode;
exports.setLoginAttemptInfo = setLoginAttemptInfo;
exports.signOut = signOut;
