"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var WebJSSessionRecipe = require("supertokens-web-js/recipe/session");
var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var componentOverrideContext = require("./session-shared.js");
var types = require("./multifactorauth-shared.js");
var uiEntry = require("./index2.js");
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
require("./recipeModule-shared.js");
require("./translationContext.js");
require("react-dom");
require("./multitenancy-shared.js");
require("./multifactorauth-shared2.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./authRecipe-shared.js");
require("supertokens-web-js/lib/build/normalisedURLPath");

class BooleanClaim extends WebJSSessionRecipe.BooleanClaim {
    constructor(config) {
        super(config);
        const validatorsWithCallbacks = { ...this.validators };
        for (const key in validatorsWithCallbacks) {
            const validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key] = (...args) => {
                return {
                    ...validator(...args),
                    onFailureRedirection: config.onFailureRedirection,
                    showAccessDeniedOnFailure: config.showAccessDeniedOnFailure,
                };
            };
        }
        this.validators = validatorsWithCallbacks;
    }
}

class PrimitiveArrayClaim extends WebJSSessionRecipe.PrimitiveArrayClaim {
    constructor(config) {
        super(config);
        const validatorsWithCallbacks = { ...this.validators };
        for (const key in validatorsWithCallbacks) {
            const validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key] = (...args) => {
                return {
                    ...validator(...args),
                    onFailureRedirection: config.onFailureRedirection,
                    showAccessDeniedOnFailure: config.showAccessDeniedOnFailure,
                };
            };
        }
        this.validators = validatorsWithCallbacks;
    }
}

class PrimitiveClaim extends WebJSSessionRecipe.PrimitiveClaim {
    constructor(config) {
        super(config);
        const validatorsWithCallbacks = { ...this.validators };
        for (const key in validatorsWithCallbacks) {
            const validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key] = (...args) => {
                return {
                    ...validator(...args),
                    onFailureRedirection: config.onFailureRedirection,
                    showAccessDeniedOnFailure: config.showAccessDeniedOnFailure,
                };
            };
        }
        this.validators = validatorsWithCallbacks;
    }
}

const useClaimValue$1 = (claim) => {
    const ctx = uiEntry.useSessionContext();
    if (ctx.loading) {
        return {
            loading: true,
        };
    }
    if (ctx.doesSessionExist === false) {
        return {
            loading: false,
            doesSessionExist: false,
            value: undefined,
        };
    }
    return {
        loading: false,
        doesSessionExist: true,
        value: claim.getValueFromPayload(ctx.accessTokenPayload),
    };
};

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
class SessionAPIWrapper {
    static useSessionContext = uiEntry.useSessionContext;
    static useClaimValue = useClaimValue$1;
    static SessionAuth = uiEntry.SessionAuthWrapper;
    static init(config) {
        return types.Session.init(config);
    }
    static async getUserId(input) {
        return types.Session.getInstanceOrThrow().getUserId({
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async getAccessToken(input) {
        return types.Session.getInstanceOrThrow().getAccessToken({
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async getAccessTokenPayloadSecurely(input) {
        return types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static async attemptRefreshingSession() {
        return types.Session.getInstanceOrThrow().attemptRefreshingSession();
    }
    static async doesSessionExist(input) {
        return types.Session.getInstanceOrThrow().doesSessionExist({
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    /**
     * @deprecated
     */
    static addAxiosInterceptors(axiosInstance, userContext) {
        return types.Session.addAxiosInterceptors(
            axiosInstance,
            genericComponentOverrideContext.getNormalisedUserContext(userContext)
        );
    }
    static async signOut(input) {
        return types.Session.getInstanceOrThrow().signOut({
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static validateClaims(input) {
        return types.Session.getInstanceOrThrow().validateClaims({
            overrideGlobalClaimValidators: input?.overrideGlobalClaimValidators,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static getInvalidClaimsFromResponse(input) {
        return types.Session.getInstanceOrThrow().getInvalidClaimsFromResponse(input);
    }
    static getClaimValue(input) {
        return types.Session.getInstanceOrThrow().getClaimValue({
            claim: input.claim,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input?.userContext),
        });
    }
    static ComponentsOverrideProvider = componentOverrideContext.Provider;
}
const useSessionContext = SessionAPIWrapper.useSessionContext;
const useClaimValue = SessionAPIWrapper.useClaimValue;
const SessionAuth = SessionAPIWrapper.SessionAuth;
const init = SessionAPIWrapper.init;
const getUserId = SessionAPIWrapper.getUserId;
const getAccessToken = SessionAPIWrapper.getAccessToken;
const getAccessTokenPayloadSecurely = SessionAPIWrapper.getAccessTokenPayloadSecurely;
const attemptRefreshingSession = SessionAPIWrapper.attemptRefreshingSession;
const doesSessionExist = SessionAPIWrapper.doesSessionExist;
/**
 * @deprecated
 */
const addAxiosInterceptors = SessionAPIWrapper.addAxiosInterceptors;
const signOut = SessionAPIWrapper.signOut;
const validateClaims = SessionAPIWrapper.validateClaims;
const getInvalidClaimsFromResponse = SessionAPIWrapper.getInvalidClaimsFromResponse;
const getClaimValue = SessionAPIWrapper.getClaimValue;
const SessionComponentsOverrideProvider = SessionAPIWrapper.ComponentsOverrideProvider;

exports.SessionContext = uiEntry.SessionContext;
exports.BooleanClaim = BooleanClaim;
exports.PrimitiveArrayClaim = PrimitiveArrayClaim;
exports.PrimitiveClaim = PrimitiveClaim;
exports.SessionAuth = SessionAuth;
exports.SessionComponentsOverrideProvider = SessionComponentsOverrideProvider;
exports.addAxiosInterceptors = addAxiosInterceptors;
exports.attemptRefreshingSession = attemptRefreshingSession;
exports.default = SessionAPIWrapper;
exports.doesSessionExist = doesSessionExist;
exports.getAccessToken = getAccessToken;
exports.getAccessTokenPayloadSecurely = getAccessTokenPayloadSecurely;
exports.getClaimValue = getClaimValue;
exports.getInvalidClaimsFromResponse = getInvalidClaimsFromResponse;
exports.getUserId = getUserId;
exports.init = init;
exports.signOut = signOut;
exports.useClaimValue = useClaimValue;
exports.useSessionContext = useSessionContext;
exports.validateClaims = validateClaims;
