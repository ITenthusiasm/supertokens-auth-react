"use strict";

var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
require("./multifactorauth.js");
var componentOverrideContext = require("./emailpassword-shared.js");
var React = require("react");
var translations = require("./emailverification-shared2.js");
var translationContext = require("./translationContext.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
var formBase = require("./emailpassword-shared4.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var authCompWrapper = require("./authCompWrapper.js");
var emailverification = require("./emailverification.js");
var recipe = require("./emailverification-shared.js");
var session = require("./session.js");
var types = require("./multifactorauth-shared.js");
var STGeneralError$1 = require("supertokens-web-js/lib/build/error");
var constants = require("./emailpassword-shared3.js");
var recipe$1 = require("./emailpassword-shared2.js");
require("supertokens-web-js/utils/windowHandler");
require("react-dom");
require("./multitenancy-shared.js");
require("./multifactorauth-shared2.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");
require("./authRecipe-shared.js");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils/normalisedURLDomain");
require("./multifactorauth-shared3.js");
require("supertokens-web-js/recipe/emailverification");
require("supertokens-web-js/recipe/session");
require("./session-shared.js");
require("supertokens-web-js/recipe/emailpassword");
require("./authRecipe-shared2.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== "default") {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                    n,
                    k,
                    d.get
                        ? d
                        : {
                              enumerable: true,
                              get: function () {
                                  return e[k];
                              },
                          }
                );
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);
var React__namespace = /*#__PURE__*/ _interopNamespace(React);
var STGeneralError__default = /*#__PURE__*/ _interopDefault(STGeneralError);
var STGeneralError__default$1 = /*#__PURE__*/ _interopDefault(STGeneralError$1);

const ThemeBase = ({ children, userStyles, loadDefaultFont }) => {
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            children,
            loadDefaultFont &&
                jsxRuntime.jsx("link", {
                    href: "//fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700",
                    rel: "stylesheet",
                    type: "text/css",
                }),
            jsxRuntime.jsxs("style", { children: [translations.styles, userStyles.join("\n")] }),
        ],
    });
};

/*
 * Component.
 */
function BackToSignInButton({ onClick }) {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsxs("div", {
        "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
        onClick: onClick,
        children: [
            jsxRuntime.jsx(arrowLeftIcon.ArrowLeftIcon, { color: "rgb(var(--palette-secondaryText))" }),
            t("EMAIL_PASSWORD_RESET_SIGN_IN_LINK"),
        ],
    });
}

const EmailPasswordResetPasswordEmail = (props) => {
    const t = translationContext.useTranslation();
    const userContext = uiEntry.useUserContext();
    const [status, setStatus] = React.useState("READY");
    const [emailFieldValue, setEmailFieldValue] = React.useState("");
    const onSuccess = () => {
        setStatus("SENT");
    };
    const resend = () => {
        setStatus("READY");
    };
    const { formFields } = props;
    const emailSuccessText =
        t("EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL") +
        (emailFieldValue !== undefined && emailFieldValue.length > 0
            ? emailFieldValue
            : t("EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL")) +
        t("EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL");
    if (status === "SENT") {
        return jsxRuntime.jsx("div", {
            "data-supertokens": "container",
            children: jsxRuntime.jsxs("div", {
                "data-supertokens": "row",
                children: [
                    jsxRuntime.jsxs("div", {
                        "data-supertokens": "primaryText enterEmailSuccessMessage",
                        children: [
                            emailSuccessText,
                            jsxRuntime.jsx("span", {
                                "data-supertokens": "link resendEmailLink",
                                onClick: resend,
                                children: t("EMAIL_PASSWORD_RESET_RESEND_LINK"),
                            }),
                        ],
                    }),
                    jsxRuntime.jsx(BackToSignInButton, { onClick: props.onBackButtonClicked }),
                ],
            }),
        });
    }
    // Otherwise, return Form.
    return jsxRuntime.jsx("div", {
        "data-supertokens": "container resetPasswordEmailForm",
        children: jsxRuntime.jsxs("div", {
            "data-supertokens": "row",
            children: [
                jsxRuntime.jsxs("div", {
                    "data-supertokens": "headerTitle withBackButton",
                    children: [
                        jsxRuntime.jsx(uiEntry.BackButton, { onClick: props.onBackButtonClicked }),
                        t("EMAIL_PASSWORD_RESET_HEADER_TITLE"),
                        jsxRuntime.jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                    ],
                }),
                jsxRuntime.jsx("div", {
                    "data-supertokens": "headerSubtitle secondaryText",
                    children: t("EMAIL_PASSWORD_RESET_HEADER_SUBTITLE"),
                }),
                props.error !== undefined && jsxRuntime.jsx(uiEntry.GeneralError, { error: props.error }),
                jsxRuntime.jsx(formBase.FormBase, {
                    clearError: props.clearError,
                    onError: props.onError,
                    formFields: formFields,
                    buttonLabel: "EMAIL_PASSWORD_RESET_SEND_BTN",
                    onSuccess: onSuccess,
                    callAPI: async (formFields) => {
                        const validationErrors = await genericComponentOverrideContext.validateForm(
                            formFields,
                            props.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields
                        );
                        if (validationErrors.length > 0) {
                            return {
                                status: "FIELD_ERROR",
                                formFields: validationErrors,
                            };
                        }
                        const emailField = formFields.find((field) => {
                            return field.id === "email";
                        });
                        if (emailField !== undefined) {
                            setEmailFieldValue(emailField.value);
                        }
                        const resp = await props.recipeImplementation.sendPasswordResetEmail({
                            formFields,
                            userContext,
                        });
                        if (resp.status === "PASSWORD_RESET_NOT_ALLOWED") {
                            return {
                                status: "FIELD_ERROR",
                                formFields: [{ id: "email", error: resp.reason }],
                            };
                        }
                        return resp;
                    },
                    showLabels: true,
                    validateOnBlur: true,
                }),
            ],
        }),
    });
};
const ResetPasswordEmail = uiEntry.withOverride("EmailPasswordResetPasswordEmail", EmailPasswordResetPasswordEmail);

const EmailPasswordSubmitNewPassword = (props) => {
    const t = translationContext.useTranslation();
    const userContext = uiEntry.useUserContext();
    const [status, setStatus] = React.useState("READY");
    const onSuccess = () => {
        setStatus("SUCCESS");
    };
    const { formFields, onSignInClicked } = props;
    if (status === "SUCCESS") {
        return jsxRuntime.jsx("div", {
            "data-supertokens": "container",
            children: jsxRuntime.jsxs("div", {
                "data-supertokens": "row",
                children: [
                    jsxRuntime.jsx("div", {
                        "data-supertokens": "headerTitle",
                        children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE"),
                    }),
                    jsxRuntime.jsx(
                        formBase.FormRow,
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    jsxRuntime.jsx("div", {
                                        "data-supertokens": "primaryText submitNewPasswordSuccessMessage",
                                        children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC"),
                                    }),
                                    jsxRuntime.jsx(formBase.Button, {
                                        disabled: false,
                                        isLoading: false,
                                        type: "button",
                                        onClick: onSignInClicked,
                                        label: "EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN",
                                    }),
                                ],
                            }),
                        },
                        "form-button"
                    ),
                ],
            }),
        });
    }
    return jsxRuntime.jsx("div", {
        "data-supertokens": "container resetPasswordPasswordForm",
        children: jsxRuntime.jsxs("div", {
            "data-supertokens": "row",
            children: [
                jsxRuntime.jsx("div", {
                    "data-supertokens": "headerTitle",
                    children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE"),
                }),
                jsxRuntime.jsx("div", {
                    "data-supertokens": "headerSubtitle secondaryText",
                    children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE"),
                }),
                props.error !== undefined && jsxRuntime.jsx(uiEntry.GeneralError, { error: props.error }),
                jsxRuntime.jsx(formBase.FormBase, {
                    formFields: formFields,
                    clearError: props.clearError,
                    onError: props.onError,
                    buttonLabel: "EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN",
                    onSuccess: onSuccess,
                    validateOnBlur: true,
                    callAPI: async (fields) => {
                        const validationErrors = await genericComponentOverrideContext.validateForm(
                            fields,
                            props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.formFields
                        );
                        if (validationErrors.length > 0) {
                            return {
                                status: "FIELD_ERROR",
                                formFields: validationErrors,
                            };
                        }
                        // Verify that both passwords match.
                        if (fields[0].value !== fields[1].value) {
                            return {
                                status: "FIELD_ERROR",
                                formFields: [
                                    {
                                        id: fields[1].id,
                                        error: "ERROR_CONFIRM_PASSWORD_NO_MATCH",
                                    },
                                ],
                            };
                        }
                        const response = await props.recipeImplementation.submitNewPassword({
                            formFields: fields,
                            userContext,
                        });
                        if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
                            throw new STGeneralError__default.default(
                                "EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR"
                            );
                        }
                        return response.status === "FIELD_ERROR"
                            ? response
                            : {
                                  status: "OK",
                              };
                    },
                    showLabels: true,
                }),
            ],
        }),
    });
};
const SubmitNewPassword = uiEntry.withOverride("EmailPasswordSubmitNewPassword", EmailPasswordSubmitNewPassword);

/*
 * Component.
 */
function ResetPasswordUsingTokenTheme(props) {
    /*
     * Render.
     */
    // If no token, return SubmitNewPassword.
    if (props.submitNewPasswordForm !== undefined) {
        return jsxRuntime.jsx(SubmitNewPassword, { ...props.submitNewPasswordForm });
    }
    // Otherwise, return EnterEmail.
    return jsxRuntime.jsx(ResetPasswordEmail, { ...props.enterEmailForm });
}
function ResetPasswordUsingTokenThemeWrapper(props) {
    const rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    const hasFont = uiEntry.hasFontDefined(rootStyle) || uiEntry.hasFontDefined(props.config.recipeRootStyle);
    const userStyles = props.submitNewPasswordForm
        ? props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.style
        : props.config.resetPasswordUsingTokenFeature.enterEmailForm.style;
    return jsxRuntime.jsx(uiEntry.UserContextWrapper, {
        userContext: props.userContext,
        children: jsxRuntime.jsx(ThemeBase, {
            loadDefaultFont: !hasFont,
            userStyles: [rootStyle, props.config.recipeRootStyle, userStyles],
            children: jsxRuntime.jsx(ResetPasswordUsingTokenTheme, { ...props }),
        }),
    });
}

const defaultTranslationsEmailPassword = {
    en: {
        ...uiEntry.defaultTranslationsCommon.en,
        ...translations.defaultTranslationsEmailVerification.en,
        EMAIL_PASSWORD_EMAIL_LABEL: "Email",
        EMAIL_PASSWORD_EMAIL_PLACEHOLDER: "Email address",
        EMAIL_PASSWORD_PASSWORD_LABEL: "Password",
        EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: "Password",
        EMAIL_PASSWORD_SIGN_IN_FORGOT_PW_LINK: "Forgot password?",
        EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: "SIGN IN",
        EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR: "Incorrect email and password combination",
        EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN: "SIGN UP",
        EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS: "This email already exists. Please sign in instead",
        EMAIL_PASSWORD_RESET_HEADER_TITLE: "Reset your password",
        EMAIL_PASSWORD_RESET_HEADER_SUBTITLE: "We will send you an email to reset your password",
        EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL: "your account",
        EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL: "A password reset email has been sent to ",
        EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL: ", if it exists in our system. ",
        EMAIL_PASSWORD_RESET_RESEND_LINK: "Resend or change email",
        EMAIL_PASSWORD_RESET_SEND_BTN: "Email me",
        EMAIL_PASSWORD_RESET_SIGN_IN_LINK: "Sign In",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE: "Success!",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC: "Your password has been updated successfully",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN: "SIGN IN",
        EMAIL_PASSWORD_NEW_PASSWORD_LABEL: "New password",
        EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER: "New password",
        EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL: "Confirm password",
        EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER: "Confirm your password",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE: "Change your password",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE: "Enter a new password below to change your password",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN: "CHANGE PASSWORD",
        EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR: "Invalid password reset token",
        ERROR_EMAIL_NON_STRING: "Email must be of type string",
        ERROR_EMAIL_INVALID: "Email is invalid",
        ERROR_PASSWORD_NON_STRING: "Password must be of type string",
        ERROR_PASSWORD_TOO_SHORT: "Password must contain at least 8 characters, including a number",
        ERROR_PASSWORD_TOO_LONG: "Password's length must be lesser than 100 characters",
        ERROR_PASSWORD_NO_ALPHA: "Password must contain at least one alphabet",
        ERROR_PASSWORD_NO_NUM: "Password must contain at least one number",
        ERROR_CONFIRM_PASSWORD_NO_MATCH: "Confirmation password doesn't match",
        ERROR_NON_OPTIONAL: "Field is not optional",
        /*
         * The following are error messages from our backend SDK.
         * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
         * They are shown as is by default (setting the value to undefined will display the raw translation key)
         */
        "This email already exists. Please sign in instead.": undefined,
        "Field is not optional": undefined,
        "Password must contain at least 8 characters, including a number": undefined,
        "Password's length must be lesser than 100 characters": undefined,
        "Password must contain at least one alphabet": undefined,
        "Password must contain at least one number": undefined,
        "Email is invalid": undefined,
        "Reset password link was not created because of account take over risk. Please contact support. (ERR_CODE_001)":
            undefined,
        "Cannot sign up due to security reasons. Please try logging in, use a different login method or contact support. (ERR_CODE_007)":
            undefined,
        "Cannot sign in due to security reasons. Please try resetting your password, use a different login method or contact support. (ERR_CODE_008)":
            undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_009)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_010)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_011)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_012)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_013)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_014)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_015)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_016)": undefined,
    },
};

const ResetPasswordUsingToken$1 = (props) => {
    const token = genericComponentOverrideContext.getQueryParams("token");
    let userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const [error, setError] = React__namespace.useState();
    const enterEmailFormFeature = props.recipe.config.resetPasswordUsingTokenFeature.enterEmailForm;
    const submitNewPasswordFormFeature = props.recipe.config.resetPasswordUsingTokenFeature.submitNewPasswordForm;
    const submitNewPasswordForm =
        token === undefined || token === null
            ? undefined
            : {
                  error: error,
                  onError: (error) => setError(error),
                  clearError: () => setError(undefined),
                  styleFromInit: submitNewPasswordFormFeature.style,
                  formFields: submitNewPasswordFormFeature.formFields,
                  recipeImplementation: props.recipe.webJSRecipe,
                  config: props.recipe.config,
                  onSignInClicked: () => {
                      void genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                          show: "signin",
                          navigate: props.navigate,
                          redirectBack: false,
                          userContext,
                      });
                  },
                  token: token,
              };
    const enterEmailForm = {
        onBackButtonClicked: () =>
            genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                show: "signin",
                navigate: props.navigate,
                redirectBack: false,
                userContext,
            }),
        error: error,
        onError: (error) => setError(error),
        clearError: () => setError(undefined),
        styleFromInit: enterEmailFormFeature.style,
        formFields: enterEmailFormFeature.formFields,
        recipeImplementation: props.recipe.webJSRecipe,
        config: props.recipe.config,
    };
    const childProps = {
        config: props.recipe.config,
        submitNewPasswordForm: submitNewPasswordForm,
        enterEmailForm: enterEmailForm,
    };
    const recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(uiEntry.ComponentOverrideContext.Provider, {
        value: recipeComponentOverrides,
        children: jsxRuntime.jsx(uiEntry.FeatureWrapper, {
            useShadowDom: genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().useShadowDom,
            defaultStore: defaultTranslationsEmailPassword,
            children: jsxRuntime.jsxs(React.Fragment, {
                children: [
                    props.children === undefined &&
                        jsxRuntime.jsx(ResetPasswordUsingTokenThemeWrapper, { ...childProps }),
                    props.children &&
                        React__namespace.Children.map(props.children, (child) => {
                            if (React__namespace.isValidElement(child)) {
                                return React__namespace.cloneElement(child, childProps);
                            }
                            return child;
                        }),
                ],
            }),
        }),
    });
};

const SignInForm = uiEntry.withOverride("EmailPasswordSignInForm", function EmailPasswordSignInForm(props) {
    const userContext = uiEntry.useUserContext();
    return jsxRuntime.jsx(formBase.FormBase, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        onFetchError: props.onFetchError,
        buttonLabel: "EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN",
        onSuccess: props.onSuccess,
        callAPI: async (formFields) => {
            const validationErrors = await genericComponentOverrideContext.validateForm(
                formFields,
                props.config.signInAndUpFeature.signInForm.formFields
            );
            if (validationErrors.length > 0) {
                return {
                    status: "FIELD_ERROR",
                    formFields: validationErrors,
                };
            }
            const response = await props.recipeImplementation.signIn({
                formFields,
                userContext,
            });
            if (response.status === "WRONG_CREDENTIALS_ERROR") {
                throw new STGeneralError__default.default("EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR");
            } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
                throw new STGeneralError__default.default(response.reason);
            } else {
                return response;
            }
        },
        validateOnBlur: false,
        showLabels: true,
        footer: props.footer,
    });
});
function SignInTheme(props) {
    const rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    const hasFont = uiEntry.hasFontDefined(rootStyle) || uiEntry.hasFontDefined(props.config.recipeRootStyle);
    const activeStyle = props.config.signInAndUpFeature.signInForm.style;
    return jsxRuntime.jsx(uiEntry.UserContextWrapper, {
        userContext: props.userContext,
        children: jsxRuntime.jsx(ThemeBase, {
            loadDefaultFont: !hasFont,
            userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle],
            children: jsxRuntime.jsx(SignInForm, { ...props }),
        }),
    });
}

function useChildProps$1(recipe$1, error, onError, clearError, userContext, navigate) {
    const session$1 = uiEntry.useSessionContext();
    const recipeImplementation = React.useMemo(
        () => getModifiedRecipeImplementation$1(recipe$1.webJSRecipe),
        [recipe$1]
    );
    const rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    const t = translationContext.useTranslation();
    const onSignInSuccess = React.useCallback(async () => {
        let payloadAfterCall;
        try {
            payloadAfterCall = await types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                userContext,
            });
        } catch {
            payloadAfterCall = undefined;
        }
        return types.Session.getInstanceOrThrow()
            .validateGlobalClaimsAndHandleSuccessRedirection(
                {
                    action: "SUCCESS",
                    createdNewUser: false,
                    isNewRecipeUser: false,
                    newSessionCreated:
                        session$1.loading ||
                        !session$1.doesSessionExist ||
                        (payloadAfterCall !== undefined &&
                            session$1.accessTokenPayload.sessionHandle !== payloadAfterCall.sessionHandle),
                    recipeId: recipe$1.recipeID,
                },
                recipe$1.recipeID,
                genericComponentOverrideContext.getRedirectToPathFromURL(),
                userContext,
                navigate
            )
            .catch(rethrowInRender);
    }, [recipe$1, userContext, navigate]);
    return React.useMemo(() => {
        const onForgotPasswordClick = () =>
            recipe$1.redirect({ action: "RESET_PASSWORD" }, navigate, undefined, userContext);
        const signInAndUpFeature = recipe$1.config.signInAndUpFeature;
        const signInFeature = signInAndUpFeature.signInForm;
        const formFields = signInFeature.formFields.map((f) =>
            f.id !== "password"
                ? f
                : {
                      ...f,
                      labelComponent: jsxRuntime.jsxs("div", {
                          "data-supertokens": "formLabelWithLinkWrapper",
                          children: [
                              jsxRuntime.jsx(formBase.Label, {
                                  value: f.label,
                                  "data-supertokens": "passwordInputLabel",
                              }),
                              jsxRuntime.jsx("a", {
                                  onClick: onForgotPasswordClick,
                                  "data-supertokens": "link linkButton formLabelLinkBtn forgotPasswordLink",
                                  children: t("EMAIL_PASSWORD_SIGN_IN_FORGOT_PW_LINK"),
                              }),
                          ],
                      }),
                  }
        );
        return {
            recipeImplementation,
            config: recipe$1.config,
            styleFromInit: signInFeature.style,
            formFields: formFields,
            error: error,
            clearError,
            onError,
            onFetchError: async (err) => {
                if (err.status === types.Session.getInstanceOrThrow().config.invalidClaimStatusCode) {
                    const invalidClaims = await session.getInvalidClaimsFromResponse({ response: err, userContext });
                    if (invalidClaims.some((i) => i.id === emailverification.EmailVerificationClaim.id)) {
                        try {
                            // it's OK if this throws,
                            const evInstance = recipe.EmailVerification.getInstanceOrThrow();
                            await evInstance.redirect(
                                {
                                    action: "VERIFY_EMAIL",
                                },
                                navigate,
                                undefined,
                                userContext
                            );
                            return;
                        } catch {
                            // If we couldn't redirect to EV we fall back to showing the something went wrong error
                        }
                    }
                }
                onError("SOMETHING_WENT_WRONG_ERROR");
            },
            onSuccess: onSignInSuccess,
            onForgotPasswordClick: onForgotPasswordClick,
            userContext,
        };
    }, [recipe$1]);
}
const SignInFeature = (props) => {
    const childProps = useChildProps$1(
        props.recipe,
        props.error,
        props.onError,
        props.clearError,
        props.userContext,
        props.navigate
    );
    const recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(authCompWrapper.AuthComponentWrapper, {
        recipeComponentOverrides: recipeComponentOverrides,
        children: jsxRuntime.jsxs(React.Fragment, {
            children: [
                props.children === undefined && jsxRuntime.jsx(SignInTheme, { ...childProps }),
                props.children &&
                    React__namespace.Children.map(props.children, (child) => {
                        if (React__namespace.isValidElement(child)) {
                            return React__namespace.cloneElement(child, {
                                ...childProps,
                            });
                        }
                        return child;
                    }),
            ],
        }),
    });
};
const getModifiedRecipeImplementation$1 = (origImpl) => {
    return {
        ...origImpl,
    };
};

const SignUpForm = uiEntry.withOverride("EmailPasswordSignUpForm", function EmailPasswordSignUpForm(props) {
    const userContext = uiEntry.useUserContext();
    return jsxRuntime.jsx(formBase.FormBase, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        onFetchError: props.onFetchError,
        buttonLabel: "EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN",
        onSuccess: props.onSuccess,
        callAPI: async (formFields) => {
            const validationErrors = await genericComponentOverrideContext.validateForm(
                formFields,
                props.config.signInAndUpFeature.signUpForm.formFields
            );
            if (validationErrors.length > 0) {
                return {
                    status: "FIELD_ERROR",
                    formFields: validationErrors,
                };
            }
            const res = await props.recipeImplementation.signUp({
                formFields,
                userContext,
            });
            if (res.status === "SIGN_UP_NOT_ALLOWED") {
                throw new STGeneralError__default$1.default(res.reason);
            }
            return res;
        },
        validateOnBlur: true,
        showLabels: true,
        footer: props.footer,
    });
});
function SignUpTheme(props) {
    const rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    const hasFont = uiEntry.hasFontDefined(rootStyle) || uiEntry.hasFontDefined(props.config.recipeRootStyle);
    const activeStyle = props.config.signInAndUpFeature.signUpForm.style;
    return jsxRuntime.jsx(uiEntry.UserContextWrapper, {
        userContext: props.userContext,
        children: jsxRuntime.jsx(ThemeBase, {
            loadDefaultFont: !hasFont,
            userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle],
            children: jsxRuntime.jsx(SignUpForm, { ...props }),
        }),
    });
}

function useChildProps(recipe$1, error, onError, clearError, userContext, navigate) {
    const session$1 = uiEntry.useSessionContext();
    const recipeImplementation = React.useMemo(
        () => recipe$1 && getModifiedRecipeImplementation(recipe$1.webJSRecipe),
        [recipe$1]
    );
    const rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    const onSignUpSuccess = React.useCallback(
        async (result) => {
            let payloadAfterCall;
            try {
                payloadAfterCall = await types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                    userContext,
                });
            } catch {
                payloadAfterCall = undefined;
            }
            return types.Session.getInstanceOrThrow()
                .validateGlobalClaimsAndHandleSuccessRedirection(
                    {
                        action: "SUCCESS",
                        createdNewUser: result.user.loginMethods.length === 1,
                        isNewRecipeUser: true,
                        newSessionCreated:
                            session$1.loading ||
                            !session$1.doesSessionExist ||
                            (payloadAfterCall !== undefined &&
                                session$1.accessTokenPayload.sessionHandle !== payloadAfterCall.sessionHandle),
                        recipeId: recipe$1.recipeID,
                    },
                    recipe$1.recipeID,
                    genericComponentOverrideContext.getRedirectToPathFromURL(),
                    userContext,
                    navigate
                )
                .catch(rethrowInRender);
        },
        [recipe$1, userContext, navigate]
    );
    return React.useMemo(() => {
        const signInAndUpFeature = recipe$1.config.signInAndUpFeature;
        const signUpFeature = signInAndUpFeature.signUpForm;
        return {
            recipeImplementation,
            config: recipe$1.config,
            styleFromInit: signUpFeature.style,
            formFields: getThemeSignUpFeatureFormFields(signUpFeature.formFields, recipe$1, userContext),
            onFetchError: async (err) => {
                if (err.status === types.Session.getInstanceOrThrow().config.invalidClaimStatusCode) {
                    const invalidClaims = await session.getInvalidClaimsFromResponse({ response: err, userContext });
                    if (invalidClaims.some((i) => i.id === emailverification.EmailVerificationClaim.id)) {
                        try {
                            // it's OK if this throws,
                            const evInstance = recipe.EmailVerification.getInstanceOrThrow();
                            await evInstance.redirect(
                                {
                                    action: "VERIFY_EMAIL",
                                },
                                navigate,
                                undefined,
                                userContext
                            );
                            return;
                        } catch {
                            // If we couldn't redirect to EV we fall back to showing the something went wrong error
                        }
                    }
                }
                onError("SOMETHING_WENT_WRONG_ERROR");
            },
            onSuccess: onSignUpSuccess,
            userContext,
            error,
            onError,
            clearError,
        };
    }, [recipe$1]);
}
const SignUpFeature = (props) => {
    let userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const childProps = useChildProps(
        props.recipe,
        props.error,
        props.onError,
        props.clearError,
        userContext,
        props.navigate
    );
    const recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(authCompWrapper.AuthComponentWrapper, {
        recipeComponentOverrides: recipeComponentOverrides,
        children: jsxRuntime.jsxs(React.Fragment, {
            children: [
                props.children === undefined && jsxRuntime.jsx(SignUpTheme, { ...childProps }),
                props.children &&
                    React__namespace.Children.map(props.children, (child) => {
                        if (React__namespace.isValidElement(child)) {
                            return React__namespace.cloneElement(child, {
                                ...childProps,
                            });
                        }
                        return child;
                    }),
            ],
        }),
    });
};
const getModifiedRecipeImplementation = (origImpl) => {
    return {
        ...origImpl,
    };
};
function getThemeSignUpFeatureFormFields(formFields, recipe, userContext) {
    const emailPasswordOnly = formFields.length === 2;
    return formFields.map((field) => ({
        ...field,
        showIsRequired: (() => {
            // If email and password only, do not show required indicator (*).
            if (emailPasswordOnly) {
                return false;
            }
            // Otherwise, show for all non optional fields (including email and password).
            return field.optional === false;
        })(),
        validate: (() => {
            // If field is not email, return field validate unchanged.
            if (field.id !== "email") {
                return field.validate;
            }
            // Otherwise, if email, use syntax validate method and check if email exists.
            return async (value) => {
                const error = await field.validate(value);
                if (error !== undefined) {
                    return error;
                }
                if (typeof value !== "string") {
                    return "GENERAL_ERROR_EMAIL_NON_STRING";
                }
                try {
                    const emailExists = (
                        await recipe.webJSRecipe.doesEmailExist({
                            email: value,
                            userContext,
                        })
                    ).doesExist;
                    if (emailExists) {
                        return "EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS";
                    }
                } catch (err) {
                    if (STGeneralError__default.default.isThisError(err)) {
                        return err.message;
                    }
                }
                return undefined;
            };
        })(),
    }));
}

class EmailPasswordPreBuiltUI extends uiEntry.RecipeRouter {
    recipeInstance;
    static instance;
    languageTranslations = defaultTranslationsEmailPassword;
    constructor(recipeInstance) {
        super();
        this.recipeInstance = recipeInstance;
    }
    // Static methods
    static getInstanceOrInitAndGetInstance() {
        if (EmailPasswordPreBuiltUI.instance === undefined) {
            const recipeInstance = recipe$1.EmailPassword.getInstanceOrThrow();
            EmailPasswordPreBuiltUI.instance = new EmailPasswordPreBuiltUI(recipeInstance);
        }
        return EmailPasswordPreBuiltUI.instance;
    }
    static getFeatures(useComponentOverrides = componentOverrideContext.useContext) {
        return EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(componentName, props, useComponentOverrides = componentOverrideContext.useContext) {
        return EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    }
    // Instance methods
    getFeatures = (useComponentOverrides = componentOverrideContext.useContext) => {
        const features = {};
        if (this.recipeInstance.config.resetPasswordUsingTokenFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath__default.default(constants.DEFAULT_RESET_PASSWORD_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                    this.recipeInstance.config.recipeId
                ),
                component: (props) => this.getFeatureComponent("resetpassword", props, useComponentOverrides),
                recipeID: recipe$1.EmailPassword.RECIPE_ID,
            };
        }
        return features;
    };
    getFeatureComponent = (componentName, props, useComponentOverrides = componentOverrideContext.useContext) => {
        if (componentName === "resetpassword") {
            return jsxRuntime.jsx(uiEntry.UserContextWrapper, {
                userContext: props.userContext,
                children: jsxRuntime.jsx(ResetPasswordUsingToken$1, {
                    recipe: this.recipeInstance,
                    ...props,
                    useComponentOverrides: useComponentOverrides,
                }),
            });
        } else {
            throw new Error("Should never come here.");
        }
    };
    getAuthComponents() {
        return [
            {
                factorIds: [types.FactorIds.EMAILPASSWORD],
                displayOrder: 2,
                type: "SIGN_UP",
                component: (props) =>
                    jsxRuntime.jsx(
                        SignUpFeature,
                        {
                            recipe: this.recipeInstance,
                            useComponentOverrides: componentOverrideContext.useContext,
                            ...props,
                        },
                        "emailpassword-sign-up"
                    ),
            },
            {
                factorIds: [types.FactorIds.EMAILPASSWORD],
                displayOrder: 2,
                type: "SIGN_IN",
                component: (props) =>
                    jsxRuntime.jsx(
                        SignInFeature,
                        {
                            recipe: this.recipeInstance,
                            useComponentOverrides: componentOverrideContext.useContext,
                            ...props,
                        },
                        "emailpassword-sign-in"
                    ),
            },
        ];
    }
    requiresSignUpPage = true;
    // For tests
    static reset() {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        EmailPasswordPreBuiltUI.instance = undefined;
        return;
    }
    static ResetPasswordUsingToken = (prop) =>
        EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("resetpassword", prop);
    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenThemeWrapper;
}
const ResetPasswordUsingToken = EmailPasswordPreBuiltUI.ResetPasswordUsingToken;

exports.EmailPasswordPreBuiltUI = EmailPasswordPreBuiltUI;
exports.ResetPasswordUsingToken = ResetPasswordUsingToken;
exports.ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenThemeWrapper;
