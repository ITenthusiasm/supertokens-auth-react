"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var recipe = require("./emailverification-shared.js");
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
require("supertokens-web-js/recipe/emailverification");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");

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
    static EmailVerificationClaim = recipe.EmailVerification.EmailVerificationClaim;
    static init(config) {
        return recipe.EmailVerification.init(config);
    }
    static async isEmailVerified(input) {
        return recipe.EmailVerification.getInstanceOrThrow().webJSRecipe.isEmailVerified({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async verifyEmail(input) {
        return recipe.EmailVerification.getInstanceOrThrow().webJSRecipe.verifyEmail({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async sendVerificationEmail(input) {
        return recipe.EmailVerification.getInstanceOrThrow().webJSRecipe.sendVerificationEmail({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static getEmailVerificationTokenFromURL(input) {
        return recipe.EmailVerification.getInstanceOrThrow().webJSRecipe.getEmailVerificationTokenFromURL({
            ...input,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static ComponentsOverrideProvider = recipe.Provider;
}
const init = Wrapper.init;
const isEmailVerified = Wrapper.isEmailVerified;
const verifyEmail = Wrapper.verifyEmail;
const sendVerificationEmail = Wrapper.sendVerificationEmail;
const getEmailVerificationTokenFromURL = Wrapper.getEmailVerificationTokenFromURL;
const EmailVerificationComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
const EmailVerificationClaim = recipe.EmailVerification.EmailVerificationClaim;

exports.EmailVerificationClaim = EmailVerificationClaim;
exports.EmailVerificationComponentsOverrideProvider = EmailVerificationComponentsOverrideProvider;
exports.default = Wrapper;
exports.getEmailVerificationTokenFromURL = getEmailVerificationTokenFromURL;
exports.init = init;
exports.isEmailVerified = isEmailVerified;
exports.sendVerificationEmail = sendVerificationEmail;
exports.verifyEmail = verifyEmail;
