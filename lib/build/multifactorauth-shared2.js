"use strict";

var MultiFactorAuthWebJS = require("supertokens-web-js/recipe/multifactorauth");
var utils = require("supertokens-web-js/utils");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var sessionClaimValidatorStore = require("supertokens-web-js/utils/sessionClaimValidatorStore");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var index = require("./recipeModule-shared.js");
var types = require("./multifactorauth-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var MultiFactorAuthWebJS__default = /*#__PURE__*/ _interopDefault(MultiFactorAuthWebJS);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

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
const DEFAULT_FACTOR_CHOOSER_PATH = "/mfa";
const MFA_INFO_CACHE_KEY = "st-mfa-info-cache";

// This is a simple in-memory lock using a promise
// We do not need anything more complex than this, since the cache we are locking is in sessionStorage anyway.
let lockProm = undefined;
const getFunctionOverrides =
    (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _onHandleEvent
    ) =>
    (originalImp) => ({
        ...originalImp,
        resyncSessionAndFetchMFAInfo: async function (input) {
            const stWindow = windowHandler.WindowHandlerReference.getReferenceOrThrow();
            // If someone is refreshing from the server we wait for it to finish.
            await lockProm;
            // Here we know no-one is currently writing the cache (even though we haven't locked it ourselves)
            // Even if someone were to obtain while we are reading the sessionStorage should return consistent info
            const stored = await stWindow.windowHandler.sessionStorage.getItem(MFA_INFO_CACHE_KEY);
            if (stored !== null) {
                const parsed = JSON.parse(stored);
                if (parsed.t > Date.now() - 1000) {
                    return {
                        ...parsed.v,
                        // Adding a fake response is not great, but we do want to add something and this way it's detectable by the app
                        // so they could even add specific handling for it if they preferred.
                        fetchResponse: new Response(null, { status: 304 }),
                    };
                }
            }
            // We obtain a lock in case of a cache-miss
            let unlock;
            // We need to add a while here, since someone else could've acquired the lock after the promise resolved.
            // JS is single threaded, so when we get out of this while loop we know lockProm is undefined until we set it in the next line
            while (lockProm !== undefined) {
                await lockProm;
            }
            lockProm = new Promise((res) => (unlock = res));
            // We are releasing the lock in finally to make sure it doesn't get stuck.
            try {
                // Once we added a lock, we re-read the cache, someone else may have updated it
                const stored = await stWindow.windowHandler.sessionStorage.getItem(MFA_INFO_CACHE_KEY);
                if (stored !== null) {
                    const parsed = JSON.parse(stored);
                    if (parsed.t > Date.now() - 1000) {
                        return {
                            ...parsed.v,
                            // Adding a fake response is not great, but we do want to add something and this way it's detectable by the app
                            // so they could even add specific handling for it if they preferred.
                            fetchResponse: new Response(null, { status: 304 }),
                        };
                    }
                }
                // Refresh from the server
                const val = await originalImp.resyncSessionAndFetchMFAInfo(input);
                if (val.status === "OK") {
                    // We are not storing the fetchResponse
                    await stWindow.windowHandler.sessionStorage.setItem(
                        MFA_INFO_CACHE_KEY,
                        JSON.stringify({
                            t: Date.now(),
                            v: {
                                emails: val.emails,
                                phoneNumbers: val.phoneNumbers,
                                factors: val.factors,
                                status: val.status,
                            },
                        })
                    );
                }
                return val;
            } finally {
                // Release the lock
                lockProm = undefined;
                unlock();
            }
        },
    });

class MultiFactorAuthClaimClass {
    webJSClaim;
    id;
    refresh;
    getLastFetchedTime;
    getValueFromPayload;
    validators;
    constructor(getRecipe, getRedirectURL, onFailureRedirection) {
        this.webJSClaim = new MultiFactorAuthWebJS.MultiFactorAuthClaimClass(() => getRecipe().webJSRecipe);
        this.refresh = this.webJSClaim.refresh;
        this.getLastFetchedTime = this.webJSClaim.getLastFetchedTime;
        this.getValueFromPayload = this.webJSClaim.getValueFromPayload;
        this.id = this.webJSClaim.id;
        const defaultOnFailureRedirection = async ({ reason, userContext }) => {
            const recipe = getRecipe();
            const nextFactorOptions =
                reason.oneOf ||
                reason.allOfInAnyOrder ||
                (reason.factorId !== undefined ? [reason.factorId] : undefined);
            if (nextFactorOptions !== undefined) {
                genericComponentOverrideContext.logDebugMessage(
                    "Redirecting to MFA on next array from validation failure: " + nextFactorOptions.join(", ")
                );
                const availableFactors = recipe
                    .getSecondaryFactors(userContext)
                    .filter((v) => nextFactorOptions.factors.next.includes(v.id))
                    .map((v) => v.id);
                // In this case we got here from a validator that defined the list of validators
                if (availableFactors.length === 1) {
                    return getRedirectURL({ action: "GO_TO_FACTOR", factorId: availableFactors[0] }, userContext);
                } else {
                    return getRedirectURL({ action: "FACTOR_CHOOSER", nextFactorOptions }, userContext);
                }
            } else {
                // If we got here, it means that the default validator failed
                const mfaInfo = await recipe.webJSRecipe.resyncSessionAndFetchMFAInfo({ userContext });
                const availableFactors = recipe
                    .getSecondaryFactors(userContext)
                    .filter((v) => mfaInfo.factors.next.includes(v.id))
                    .map((v) => v.id);
                genericComponentOverrideContext.logDebugMessage(
                    "Redirecting to MFA on next array from backend: " + availableFactors.join(", ")
                );
                if (availableFactors.length === 1) {
                    return getRedirectURL({ action: "GO_TO_FACTOR", factorId: availableFactors[0] }, userContext);
                } else {
                    return getRedirectURL({ action: "FACTOR_CHOOSER" }, userContext);
                }
            }
        };
        this.validators = {
            ...this.webJSClaim.validators,
            hasCompletedMFARequirementsForAuth: (doRedirection = true, showAccessDeniedOnFailure = true) => {
                const orig = this.webJSClaim.validators.hasCompletedMFARequirementsForAuth();
                return {
                    ...orig,
                    showAccessDeniedOnFailure,
                    onFailureRedirection:
                        onFailureRedirection ??
                        (({ reason, userContext }) =>
                            doRedirection ? defaultOnFailureRedirection({ reason, userContext }) : undefined),
                };
            },
            hasCompletedFactors: (requirements, doRedirection = true, showAccessDeniedOnFailure = true) => {
                const orig = this.webJSClaim.validators.hasCompletedFactors(requirements);
                return {
                    ...orig,
                    showAccessDeniedOnFailure,
                    onFailureRedirection:
                        onFailureRedirection ??
                        (({ reason, userContext }) =>
                            doRedirection ? defaultOnFailureRedirection({ reason, userContext }) : undefined),
                };
            },
        };
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
function normaliseMultiFactorAuthFeature(config) {
    if (config === undefined) {
        config = {};
    }
    const disableDefaultUI = config.disableDefaultUI === true;
    const override = {
        functions: (originalImplementation) => originalImplementation,
        ...config.override,
    };
    return {
        ...genericComponentOverrideContext.normaliseRecipeModuleConfig(config),
        disableDefaultUI,
        firstFactors: config?.firstFactors,
        getSecondaryFactorInfo: (orig) => orig,
        factorChooserScreen: config.factorChooserScreen ?? {},
        override,
    };
}
function getAvailableFactors(factors, nextArrayQueryParam, recipe, userContext) {
    // There are 3 cases here:
    // 1. The app provided an array of factors to show (nextArrayQueryParam) -> we show whatever is in the array
    // 2. no app provided list and validator passed -> we show all factors available to set up or complete
    // 3. no app provided list and validator failing -> we show whatever the BE tells us to (this is already filtered by allowedToSetup&alreadySetup on the BE)
    const nextArr = nextArrayQueryParam !== undefined ? nextArrayQueryParam.split(",") : factors.next;
    const availableFactors = recipe
        .getSecondaryFactors(userContext)
        .filter(({ id }) =>
            nextArr.length === 0
                ? factors.allowedToSetup.includes(id) || factors.alreadySetup.includes(id)
                : nextArr.includes(id)
        );
    return availableFactors;
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
/*
 * Imports.
 */
class MultiFactorAuth extends index.RecipeModule {
    webJSRecipe;
    static instance;
    static RECIPE_ID = "multifactorauth";
    static MultiFactorAuthClaim = new MultiFactorAuthClaimClass(
        () => MultiFactorAuth.getInstanceOrThrow(),
        async (context, userContext) =>
            (await this.getInstanceOrThrow().getRedirectUrl(context, userContext)) || undefined
    );
    recipeID = MultiFactorAuth.RECIPE_ID;
    secondaryFactors = [];
    constructor(config, webJSRecipe = MultiFactorAuthWebJS__default.default) {
        super(config);
        this.webJSRecipe = webJSRecipe;
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            const defaultFactorsValidator =
                MultiFactorAuth.MultiFactorAuthClaim.validators.hasCompletedMFARequirementsForAuth();
            sessionClaimValidatorStore.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                defaultFactorsValidator
            );
            types.Session.getInstanceOrThrow().addEventListener(() => {
                // We clear the cache if the session updated, since that may mean that the MFA info has changed
                const stWindow = windowHandler.WindowHandlerReference.getReferenceOrThrow();
                stWindow.windowHandler.sessionStorage.removeItemSync(MFA_INFO_CACHE_KEY);
            });
        });
    }
    static init(config) {
        const normalisedConfig = normaliseMultiFactorAuthFeature(config);
        return {
            recipeID: MultiFactorAuth.RECIPE_ID,
            authReact: (appInfo) => {
                MultiFactorAuth.instance = new MultiFactorAuth({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: MultiFactorAuth.RECIPE_ID,
                });
                return MultiFactorAuth.instance;
            },
            webJS: MultiFactorAuthWebJS__default.default.init({
                ...normalisedConfig,
                override: {
                    functions: (originalImpl, builder) => {
                        const functions = getFunctionOverrides();
                        builder.override(functions);
                        builder.override(normalisedConfig.override.functions);
                        return originalImpl;
                    },
                },
            }),
        };
    }
    static getInstance() {
        return MultiFactorAuth.instance;
    }
    static getInstanceOrThrow() {
        if (MultiFactorAuth.instance === undefined) {
            let error = "No instance of MultiFactorAuth found. Make sure to call the MultiFactorAuth.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + genericComponentOverrideContext.SSR_ERROR;
            }
            throw Error(error);
        }
        return MultiFactorAuth.instance;
    }
    getDefaultRedirectionURL = async (context, userContext) => {
        if (context.action === "FACTOR_CHOOSER") {
            const chooserPath = new NormalisedURLPath__default.default(DEFAULT_FACTOR_CHOOSER_PATH);
            let url = this.config.appInfo.websiteBasePath.appendPath(chooserPath).getAsStringDangerous();
            if (context.nextFactorOptions && context.nextFactorOptions.length > 0) {
                url += `?n=${context.nextFactorOptions.join(",")}`;
            }
            return url;
        } else if (context.action === "GO_TO_FACTOR") {
            const redirectInfo = this.getSecondaryFactors(userContext).find((f) => f.id === context.factorId);
            if (redirectInfo !== undefined) {
                let url = this.config.appInfo.websiteBasePath
                    .appendPath(new NormalisedURLPath__default.default(redirectInfo.path))
                    .getAsStringDangerous();
                if (context.forceSetup) {
                    url += "?setup=true";
                }
                return url;
            }
            throw new Error("Requested redirect to unknown factor id: " + context.factorId);
        } else {
            return "/";
        }
    };
    addMFAFactors(secondaryFactors) {
        this.secondaryFactors = [
            ...this.secondaryFactors.filter((factor) =>
                secondaryFactors.every((newFactor) => factor.id !== newFactor.id)
            ),
            ...secondaryFactors,
        ];
    }
    isFirstFactorEnabledOnClient(factorId) {
        return this.config.firstFactors === undefined || this.config.firstFactors.includes(factorId);
    }
    getSecondaryFactors(userContext) {
        return this.config.getSecondaryFactorInfo(this.secondaryFactors, userContext);
    }
    async redirectToFactor(factorId, forceSetup = false, redirectBack = false, navigate, userContext) {
        let url = await this.getRedirectUrl(
            { action: "GO_TO_FACTOR", forceSetup, factorId },
            utils.getNormalisedUserContext(userContext)
        );
        if (url === null) {
            return;
        }
        // If redirectBack was set to true we always set redirectToPath to that value
        // otherwise we try and get it from the query params, finally falling back to not setting it.
        // Example:
        // 1. If the app calls this on pathX and with redirectBack=false, we redirect to /auth/mfa/factor-id
        // 2. If the app calls this on pathX and with redirectBack=true, we redirect to /auth/mfa/factor-id?redirectToPath=pathX
        // 3. If:
        //      - the app redirects to the factor chooser with redirectBack=true from path=X, they end up on /auth/mfa?redirectToPath=pathX
        //      - the factor chooser screen then calls this with redirectBack=false, then they end up on /auth/mfa/factor-id?redirectToPath=pathX
        // 4. In the unlikely case that the app itself uses a `redirectToPath` query param internally
        //    and is on a custom path that has a redirectToPath set to pathX when calling this function,
        //    then we keep that in the query params if redirectBack is set to false.
        if (redirectBack) {
            const redirectUrl =
                genericComponentOverrideContext.getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
            url = genericComponentOverrideContext.appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
        } else {
            const redirectUrl = genericComponentOverrideContext.getRedirectToPathFromURL();
            if (redirectUrl) {
                url = genericComponentOverrideContext.appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
            }
        }
        return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToUrl(url, navigate);
    }
    async redirectToFactorChooser(redirectBack = false, nextFactorOptions = [], navigate, userContext) {
        let url = await this.getRedirectUrl(
            { action: "FACTOR_CHOOSER", nextFactorOptions },
            utils.getNormalisedUserContext(userContext)
        );
        if (url === null) {
            return;
        }
        if (redirectBack) {
            const redirectUrl =
                genericComponentOverrideContext.getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
            url = genericComponentOverrideContext.appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
        } else {
            const redirectUrl = genericComponentOverrideContext.getRedirectToPathFromURL();
            if (redirectUrl) {
                url = genericComponentOverrideContext.appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
            }
        }
        return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToUrl(url, navigate);
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        MultiFactorAuth.instance = undefined;
        return;
    }
}

exports.DEFAULT_FACTOR_CHOOSER_PATH = DEFAULT_FACTOR_CHOOSER_PATH;
exports.MultiFactorAuth = MultiFactorAuth;
exports.getAvailableFactors = getAvailableFactors;
