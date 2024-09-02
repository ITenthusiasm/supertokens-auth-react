"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var PasswordlessWebJS = require("supertokens-web-js/recipe/passwordless");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var jsxRuntime = require("react/jsx-runtime");
var index = require("./authRecipe-shared2.js");
var recipe = require("./multifactorauth-shared2.js");
var types = require("./multifactorauth-shared.js");
var utils = require("./authRecipe-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var PasswordlessWebJS__default = /*#__PURE__*/ _interopDefault(PasswordlessWebJS);

const [useContext, Provider] = genericComponentOverrideContext.createGenericComponentsOverrideContext();

const OTPEmailIcon = () =>
    jsxRuntime.jsxs("svg", {
        width: "17",
        height: "15",
        viewBox: "0 0 17 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            jsxRuntime.jsx("path", {
                id: "image 414 (Traced)",
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2.01513 0.0546421C1.19571 0.195435 0.393224 0.877322 0.143564 1.64496C0.0564841 1.9127 -0.00197242 1.84636 0.659082 2.22993C0.91105 2.37612 1.64082 2.80042 2.28084 3.17276C2.92086 3.54514 3.96809 4.1544 4.60811 4.52674C5.24813 4.89905 6.37321 5.55428 7.10833 5.98278C7.84346 6.41131 8.46401 6.7689 8.48736 6.77743C8.52111 6.78982 10.4367 5.69077 12.6253 4.40341C12.7865 4.30852 13.8173 3.70613 14.9159 3.06475L16.9133 1.89856L16.903 1.78079C16.8974 1.71603 16.8178 1.51568 16.7262 1.3356C16.3776 0.650318 15.6775 0.156143 14.8905 0.039982C14.4716 -0.0218423 2.38016 -0.00809191 2.01513 0.0546421ZM6.60933e-06 6.62054C0.000739608 10.251 -0.00834948 10.1158 0.27063 10.655C0.659815 11.4073 1.39721 11.8833 2.30408 11.9675C2.77169 12.0109 14.2345 12.0108 14.7024 11.9673C15.3604 11.9062 15.8152 11.7008 16.2911 11.2498C16.5236 11.0295 16.619 10.9066 16.7395 10.6725C17.0173 10.133 17.0065 10.3025 16.996 6.65494L16.9866 3.40211L15.8322 4.07294C15.1972 4.44186 13.9767 5.15156 13.1201 5.65004C11.2459 6.74049 10.2603 7.31342 9.46206 7.77628C8.76656 8.17962 8.59368 8.23389 8.2745 8.14908C8.14446 8.11454 7.64668 7.84559 6.81451 7.36034C4.15032 5.80665 0.097862 3.44588 0.0268711 3.40617C0.0117346 3.39774 -0.00032324 4.84419 6.60933e-06 6.62054Z",
                fill: "url(#paint0_linear_4445_310)",
            }),
            jsxRuntime.jsx("defs", {
                children: jsxRuntime.jsxs("linearGradient", {
                    id: "paint0_linear_4445_310",
                    x1: "8.5",
                    y1: "0",
                    x2: "8.5",
                    y2: "12",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        jsxRuntime.jsx("stop", { stopColor: "#5FACFF" }),
                        jsxRuntime.jsx("stop", { offset: "1", stopColor: "#1686FF" }),
                    ],
                }),
            }),
        ],
    });

const OTPSMSIcon = () =>
    jsxRuntime.jsxs("svg", {
        width: "17",
        height: "15",
        viewBox: "0 0 17 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            jsxRuntime.jsx("path", {
                id: "image 412 (Traced)",
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2.23143 0.0484105C1.11677 0.26606 0.230705 1.14148 0.0548812 2.19882C0.0207171 2.40417 -0.000319148 3.89779 3.66265e-06 6.09367C0.000595481 10.0175 0.00446909 10.0713 0.330507 10.706C0.544477 11.1223 1.03692 11.597 1.49058 11.8243C1.9253 12.042 2.4213 12.1389 3.10571 12.14L3.65718 12.1409L3.65739 13.3581C3.65755 14.4585 3.66729 14.5903 3.75859 14.733C3.88347 14.9281 4.1338 15.0332 4.37209 14.9906C4.50192 14.9674 5.03536 14.5737 6.32332 13.5507L8.09582 12.1427L11.2701 12.1409C14.8062 12.1389 14.8922 12.1322 15.5441 11.8059C15.9514 11.602 16.4058 11.1868 16.6406 10.8041C16.7198 10.6748 16.8331 10.3886 16.8923 10.1681C16.9951 9.78536 17 9.6 17 6.0949C17 3.67866 16.98 2.31864 16.9417 2.11857C16.7993 1.37604 16.1965 0.620747 15.4792 0.286303C15.2652 0.186472 14.9464 0.0801328 14.7708 0.049999C14.3886 -0.0156495 2.5671 -0.0171356 2.23143 0.0484105ZM5.24433 4.97226C5.37743 5.00736 5.55471 5.1197 5.70901 5.26668C6.20818 5.74216 6.20834 6.40218 5.70933 6.86336C5.19445 7.3393 4.53167 7.33945 4.03228 6.86382C3.54451 6.3992 3.53069 5.75907 3.99822 5.28943C4.33561 4.95053 4.75602 4.84352 5.24433 4.97226ZM8.87594 4.96544C9.55686 5.14589 9.9071 5.95945 9.57246 6.58313C9.13161 7.40469 7.91806 7.41591 7.45342 6.60271C7.32215 6.37302 7.3066 6.29861 7.32494 5.98907C7.34211 5.69977 7.37455 5.59794 7.50653 5.41904C7.804 5.01592 8.36509 4.83005 8.87594 4.96544ZM12.7023 5.05815C13.4409 5.4257 13.5612 6.36097 12.94 6.90635C12.6706 7.14291 12.3468 7.24567 12.0095 7.20164C11.0115 7.07132 10.59 5.99614 11.2623 5.29563C11.6485 4.89313 12.1909 4.80365 12.7023 5.05815Z",
                fill: "url(#paint0_linear_4445_316)",
            }),
            jsxRuntime.jsx("defs", {
                children: jsxRuntime.jsxs("linearGradient", {
                    id: "paint0_linear_4445_316",
                    x1: "8.5",
                    y1: "0",
                    x2: "8.5",
                    y2: "15",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        jsxRuntime.jsx("stop", { stopColor: "#5FACFF" }),
                        jsxRuntime.jsx("stop", { offset: "1", stopColor: "#1585FF" }),
                    ],
                }),
            }),
        ],
    });

const getFunctionOverrides = (onHandleEvent) => (originalImp) => ({
    ...originalImp,
    createCode: async function (input) {
        const response = await originalImp.createCode(input);
        if (response.status === "OK") {
            onHandleEvent({
                action: "PASSWORDLESS_CODE_SENT",
                isResend: false,
            });
        }
        return response;
    },
    resendCode: async function (input) {
        const response = await originalImp.resendCode(input);
        if (response.status === "RESTART_FLOW_ERROR") {
            onHandleEvent({
                action: "PASSWORDLESS_RESTART_FLOW",
            });
        } else if (response.status === "OK") {
            onHandleEvent({
                action: "PASSWORDLESS_CODE_SENT",
                isResend: true,
            });
        }
        return response;
    },
    consumeCode: async function (input) {
        let payloadBeforeCall;
        try {
            payloadBeforeCall = await types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                userContext: input.userContext,
            });
        } catch {
            // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
            payloadBeforeCall = undefined;
        }
        const response = await originalImp.consumeCode(input);
        if (response.status === "RESTART_FLOW_ERROR") {
            onHandleEvent({
                action: "PASSWORDLESS_RESTART_FLOW",
            });
        } else if (response.status === "OK") {
            let payloadAfterCall;
            try {
                payloadAfterCall = await types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                    userContext: input.userContext,
                });
            } catch {
                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                payloadAfterCall = undefined;
            }
            onHandleEvent({
                action: "SUCCESS",
                isNewRecipeUser: response.createdNewRecipeUser,
                user: response.user,
                createdNewSession:
                    payloadAfterCall !== undefined &&
                    (payloadBeforeCall === undefined ||
                        payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
            });
        }
        return response;
    },
    setLoginAttemptInfo: async function (input) {
        return originalImp.setLoginAttemptInfo({
            ...input,
            attemptInfo: {
                ...input.attemptInfo,
                ...input.userContext.additionalAttemptInfo,
            },
        });
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
function defaultEmailValidator(value) {
    if (typeof value !== "string") {
        return "GENERAL_ERROR_EMAIL_NON_STRING";
    }
    value = value.trim();
    const defaultEmailValidatorRegexp =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // We check if the email syntax is correct
    // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
    // Regex from https://stackoverflow.com/a/46181/3867175
    if (value.match(defaultEmailValidatorRegexp) === null) {
        return "GENERAL_ERROR_EMAIL_INVALID";
    }
    return undefined;
}
async function userInputCodeValidate(value) {
    if (typeof value !== "string") {
        return "GENERAL_ERROR_OTP_NON_STRING";
    }
    if (value.length === 0) {
        return "GENERAL_ERROR_OTP_EMPTY";
    }
    return undefined;
}
/*
 * defaultValidate
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function defaultValidate(_) {
    return undefined;
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
function normalisePasswordlessConfig(config) {
    if (config === undefined) {
        throw new Error("Passwordless config should not be empty");
    }
    if (!["EMAIL", "PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod)) {
        throw new Error("Please pass one of 'PHONE', 'EMAIL' or 'EMAIL_OR_PHONE' as the contactMethod");
    }
    const signInUpFeature = normalizeSignInUpFeatureConfig(config.signInUpFeature, config);
    const override = {
        functions: (originalImplementation) => originalImplementation,
        ...config.override,
    };
    let validateEmailAddress = defaultEmailValidator;
    if (
        (config.contactMethod === "EMAIL" || config.contactMethod === "EMAIL_OR_PHONE") &&
        config.validateEmailAddress !== undefined
    ) {
        validateEmailAddress = config.validateEmailAddress;
    }
    let validatePhoneNumber = undefined;
    if (
        (config.contactMethod === "PHONE" || config.contactMethod === "EMAIL_OR_PHONE") &&
        config.validatePhoneNumber !== undefined
    ) {
        validatePhoneNumber = config.validatePhoneNumber;
    }
    return {
        ...utils.normaliseAuthRecipe(config),
        validateEmailAddress,
        validatePhoneNumber,
        signInUpFeature,
        linkClickedScreenFeature: normalisePasswordlessBaseConfig(config.linkClickedScreenFeature),
        mfaFeature: normalisePasswordlessBaseConfig(config.mfaFeature),
        contactMethod: config.contactMethod,
        override,
    };
}
function normalizeSignInUpFeatureConfig(signInUpInput, config) {
    if (signInUpInput?.resendEmailOrSMSGapInSeconds !== undefined && signInUpInput.resendEmailOrSMSGapInSeconds <= 0) {
        throw new Error("Please pass a positive number as resendEmailOrSMSGapInSeconds");
    }
    return {
        ...signInUpInput,
        resendEmailOrSMSGapInSeconds:
            signInUpInput?.resendEmailOrSMSGapInSeconds === undefined ? 15 : signInUpInput.resendEmailOrSMSGapInSeconds,
        emailOrPhoneFormStyle:
            signInUpInput?.emailOrPhoneFormStyle !== undefined ? signInUpInput.emailOrPhoneFormStyle : "",
        linkSentScreenStyle: signInUpInput?.linkSentScreenStyle !== undefined ? signInUpInput.linkSentScreenStyle : "",
        userInputCodeFormStyle:
            signInUpInput?.userInputCodeFormStyle !== undefined ? signInUpInput.userInputCodeFormStyle : "",
        defaultCountry:
            ["PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod) &&
            signInUpInput !== undefined &&
            "defaultCountry" in signInUpInput
                ? signInUpInput.defaultCountry
                : undefined,
        defaultToEmail:
            signInUpInput !== undefined &&
            "defaultToEmail" in signInUpInput &&
            signInUpInput.defaultToEmail !== undefined
                ? signInUpInput.defaultToEmail
                : true,
    };
}
function normalisePasswordlessBaseConfig(config) {
    const style = config && config.style !== undefined ? config.style : "";
    return {
        ...config,
        style,
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
const otpPhoneFactor = {
    id: types.FactorIds.OTP_PHONE,
    name: "PWLESS_MFA_OTP_PHONE_NAME",
    description: "PWLESS_MFA_OTP_PHONE_DESCRIPTION",
    path: "/mfa/otp-phone",
    logo: OTPSMSIcon,
};
const otpEmailFactor = {
    id: types.FactorIds.OTP_EMAIL,
    name: "PWLESS_MFA_OTP_EMAIL_NAME",
    description: "PWLESS_MFA_OTP_EMAIL_DESCRIPTION",
    path: "/mfa/otp-email",
    logo: OTPEmailIcon,
};
/*
 * Class.
 */
class Passwordless extends index.AuthRecipe {
    webJSRecipe;
    static instance;
    static RECIPE_ID = "passwordless";
    recipeID = Passwordless.RECIPE_ID;
    firstFactorIds = [
        types.FactorIds.OTP_EMAIL,
        types.FactorIds.OTP_PHONE,
        types.FactorIds.LINK_EMAIL,
        types.FactorIds.LINK_PHONE,
    ];
    getFirstFactorsForAuthPage() {
        if (this.config.contactMethod === "EMAIL") {
            return [types.FactorIds.OTP_EMAIL, types.FactorIds.LINK_EMAIL];
        }
        if (this.config.contactMethod === "PHONE") {
            return [types.FactorIds.OTP_PHONE, types.FactorIds.LINK_PHONE];
        }
        return this.firstFactorIds;
    }
    constructor(config, webJSRecipe = PasswordlessWebJS__default.default) {
        super(config);
        this.webJSRecipe = webJSRecipe;
        this.recipeID = config.recipeId;
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            const mfa = recipe.MultiFactorAuth.getInstance();
            if (mfa !== undefined) {
                mfa.addMFAFactors([otpPhoneFactor, otpEmailFactor]);
            }
        });
    }
    getDefaultRedirectionURL = async (context) => {
        return this.getAuthRecipeDefaultRedirectionURL(context);
    };
    static init(config) {
        const normalisedConfig = normalisePasswordlessConfig(config);
        return {
            recipeID: Passwordless.RECIPE_ID,
            authReact: (appInfo) => {
                Passwordless.instance = new Passwordless({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: Passwordless.RECIPE_ID,
                });
                return Passwordless.instance;
            },
            webJS: PasswordlessWebJS__default.default.init({
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
        if (Passwordless.instance === undefined) {
            let error =
                "No instance of Passwordless found. Make sure to call the Passwordless.init method." +
                "See https://supertokens.io/docs/passwordless/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + genericComponentOverrideContext.SSR_ERROR;
            }
            throw Error(error);
        }
        return Passwordless.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Passwordless.instance = undefined;
        return;
    }
}

exports.Passwordless = Passwordless;
exports.Provider = Provider;
exports.defaultValidate = defaultValidate;
exports.useContext = useContext;
exports.userInputCodeValidate = userInputCodeValidate;
