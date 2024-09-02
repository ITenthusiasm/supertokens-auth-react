"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");

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
class RecipeModule extends genericComponentOverrideContext.BaseRecipeModule {
    redirect = async (context, navigate, queryParams, userContext) => {
        // NOTE: We cannot make userContext required in args because it follows optional parameters. Instead we will normalise it if it wasn't passed in.
        let redirectUrl = await this.getRedirectUrl(
            context,
            genericComponentOverrideContext.getNormalisedUserContext(userContext)
        );
        if (redirectUrl === null) {
            genericComponentOverrideContext.logDebugMessage(
                `Skipping redirection because the user override returned null for context ${JSON.stringify(
                    context,
                    null,
                    2
                )}`
            );
            return;
        }
        redirectUrl = genericComponentOverrideContext.appendQueryParamsToURL(redirectUrl, queryParams);
        return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToUrl(redirectUrl, navigate);
    };
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getRedirectUrl = async (context, userContext) => {
        // If getRedirectionURL provided by user.
        const redirectUrl = await this.config.getRedirectionURL(context, userContext);
        if (redirectUrl !== undefined) {
            return redirectUrl;
        }
        // Otherwise, use default.
        return await this.getDefaultRedirectionURL(context, userContext);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getDefaultRedirectionURL(_, _userContext) {
        throw new Error("getDefaultRedirectionURL is not implemented.");
    }
}

exports.RecipeModule = RecipeModule;
