"use strict";

var WebJSSessionRecipe = require("supertokens-web-js/recipe/session");
var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var index = require("./recipeModule-shared.js");
var utils = require("supertokens-web-js/utils");
var windowHandler = require("supertokens-web-js/utils/windowHandler");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var WebJSSessionRecipe__default = /*#__PURE__*/ _interopDefault(WebJSSessionRecipe);

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
function normaliseSessionConfig(config) {
    if (config === undefined) {
        config = {};
    }
    const accessDeniedScreenStyle = config.accessDeniedScreen?.style ?? "";
    const accessDeniedScreen = {
        style: accessDeniedScreenStyle,
    };
    const override = {
        functions: (originalImplementation) => originalImplementation,
        ...config.override,
    };
    return {
        ...genericComponentOverrideContext.normaliseRecipeModuleConfig(config),
        // TODO: ideally we'd get the default (or normalized) value from supertokens-website
        invalidClaimStatusCode: config.invalidClaimStatusCode ?? 403,
        accessDeniedScreen,
        override,
    };
}
const getFailureRedirectionInfo = async ({ invalidClaims, overrideGlobalClaimValidators, userContext }) => {
    const globalValidators = utils.getGlobalClaimValidators({
        overrideGlobalClaimValidators,
        userContext,
    });
    let failedClaim = undefined;
    for (const validator of globalValidators) {
        const claim = invalidClaims.find((c) => c.id === validator.id);
        if (claim !== undefined) {
            const failureCallback = validator.onFailureRedirection;
            if (failureCallback) {
                const redirectPath = await failureCallback({ reason: claim.reason, userContext });
                if (redirectPath !== undefined) {
                    return {
                        redirectPath,
                        failedClaim: claim,
                    };
                }
            }
        }
        if (validator.showAccessDeniedOnFailure !== false && failedClaim === undefined) {
            failedClaim = claim;
        }
    }
    return {
        redirectPath: undefined,
        failedClaim,
    };
};
function validateAndCompareOnFailureRedirectionURLToCurrent(redirectURL) {
    const currentUrl = windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref();
    let fullRedirectURL;
    try {
        new URL(redirectURL);
        // if the url is a full, valid url, we can use that
        fullRedirectURL = redirectURL;
    } catch {
        // If we get here, we know it's not full url
        // We check if it's an absolute path
        if (!redirectURL.startsWith("/")) {
            throw new Error(`onFailureRedirectionURL returned a relative url: ${redirectURL}`);
        }
        const appInfo = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().appInfo;
        // otherwise we prepend the websiteDomain
        fullRedirectURL = `${appInfo.websiteDomain.getAsStringDangerous()}${redirectURL}`;
    }
    return currentUrl === fullRedirectURL;
}

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
/*
 * Imports.
 */
class Session extends index.RecipeModule {
    webJSRecipe;
    static instance;
    static RECIPE_ID = "session";
    recipeID = Session.RECIPE_ID;
    eventListeners = new Set();
    constructor(config, webJSRecipe = WebJSSessionRecipe__default.default) {
        super(config);
        this.webJSRecipe = webJSRecipe;
    }
    getUserId = (input) => {
        return this.webJSRecipe.getUserId(input);
    };
    getAccessToken = (input) => {
        return this.webJSRecipe.getAccessToken(input);
    };
    getClaimValue = (input) => {
        return this.webJSRecipe.getClaimValue(input);
    };
    getAccessTokenPayloadSecurely = async (input) => {
        return this.webJSRecipe.getAccessTokenPayloadSecurely(input);
    };
    doesSessionExist = (input) => {
        return this.webJSRecipe.doesSessionExist(input);
    };
    signOut = (input) => {
        return this.webJSRecipe.signOut(input);
    };
    attemptRefreshingSession = async () => {
        return this.webJSRecipe.attemptRefreshingSession();
    };
    validateClaims = (input) => {
        return this.webJSRecipe.validateClaims(input);
    };
    getInvalidClaimsFromResponse = (input) => {
        return this.webJSRecipe.getInvalidClaimsFromResponse(input);
    };
    /**
     * @returns Function to remove event listener
     */
    addEventListener = (listener) => {
        this.eventListeners.add(listener);
        return () => this.eventListeners.delete(listener);
    };
    validateGlobalClaimsAndHandleSuccessRedirection = async (
        // We redefine recipeId to be a string here, because everywhere in the SDK we treat
        // it as a string (e.g.: when defining it in recipes), but we want to type it more
        // strictly in the callbacks the app provides to help integrating our SDK.
        // This is the "meeting point" between the two types, so we need to cast between them here.
        successRedirectContext,
        fallbackRecipeId,
        redirectToPath,
        userContext,
        navigate
    ) => {
        userContext = genericComponentOverrideContext.getNormalisedUserContext(userContext);
        // First we check if there is an active session
        if (!(await this.doesSessionExist({ userContext }))) {
            // If there is none, we have no way of checking claims, so we redirect to the auth page
            // This can happen e.g.: if the user clicked on the email verification link in a browser without an active session
            return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                navigate,
                redirectBack: false,
                userContext,
            });
        }
        // We validate all the global claims
        const invalidClaims = await this.validateClaims({ userContext });
        if (invalidClaims.length > 0) {
            if (successRedirectContext !== undefined) {
                // if we have to redirect and we have success context we wanted to use we save it in localstorage
                // this way after the other page did solved the validation error it can continue
                // the sign in process by calling this function without passing the redirect info
                const jsonContext = JSON.stringify({ successRedirectContext, redirectToPath });
                await genericComponentOverrideContext.setLocalStorage(
                    "supertokens-success-redirection-context",
                    jsonContext
                );
            }
            // we try to find claim validator among failed validators with onFailure cb that returns string
            const failureRedirectInfo = await getFailureRedirectionInfo({
                invalidClaims,
                userContext,
            });
            // if redirectPath is string that means failed claim had callback that returns path, we redirect there otherwise continue
            if (failureRedirectInfo.redirectPath !== undefined) {
                // the validation part can throw, but this is handled in all places where this is called,
                // since getFailureRedirectionInfo can also throw
                if (validateAndCompareOnFailureRedirectionURLToCurrent(failureRedirectInfo.redirectPath)) {
                    throw new Error(
                        `onFailureRedirectionURL returned the current URL (${failureRedirectInfo.redirectPath}) during success redirection. This indicates that the user is in a stuck state.`
                    );
                }
                return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToUrl(
                    failureRedirectInfo.redirectPath,
                    navigate
                );
            }
        }
        // If we don't need to redirect because of a claim, we try and execute the original redirection
        if (successRedirectContext === undefined) {
            // if this wasn't set directly we try and grab it from local storage
            // generally this means this is a secondary factor completion or emailverification
            const successContextStr = await genericComponentOverrideContext.getLocalStorage(
                "supertokens-success-redirection-context"
            );
            if (successContextStr !== null) {
                try {
                    const storedContext = JSON.parse(successContextStr);
                    successRedirectContext = storedContext.successRedirectContext;
                    // if we have a redirectToPath set in the queryparams that takes priority over the stored value
                    if (redirectToPath === undefined) {
                        redirectToPath = storedContext.redirectToPath;
                    }
                } finally {
                    await genericComponentOverrideContext.removeFromLocalStorage(
                        "supertokens-success-redirection-context"
                    );
                }
            } else {
                // If there was nothing in localstorage we set a default
                // this can happen if the user visited email verification screen without an auth recipe redirecting them there
                // but already had the email verified and an active session
                successRedirectContext = {
                    recipeId: fallbackRecipeId,
                    action: "SUCCESS",
                    createdNewUser: false,
                    isNewRecipeUser: false,
                    newSessionCreated: false,
                };
            }
        }
        if (successRedirectContext === undefined) {
            throw new Error("This should never happen: successRedirectContext undefined ");
        }
        if (redirectToPath !== undefined) {
            successRedirectContext.redirectToPath = redirectToPath;
        }
        return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirect(
            successRedirectContext,
            navigate,
            {},
            userContext
        );
    };
    /**
     * This should only get called if validateGlobalClaimsAndHandleSuccessRedirection couldn't get a redirectInfo
     * @returns "/"
     */
    getDefaultRedirectionURL = async () => {
        return "/";
    };
    notifyListeners = async (event) => {
        const sessionContext = await this.getSessionContext(event);
        // We copy this.eventListeners into a new array to "freeze" it for the loop
        // We do this to avoid an infinite loop in case one of the listeners causes a new listener to be added (e.g.: through re-rendering)
        Array.from(this.eventListeners).forEach((listener) =>
            listener({
                sessionContext,
                ...event,
            })
        );
    };
    async getSessionContext({ action, userContext }) {
        if (
            action === "SESSION_CREATED" ||
            action === "REFRESH_SESSION" ||
            action === "API_INVALID_CLAIM" ||
            action === "ACCESS_TOKEN_PAYLOAD_UPDATED"
        ) {
            const [userId, accessTokenPayload] = await Promise.all([
                this.getUserId({
                    userContext,
                }),
                this.getAccessTokenPayloadSecurely({
                    userContext,
                }),
            ]);
            return {
                doesSessionExist: true,
                accessTokenPayload,
                userId,
            };
        }
        if (action === "SIGN_OUT" || action === "UNAUTHORISED") {
            return {
                doesSessionExist: false,
                accessTokenPayload: {},
                userId: "",
            };
        }
        throw new Error(`Unhandled recipe event: ${action}`);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static addAxiosInterceptors(axiosInstance, userContext) {
        return WebJSSessionRecipe__default.default.addAxiosInterceptors(axiosInstance, userContext);
    }
    static init(config) {
        const normalisedConfig = normaliseSessionConfig(config);
        return {
            recipeID: Session.RECIPE_ID,
            authReact: (appInfo) => {
                Session.instance = new Session({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: Session.RECIPE_ID,
                });
                return Session.instance;
            },
            webJS: WebJSSessionRecipe__default.default.init({
                ...normalisedConfig,
                onHandleEvent: (event) => {
                    if (normalisedConfig.onHandleEvent !== undefined) {
                        normalisedConfig.onHandleEvent(event);
                    }
                    void Session.getInstanceOrThrow().notifyListeners(event);
                },
                preAPIHook: async (context) => {
                    const response = {
                        ...context,
                        requestInit: {
                            ...context.requestInit,
                            headers: {
                                ...context.requestInit.headers,
                                rid: Session.RECIPE_ID,
                            },
                        },
                    };
                    if (normalisedConfig.preAPIHook === undefined) {
                        return response;
                    } else {
                        return normalisedConfig.preAPIHook(context);
                    }
                },
            }),
        };
    }
    static getInstanceOrThrow() {
        if (Session.instance === undefined) {
            throw Error(
                "No instance of Session found. Make sure to call the Session.init method. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        return Session.instance;
    }
    static getInstance() {
        return Session.instance;
    }
    static reset() {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Session.instance = undefined;
        return;
    }
}

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
const FactorIds = {
    EMAILPASSWORD: "emailpassword",
    OTP_EMAIL: "otp-email",
    OTP_PHONE: "otp-phone",
    LINK_EMAIL: "link-email",
    LINK_PHONE: "link-phone",
    THIRDPARTY: "thirdparty",
    TOTP: "totp",
};

exports.FactorIds = FactorIds;
exports.Session = Session;
exports.getFailureRedirectionInfo = getFailureRedirectionInfo;
exports.validateAndCompareOnFailureRedirectionURLToCurrent = validateAndCompareOnFailureRedirectionURLToCurrent;
