"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var componentOverrideContext = require("./emailpassword-shared.js");
var recipe = require("./emailpassword-shared2.js");
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
require("supertokens-web-js/recipe/emailpassword");
require("./authRecipe-shared2.js");
require("./recipeModule-shared.js");
require("./multifactorauth-shared.js");
require("supertokens-web-js/recipe/session");
require("./emailpassword-shared3.js");
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
        return recipe.EmailPassword.init(config);
    }
    static async signOut(input) {
        return recipe.EmailPassword.getInstanceOrThrow().signOut({
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async submitNewPassword(input) {
        return recipe.EmailPassword.getInstanceOrThrow().webJSRecipe.submitNewPassword({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
        });
    }
    static async sendPasswordResetEmail(input) {
        return recipe.EmailPassword.getInstanceOrThrow().webJSRecipe.sendPasswordResetEmail({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
        });
    }
    static async signUp(input) {
        return recipe.EmailPassword.getInstanceOrThrow().webJSRecipe.signUp({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
        });
    }
    static async signIn(input) {
        return recipe.EmailPassword.getInstanceOrThrow().webJSRecipe.signIn({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
        });
    }
    static async doesEmailExist(input) {
        return recipe.EmailPassword.getInstanceOrThrow().webJSRecipe.doesEmailExist({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
        });
    }
    static getResetPasswordTokenFromURL(input) {
        return recipe.EmailPassword.getInstanceOrThrow().webJSRecipe.getResetPasswordTokenFromURL({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static ComponentsOverrideProvider = componentOverrideContext.Provider;
}
const init = Wrapper.init;
const signOut = Wrapper.signOut;
const submitNewPassword = Wrapper.submitNewPassword;
const sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
const signUp = Wrapper.signUp;
const signIn = Wrapper.signIn;
const doesEmailExist = Wrapper.doesEmailExist;
const getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
const EmailPasswordComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.EmailPasswordComponentsOverrideProvider = EmailPasswordComponentsOverrideProvider;
exports.default = Wrapper;
exports.doesEmailExist = doesEmailExist;
exports.getResetPasswordTokenFromURL = getResetPasswordTokenFromURL;
exports.init = init;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.signIn = signIn;
exports.signOut = signOut;
exports.signUp = signUp;
exports.submitNewPassword = submitNewPassword;
