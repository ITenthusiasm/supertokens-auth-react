"use strict";

var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
require("./multifactorauth.js");
var session = require("./session.js");
var recipe = require("./thirdparty-shared.js");
var React = require("react");
var authCompWrapper = require("./authCompWrapper.js");
var types = require("./multifactorauth-shared.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var emailverification = require("./emailverification.js");
var recipe$1 = require("./emailverification-shared.js");
require("./translationContext.js");
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
require("supertokens-web-js/recipe/session");
require("./session-shared.js");
require("supertokens-web-js/recipe/thirdparty");
require("./authRecipe-shared2.js");
require("supertokens-web-js/recipe/emailverification");

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

var styles =
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 128, 128, 128;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        transform: rotateX(-100deg);\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        transform: rotateX(0deg);\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 10px auto 0;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 400;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n    margin-top: 24px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 500;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    font-weight: 400;\n    color: rgb(var(--palette-textGray));\n    margin-bottom: 21px;\n}\n[data-supertokens~="headerSubtitle"][data-supertokens~="secondaryText"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="secondaryText"] strong {\n    font-weight: 500;\n}\n[data-supertokens~="divider"] {\n    margin-top: 1.5em;\n    margin-bottom: 1.5em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n    flex: 3 3;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    font-family: "Rubik", sans-serif;\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 500;\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    font-family: "Rubik", sans-serif;\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="delayedRender"] {\n    animation-duration: 0.1s;\n    animation-name: animate-fade;\n    animation-delay: 0.2s;\n    animation-fill-mode: backwards;\n}\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] {\n    display: flex;\n    flex-direction: column;\n    margin-top: 10px;\n    gap: 24px;\n}\n[data-supertokens~="footerLinkGroupVert"] > div {\n    cursor: pointer;\n    margin: 0;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryText"] {\n    font-weight: 400;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    font-weight: 500;\n    position: relative;\n    left: -6px; /* half the width of the left arrow */\n}\n@media (max-width: 360px) {\n    [data-supertokens~="footerLinkGroupVert"] {\n        flex-direction: column;\n    }\n    [data-supertokens~="footerLinkGroupVert"] > div {\n        margin: 0 auto;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] div:only-child {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 14px;\n}\n[data-supertokens~="withBackButton"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="dividerWithOr"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="dividerText"] {\n    flex: 1 1;\n}\n[data-supertokens~="formLabelWithLinkWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="formLabelLinkBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n}\n[data-supertokens~="formLabelLinkBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="formLabelLinkBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n[data-supertokens~="authComponentList"] {\n    padding-bottom: 20px;\n}\n[data-supertokens~="providerContainer"] {\n    padding-top: 9px;\n    padding-bottom: 9px;\n}\n[data-supertokens~="button"][data-supertokens~="providerButton"] {\n    min-height: 32px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    padding: 2px 8px;\n\n    background-color: white;\n    border-color: rgb(221, 221, 221);\n    color: black;\n}\n[data-supertokens~="multiFactor"] [data-supertokens~="button"][data-supertokens~="providerButton"] {\n    margin: auto;\n    max-width: 240px;\n}\n[data-supertokens~="button"][data-supertokens~="providerButton"]:hover {\n    filter: none;\n    background-color: #fafafa;\n}\n[data-supertokens~="providerButtonLeft"] {\n    min-width: 34px;\n    margin-left: 66px;\n}\n[data-supertokens~="multiFactor"] [data-supertokens~="providerButtonLeft"] {\n    margin-left: 30px;\n}\n[data-supertokens~="providerButtonLogo"] {\n    height: 30px;\n    display: flex;\n}\n[data-supertokens~="providerButtonLogoCenter"] {\n    display: flex;\n    margin: auto;\n}\n[data-supertokens~="providerButtonText"] {\n    font-weight: 400;\n    text-align: center;\n    justify-content: center;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: inline-block;\n}\n[data-supertokens~="providerButtonText"]:only-child {\n    margin: 0 auto;\n}\n';

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
            jsxRuntime.jsxs("style", { children: [styles, userStyles.join("\n")] }),
        ],
    });
};

const ThirdPartySignInAndUpProvidersForm = (props) => {
    const userContext = uiEntry.useUserContext();
    const signInClick = async (providerId) => {
        try {
            let response;
            let generalError;
            try {
                response = await recipe.redirectToThirdPartyLogin({
                    recipeImplementation: props.recipeImplementation,
                    thirdPartyId: providerId,
                    config: props.config,
                    userContext,
                });
            } catch (e) {
                if (STGeneralError__default.default.isThisError(e)) {
                    generalError = e;
                } else {
                    throw e;
                }
            }
            if (generalError !== undefined) {
                props.onError(generalError.message);
            } else {
                if (response === undefined) {
                    throw new Error("Should not come here");
                }
                if (response.status === "ERROR") {
                    props.onError("SOMETHING_WENT_WRONG_ERROR");
                }
            }
        } catch (err) {
            props.onError("SOMETHING_WENT_WRONG_ERROR");
        }
    };
    return jsxRuntime.jsx(React.Fragment, {
        children: props.providers.map((provider) => {
            return jsxRuntime.jsx(
                "div",
                {
                    "data-supertokens": "providerContainer",
                    children: jsxRuntime.jsx("span", {
                        onClick: () => signInClick(provider.id),
                        children: provider.getButton(),
                    }),
                },
                `provider-${provider.id}`
            );
        }),
    });
};
const ProvidersForm = uiEntry.withOverride("ThirdPartySignInAndUpProvidersForm", ThirdPartySignInAndUpProvidersForm);

const SignInAndUpThemeWrapper = (props) => {
    const rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    const hasFont = uiEntry.hasFontDefined(rootStyle) || uiEntry.hasFontDefined(props.config.recipeRootStyle);
    return jsxRuntime.jsx(uiEntry.UserContextWrapper, {
        userContext: props.userContext,
        children: jsxRuntime.jsx(ThemeBase, {
            loadDefaultFont: !hasFont,
            userStyles: [rootStyle, props.config.recipeRootStyle, props.config.signInAndUpFeature.style],
            children: jsxRuntime.jsx(ProvidersForm, { ...props }),
        }),
    });
};

function useChildProps(recipe$1, error, onError, clearError, rebuildAuthPage, setFactorList, navigate, userContext) {
    const recipeImplementation = React.useMemo(
        () => recipe$1 && getModifiedRecipeImplementation(recipe$1.webJSRecipe),
        [recipe$1]
    );
    const dynamicLoginMethods = uiEntry.useDynamicLoginMethods();
    return React.useMemo(() => {
        let tenantProviders;
        if (genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods) {
            if (dynamicLoginMethods.loaded === false) {
                throw new Error("Component requiring dynamicLoginMethods rendered without FeatureWrapper.");
            } else {
                tenantProviders = dynamicLoginMethods.loginMethods.firstFactors.includes(types.FactorIds.THIRDPARTY)
                    ? dynamicLoginMethods.loginMethods.thirdparty.providers
                    : [];
            }
        }
        return {
            error,
            onError,
            clearError,
            rebuildAuthPage,
            setFactorList,
            providers: recipe.mergeProviders({
                tenantProviders,
                clientProviders: recipe$1.config.signInAndUpFeature.providers,
            }),
            recipeImplementation,
            config: recipe$1.config,
            recipe: recipe$1,
            navigate,
            userContext,
        };
    }, [recipe$1, recipeImplementation]);
}
const SignInAndUpFeature = (props) => {
    const childProps = useChildProps(
        props.recipe,
        props.error,
        props.onError,
        props.clearError,
        props.rebuildAuthPage,
        props.setFactorList,
        props.navigate,
        props.userContext
    );
    const themeProps = { ...childProps, providers: childProps.providers };
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            props.children === undefined && jsxRuntime.jsx(SignInAndUpThemeWrapper, { ...themeProps }),
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
    });
};
const SignInAndUpFeatureWrapper = (props) => {
    const recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(authCompWrapper.AuthComponentWrapper, {
        recipeComponentOverrides: recipeComponentOverrides,
        children: jsxRuntime.jsx(SignInAndUpFeature, { ...props }),
    });
};
const getModifiedRecipeImplementation = (origImpl) => {
    return {
        ...origImpl,
    };
};

/*
 * Component.
 */
class ThirdPartySignInAndUpCallbackTheme extends React.PureComponent {
    /*
     * Methods.
     */
    render = () => {
        return jsxRuntime.jsx("div", {
            "data-supertokens": "container",
            children: jsxRuntime.jsx("div", {
                "data-supertokens": "row",
                children: jsxRuntime.jsx("div", {
                    "data-supertokens": "spinner",
                    children: jsxRuntime.jsx(uiEntry.SpinnerIcon, {}),
                }),
            }),
        });
    };
}
const SignInAndUpCallbackThemeWithOverride = uiEntry.withOverride(
    "ThirdPartySignInAndUpCallbackTheme",
    ThirdPartySignInAndUpCallbackTheme
);
const SignInAndUpCallbackTheme = (props) => {
    const rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    const hasFont = uiEntry.hasFontDefined(rootStyle) || uiEntry.hasFontDefined(props.config.recipeRootStyle);
    return jsxRuntime.jsx(ThemeBase, {
        loadDefaultFont: !hasFont,
        userStyles: [rootStyle, props.config.recipeRootStyle, props.config.signInAndUpFeature.style],
        children: jsxRuntime.jsx(SignInAndUpCallbackThemeWithOverride, {}),
    });
};

const defaultTranslationsThirdParty = {
    en: {
        ...uiEntry.defaultTranslationsCommon.en,
        THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: "Continue with ",
        THIRD_PARTY_PROVIDER_DEFAULT_BTN_END: "",
        THIRD_PARTY_ERROR_NO_EMAIL: "Could not retrieve email. Please try a different method.",
        /*
         * The following are error messages from our backend SDK.
         * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
         * They are shown as is by default (setting the value to undefined will display the raw translation key)
         */
        "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_004)":
            undefined,
        "Cannot sign in / up because new email cannot be applied to existing account. Please contact support. (ERR_CODE_005)":
            undefined,
        "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_006)":
            undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_020)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_021)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_022)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_023)": undefined,
    },
};

const SignInAndUpCallback$1 = (props) => {
    let userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    const verifyCode = React.useCallback(async () => {
        let payloadBeforeCall;
        try {
            payloadBeforeCall = await types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                userContext: userContext,
            });
        } catch {
            // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
            payloadBeforeCall = undefined;
        }
        return {
            payloadBeforeCall,
            response: await props.recipe.webJSRecipe.signInAndUp({
                userContext,
            }),
        };
    }, [props.recipe, userContext]);
    const handleVerifyResponse = React.useCallback(
        async ({ response, payloadBeforeCall }) => {
            if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                    navigate: props.navigate,
                    queryParams: {
                        error: "no_email_present",
                    },
                    redirectBack: false,
                    userContext,
                });
            }
            if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                    navigate: props.navigate,
                    queryParams: {
                        error: response.status,
                        message: response.reason,
                    },
                    redirectBack: false,
                    userContext,
                });
            }
            if (response.status === "OK") {
                let payloadAfterCall;
                try {
                    payloadAfterCall = await types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                        userContext,
                    });
                } catch {
                    payloadAfterCall = undefined;
                }
                const stateResponse = props.recipe.webJSRecipe.getStateAndOtherInfoFromStorage({
                    userContext,
                });
                const redirectToPath = stateResponse === undefined ? undefined : stateResponse.redirectToPath;
                return types.Session.getInstanceOrThrow()
                    .validateGlobalClaimsAndHandleSuccessRedirection(
                        {
                            action: "SUCCESS",
                            createdNewUser: response.createdNewRecipeUser && response.user.loginMethods.length === 1,
                            isNewRecipeUser: response.createdNewRecipeUser,
                            newSessionCreated:
                                payloadAfterCall !== undefined &&
                                (payloadBeforeCall === undefined ||
                                    payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                            recipeId: props.recipe.recipeID,
                        },
                        props.recipe.recipeID,
                        redirectToPath,
                        userContext,
                        props.navigate
                    )
                    .catch(rethrowInRender);
            }
        },
        [props.recipe, props.navigate, userContext]
    );
    const handleError = React.useCallback(
        async (err) => {
            if ("status" in err && err.status === types.Session.getInstanceOrThrow().config.invalidClaimStatusCode) {
                const invalidClaims = await session.getInvalidClaimsFromResponse({ response: err, userContext });
                if (invalidClaims.some((i) => i.id === emailverification.EmailVerificationClaim.id)) {
                    try {
                        // it's OK if this throws,
                        const evInstance = recipe$1.EmailVerification.getInstanceOrThrow();
                        await evInstance.redirect(
                            {
                                action: "VERIFY_EMAIL",
                            },
                            props.navigate,
                            undefined,
                            userContext
                        );
                        return;
                    } catch {
                        // If we couldn't redirect to EV we fall back to showing the something went wrong error
                    }
                }
            }
            if (STGeneralError__default.default.isThisError(err)) {
                return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                    navigate: props.navigate,
                    queryParams: {
                        error: "custom",
                        message: err.message,
                    },
                    redirectBack: false,
                    userContext,
                });
            }
            return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                navigate: props.navigate,
                queryParams: {
                    error: "signin",
                },
                redirectBack: false,
                userContext,
            });
        },
        [props.navigate, userContext]
    );
    genericComponentOverrideContext.useOnMountAPICall(verifyCode, handleVerifyResponse, handleError);
    const recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(uiEntry.ComponentOverrideContext.Provider, {
        value: recipeComponentOverrides,
        children: jsxRuntime.jsx(uiEntry.FeatureWrapper, {
            useShadowDom: genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().useShadowDom,
            defaultStore: defaultTranslationsThirdParty,
            children: jsxRuntime.jsxs(React.Fragment, {
                children: [
                    props.children === undefined &&
                        jsxRuntime.jsx(SignInAndUpCallbackTheme, { config: props.recipe.config }),
                    props.children,
                ],
            }),
        }),
    });
};

class ThirdPartyPreBuiltUI extends uiEntry.RecipeRouter {
    recipeInstance;
    static instance;
    languageTranslations = defaultTranslationsThirdParty;
    constructor(recipeInstance) {
        super();
        this.recipeInstance = recipeInstance;
    }
    // Static methods
    static getInstanceOrInitAndGetInstance() {
        if (ThirdPartyPreBuiltUI.instance === undefined) {
            const recipeInstace = recipe.ThirdParty.getInstanceOrThrow();
            ThirdPartyPreBuiltUI.instance = new ThirdPartyPreBuiltUI(recipeInstace);
        }
        return ThirdPartyPreBuiltUI.instance;
    }
    static getFeatures(useComponentOverrides = recipe.useContext) {
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(componentName, props, useComponentOverrides = recipe.useContext) {
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    }
    // Instance methods
    getFeatures = (useComponentOverrides = recipe.useContext) => {
        const features = {};
        // Add callback route for all provider
        const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
            new NormalisedURLPath__default.default("/callback/:id")
        );
        features[normalisedFullPath.getAsStringDangerous()] = {
            matches: () => recipe.matchRecipeIdUsingState(this.recipeInstance, {}),
            component: (prop) => this.getFeatureComponent("signinupcallback", prop, useComponentOverrides),
            recipeID: recipe.ThirdParty.RECIPE_ID,
        };
        return features;
    };
    getFeatureComponent = (componentName, props, useComponentOverrides = recipe.useContext) => {
        if (componentName === "signinupcallback") {
            return jsxRuntime.jsx(uiEntry.UserContextWrapper, {
                userContext: props.userContext,
                children: jsxRuntime.jsx(session.SessionAuth, {
                    requireAuth: false,
                    doRedirection: false,
                    children: jsxRuntime.jsx(SignInAndUpCallback$1, {
                        recipe: this.recipeInstance,
                        ...props,
                        useComponentOverrides: useComponentOverrides,
                    }),
                }),
            });
        } else {
            throw new Error("Should never come here");
        }
    };
    getAuthComponents() {
        return [
            {
                component: (props) =>
                    jsxRuntime.jsx(
                        SignInAndUpFeatureWrapper,
                        { ...props, recipe: this.recipeInstance, useComponentOverrides: recipe.useContext },
                        "thirdparty-signinup"
                    ),
                displayOrder: 1,
                factorIds: [types.FactorIds.THIRDPARTY],
                type: "SIGN_IN_UP",
            },
        ];
    }
    // For tests
    static reset() {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        ThirdPartyPreBuiltUI.instance = undefined;
        return;
    }
    static SignInAndUpCallback = (prop) =>
        ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("signinupcallback", prop);
    static SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
}
const SignInAndUpCallback = ThirdPartyPreBuiltUI.SignInAndUpCallback;

exports.SignInAndUpCallback = SignInAndUpCallback;
exports.SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
exports.ThirdPartyPreBuiltUI = ThirdPartyPreBuiltUI;
