"use strict";

var EmailPasswordWebJS = require("supertokens-web-js/recipe/emailpassword");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var index = require("./authRecipe-shared2.js");
var types = require("./multifactorauth-shared.js");
var constants = require("./emailpassword-shared3.js");
var utils = require("./authRecipe-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var EmailPasswordWebJS__default = /*#__PURE__*/ _interopDefault(EmailPasswordWebJS);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

const getFunctionOverrides = (onHandleEvent) => (originalImp) => ({
    ...originalImp,
    submitNewPassword: async function (input) {
        const response = await originalImp.submitNewPassword({
            ...input,
            formFields: [input.formFields[0]],
        });
        if (response.status === "OK") {
            onHandleEvent({
                action: "PASSWORD_RESET_SUCCESSFUL",
                userContext: input.userContext,
            });
        }
        return response;
    },
    sendPasswordResetEmail: async function (input) {
        const response = await originalImp.sendPasswordResetEmail(input);
        if (response.status === "OK") {
            onHandleEvent({
                action: "RESET_PASSWORD_EMAIL_SENT",
                email: input.formFields.find(({ id }) => id === "email").value,
                userContext: input.userContext,
            });
        }
        return response;
    },
    signUp: async function (input) {
        let payloadBeforeCall;
        try {
            payloadBeforeCall = await types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                userContext: input.userContext,
            });
        } catch {
            // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
            payloadBeforeCall = undefined;
        }
        const response = await originalImp.signUp(input);
        if (response.status === "OK") {
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
                isNewRecipeUser: true,
                createdNewSession:
                    payloadAfterCall !== undefined &&
                    (payloadBeforeCall === undefined ||
                        payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                user: response.user,
                userContext: input.userContext,
            });
        }
        return response;
    },
    signIn: async function (input) {
        let payloadBeforeCall;
        try {
            payloadBeforeCall = await types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                userContext: input.userContext,
            });
        } catch {
            // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
            payloadBeforeCall = undefined;
        }
        const response = await originalImp.signIn(input);
        if (response.status === "OK") {
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
                isNewRecipeUser: false,
                createdNewSession:
                    payloadAfterCall !== undefined &&
                    (payloadBeforeCall === undefined ||
                        payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                user: response.user,
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
/*
 * defaultEmailValidator.
 */
async function defaultEmailValidator(value) {
    if (typeof value !== "string") {
        return "ERROR_EMAIL_NON_STRING";
    }
    value = value.trim();
    const defaultEmailValidatorRegexp =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // We check if the email syntax is correct
    // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
    // Regex from https://stackoverflow.com/a/46181/3867175
    if (value.match(defaultEmailValidatorRegexp) === null) {
        return "ERROR_EMAIL_INVALID";
    }
    return undefined;
}
/*
 * defaultPasswordValidator.
 * min 8 characters.
 * Contains lowercase, uppercase, and numbers.
 */
async function defaultPasswordValidator(value) {
    if (typeof value !== "string") {
        return "ERROR_PASSWORD_NON_STRING";
    }
    // length >= 8 && < 100
    // must have a number and a character
    // as per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
    if (value.length < 8) {
        return "ERROR_PASSWORD_TOO_SHORT";
    }
    if (value.length >= 100) {
        return "ERROR_PASSWORD_TOO_LONG";
    }
    if (value.match(/^.*[A-Za-z]+.*$/) === null) {
        return "ERROR_PASSWORD_NO_ALPHA";
    }
    if (value.match(/^.*[0-9]+.*$/) === null) {
        return "ERROR_PASSWORD_NO_NUM";
    }
    return undefined;
}
/*
 * defaultLoginPasswordValidator.
 * type string
 */
async function defaultLoginPasswordValidator(value) {
    if (typeof value !== "string") {
        return "ERROR_PASSWORD_NON_STRING";
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
function normaliseEmailPasswordConfig(config) {
    if (config === undefined) {
        config = {};
    }
    const signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature);
    const signUpPasswordField = signInAndUpFeature.signUpForm.formFields.find((field) => {
        return field.id === "password";
    });
    const signUpEmailField = signInAndUpFeature.signUpForm.formFields.find((field) => {
        return field.id === "email";
    });
    const resetPasswordUsingTokenFeature = normaliseResetPasswordUsingTokenFeature(
        signUpPasswordField.validate,
        signUpEmailField,
        config.resetPasswordUsingTokenFeature
    );
    const override = {
        functions: (originalImplementation) => originalImplementation,
        ...config.override,
    };
    return {
        ...utils.normaliseAuthRecipe(config),
        signInAndUpFeature,
        resetPasswordUsingTokenFeature,
        override,
    };
}
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    const signUpForm = normaliseSignUpFormFeatureConfig(config.signUpForm);
    /*
     * Default Sign In corresponds to computed Sign Up fields filtered by email and password only.
     * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
     * Exception made of the password validator which only verifies that the value is not empty for login
     * https://github.com/supertokens/supertokens-auth-react/issues/21
     */
    const defaultSignInFields = signUpForm.formFields.reduce((signInFieldsAccumulator, field) => {
        if (field.id === "email") {
            return [...signInFieldsAccumulator, field];
        }
        if (field.id === "password") {
            return [
                ...signInFieldsAccumulator,
                {
                    ...field,
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator,
                },
            ];
        }
        return signInFieldsAccumulator;
    }, []);
    const signInForm = normaliseSignInFormFeatureConfig(defaultSignInFields, config.signInForm);
    return {
        signUpForm,
        signInForm,
    };
}
function normaliseSignUpFormFeatureConfig(config) {
    if (config === undefined) {
        config = {};
    }
    const defaultFormFields = getDefaultFormFields();
    let userFormFields = [];
    if (config.formFields !== undefined) {
        userFormFields = config.formFields;
    }
    const formFields = mergeFormFields(defaultFormFields, userFormFields);
    const style = config.style !== undefined ? config.style : "";
    return {
        style,
        formFields,
    };
}
function normaliseSignInFormFeatureConfig(defaultFormFields, config) {
    if (config === undefined) {
        config = {};
    }
    let userFormFields = [];
    if (config.formFields !== undefined) {
        userFormFields = config.formFields
            // Filter on email and password only.
            .filter((field) => constants.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id))
            // Sign In fields are never optional.
            .map((field) => ({
                ...field,
                optional: false,
            }));
    }
    const formFields = mergeFormFields(defaultFormFields, userFormFields);
    const style = config.style !== undefined ? config.style : "";
    return {
        style,
        formFields,
    };
}
function getDefaultFormFields() {
    return [getDefaultEmailFormField(), getDefaultPasswordFormField()];
}
function getDefaultEmailFormField() {
    return {
        id: "email",
        label: "EMAIL_PASSWORD_EMAIL_LABEL",
        placeholder: "EMAIL_PASSWORD_EMAIL_PLACEHOLDER",
        validate: defaultEmailValidator,
        optional: false,
        autoComplete: "email",
    };
}
function getDefaultPasswordFormField() {
    return {
        id: "password",
        label: "EMAIL_PASSWORD_PASSWORD_LABEL",
        placeholder: "EMAIL_PASSWORD_PASSWORD_PLACEHOLDER",
        validate: defaultPasswordValidator,
        optional: false,
        autoComplete: "new-password",
    };
}
function normaliseResetPasswordUsingTokenFeature(signUpPasswordFieldValidate, signUpEmailField, config) {
    if (config === undefined) {
        config = {};
    }
    const disableDefaultUI = config.disableDefaultUI === true;
    const submitNewPasswordFormStyle =
        config.submitNewPasswordForm !== undefined && config.submitNewPasswordForm.style !== undefined
            ? config.submitNewPasswordForm.style
            : "";
    const submitNewPasswordForm = {
        style: submitNewPasswordFormStyle,
        formFields: [
            {
                id: "password",
                label: "EMAIL_PASSWORD_NEW_PASSWORD_LABEL",
                placeholder: "EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER",
                validate: signUpPasswordFieldValidate,
                optional: false,
                autoComplete: "new-password",
            },
            {
                id: "confirm-password",
                label: "EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL",
                placeholder: "EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER",
                validate: signUpPasswordFieldValidate,
                optional: false,
                autoComplete: "new-password",
            },
        ],
    };
    const enterEmailFormStyle =
        config.enterEmailForm !== undefined && config.enterEmailForm.style !== undefined
            ? config.enterEmailForm.style
            : "";
    const enterEmailForm = {
        style: enterEmailFormStyle,
        formFields: [
            {
                ...getDefaultEmailFormField(),
                validate: signUpEmailField.validate,
                placeholder: "",
                autofocus: true,
            },
        ],
    };
    return {
        disableDefaultUI,
        submitNewPasswordForm,
        enterEmailForm,
    };
}
/*
 * mergeFormFields by keeping the provided order, defaultFormFields or merged first, and unmerged userFormFields after.
 */
function mergeFormFields(defaultFormFields, userFormFields) {
    // Create a new array with default fields.
    const mergedFormFields = defaultFormFields;
    // Loop through user provided fields.
    for (let i = 0; i < userFormFields.length; i++) {
        const userField = userFormFields[i];
        let isNewField = true;
        // Loop through the merged fields array.
        for (let j = 0; j < mergedFormFields.length; j++) {
            const mergedField = mergedFormFields[j];
            // If id is equal, merge the fields
            if (userField.id === mergedField.id) {
                // Make sure that email and password are kept mandatory.
                let optional = mergedField.optional; // Init with default value.
                // If user provided value, overwrite.
                if (userField.optional !== undefined) {
                    optional = userField.optional;
                }
                // If "email" or "password", always mandatory.
                if (constants.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(userField.id)) {
                    optional = false;
                }
                // Merge.
                mergedFormFields[j] = {
                    ...mergedFormFields[j],
                    ...userField,
                    optional,
                };
                isNewField = false;
                break;
            }
        }
        // If new field, push to mergeFormFields.
        if (isNewField) {
            mergedFormFields.push({
                optional: false,
                placeholder: userField.label,
                validate: defaultValidate,
                ...userField,
            });
        }
    }
    return mergedFormFields.map((field) => getFormattedFormField(field));
}
function getFormattedFormField(field) {
    // Fields with the 'nonOptionalErrorMsg' property must have a valid message defined
    if (field.optional === false && field.nonOptionalErrorMsg === "") {
        throw new Error(`nonOptionalErrorMsg for field ${field.id} cannot be an empty string`);
    }
    return {
        ...field,
        validate: async (value) => {
            // Absent or not optional empty field
            if (value === "" && field.optional === false) {
                if (field.nonOptionalErrorMsg !== undefined) {
                    return field.nonOptionalErrorMsg;
                }
                return "ERROR_NON_OPTIONAL";
            }
            return await field.validate(value);
        },
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
/*
 * Class.
 */
class EmailPassword extends index.AuthRecipe {
    webJSRecipe;
    static instance;
    static RECIPE_ID = "emailpassword";
    recipeID = EmailPassword.RECIPE_ID;
    firstFactorIds = [types.FactorIds.EMAILPASSWORD];
    getFirstFactorsForAuthPage() {
        return this.firstFactorIds;
    }
    constructor(config, webJSRecipe = EmailPasswordWebJS__default.default) {
        super(config);
        this.webJSRecipe = webJSRecipe;
        this.recipeID = config.recipeId;
    }
    getDefaultRedirectionURL = async (context) => {
        if (context.action === "RESET_PASSWORD") {
            const resetPasswordPath = new NormalisedURLPath__default.default(constants.DEFAULT_RESET_PASSWORD_PATH);
            return `${this.config.appInfo.websiteBasePath.appendPath(resetPasswordPath).getAsStringDangerous()}?rid=${
                this.config.recipeId
            }`;
        }
        return this.getAuthRecipeDefaultRedirectionURL(context);
    };
    static init(config) {
        const normalisedConfig = normaliseEmailPasswordConfig(config);
        return {
            recipeID: EmailPassword.RECIPE_ID,
            authReact: (appInfo) => {
                EmailPassword.instance = new EmailPassword({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: EmailPassword.RECIPE_ID,
                });
                return EmailPassword.instance;
            },
            webJS: EmailPasswordWebJS__default.default.init({
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
        if (EmailPassword.instance === undefined) {
            let error =
                "No instance of EmailPassword found. Make sure to call the EmailPassword.init method." +
                "See https://supertokens.io/docs/emailpassword/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + genericComponentOverrideContext.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailPassword.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        EmailPassword.instance = undefined;
        return;
    }
}

exports.EmailPassword = EmailPassword;
exports.defaultValidate = defaultValidate;
