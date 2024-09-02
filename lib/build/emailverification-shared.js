"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var EmailVerificationWebJS = require("supertokens-web-js/recipe/emailverification");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var sessionClaimValidatorStore = require("supertokens-web-js/utils/sessionClaimValidatorStore");
var index = require("./recipeModule-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var EmailVerificationWebJS__default = /*#__PURE__*/ _interopDefault(EmailVerificationWebJS);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

const [useContext, Provider] = genericComponentOverrideContext.createGenericComponentsOverrideContext();

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
const DEFAULT_VERIFY_EMAIL_PATH = "/verify-email";

class EmailVerificationClaimClass extends EmailVerificationWebJS.EmailVerificationClaimClass {
    constructor(getRecipeImpl, onFailureRedirection) {
        super(getRecipeImpl);
        const validatorsWithCallbacks = { ...this.validators };
        for (const key in validatorsWithCallbacks) {
            const validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key] = (...args) => {
                return {
                    ...validator(...args),
                    onFailureRedirection: (args) => {
                        if (onFailureRedirection !== undefined) {
                            return onFailureRedirection(args);
                        }
                        const recipe = EmailVerification.getInstanceOrThrow();
                        if (recipe.config.mode === "REQUIRED") {
                            return recipe.getRedirectUrl({ action: "VERIFY_EMAIL" }, args.userContext);
                        }
                        return undefined;
                    },
                    showAccessDeniedOnFailure: false,
                };
            };
        }
        this.validators = validatorsWithCallbacks;
    }
}

const getFunctionOverrides = (onHandleEvent) => (originalImp) => ({
    ...originalImp,
    verifyEmail: async function (input) {
        const response = await originalImp.verifyEmail(input);
        if (response.status === "OK") {
            onHandleEvent({
                action: "EMAIL_VERIFIED_SUCCESSFUL",
                userContext: input.userContext,
            });
        }
        return response;
    },
    sendVerificationEmail: async function (input) {
        const response = await originalImp.sendVerificationEmail(input);
        if (response.status === "OK") {
            onHandleEvent({
                action: "VERIFY_EMAIL_SENT",
                userContext: input.userContext,
            });
        }
        return response;
    },
});

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
function normaliseEmailVerificationFeature(config) {
    if (config === undefined) {
        config = {};
    }
    const disableDefaultUI = config.disableDefaultUI === true;
    const mode = config.mode === undefined ? "REQUIRED" : config.mode;
    const sendVerifyEmailScreenStyle =
        config.sendVerifyEmailScreen !== undefined && config.sendVerifyEmailScreen.style !== undefined
            ? config.sendVerifyEmailScreen.style
            : "";
    const sendVerifyEmailScreen = {
        style: sendVerifyEmailScreenStyle,
    };
    const verifyEmailLinkClickedScreenStyle =
        config.verifyEmailLinkClickedScreen !== undefined && config.verifyEmailLinkClickedScreen.style !== undefined
            ? config.verifyEmailLinkClickedScreen.style
            : "";
    const verifyEmailLinkClickedScreen = {
        style: verifyEmailLinkClickedScreenStyle,
    };
    const override = {
        functions: (originalImplementation) => originalImplementation,
        ...config.override,
    };
    return {
        ...genericComponentOverrideContext.normaliseRecipeModuleConfig(config),
        disableDefaultUI,
        mode,
        sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen,
        override,
    };
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
class EmailVerification extends index.RecipeModule {
    webJSRecipe;
    static instance;
    static RECIPE_ID = "emailverification";
    static EmailVerificationClaim = new EmailVerificationClaimClass(
        () => EmailVerification.getInstanceOrThrow().webJSRecipe
    );
    recipeID = EmailVerification.RECIPE_ID;
    constructor(config, webJSRecipe = EmailVerificationWebJS__default.default) {
        super(config);
        this.webJSRecipe = webJSRecipe;
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            const isVerifiedValidator = EmailVerification.EmailVerificationClaim.validators.isVerified(10);
            sessionClaimValidatorStore.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(isVerifiedValidator);
        });
    }
    static init(config) {
        const normalisedConfig = normaliseEmailVerificationFeature(config);
        return {
            recipeID: EmailVerification.RECIPE_ID,
            authReact: (appInfo) => {
                EmailVerification.instance = new EmailVerification({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: EmailVerification.RECIPE_ID,
                });
                return EmailVerification.instance;
            },
            webJS: EmailVerificationWebJS__default.default.init({
                ...normalisedConfig,
                override: {
                    functions: (originalImpl, builder) => {
                        const functions = getFunctionOverrides(normalisedConfig.onHandleEvent);
                        builder.override(functions);
                        builder.override(normalisedConfig.override.functions);
                        return originalImpl;
                    },
                },
            }),
        };
    }
    static getInstanceOrThrow() {
        if (EmailVerification.instance === undefined) {
            let error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + genericComponentOverrideContext.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailVerification.instance;
    }
    async isEmailVerified(userContext) {
        return await this.webJSRecipe.isEmailVerified({
            userContext,
        });
    }
    getDefaultRedirectionURL = async (context) => {
        if (context.action === "VERIFY_EMAIL") {
            const verifyEmailPath = new NormalisedURLPath__default.default(DEFAULT_VERIFY_EMAIL_PATH);
            return `${this.config.appInfo.websiteBasePath.appendPath(verifyEmailPath).getAsStringDangerous()}?rid=${
                this.config.recipeId
            }`;
        } else {
            return "/";
        }
    };
    static reset() {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        EmailVerification.instance = undefined;
        return;
    }
}

exports.DEFAULT_VERIFY_EMAIL_PATH = DEFAULT_VERIFY_EMAIL_PATH;
exports.EmailVerification = EmailVerification;
exports.Provider = Provider;
exports.useContext = useContext;
