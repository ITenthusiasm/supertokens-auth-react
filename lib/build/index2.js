"use strict";

var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var translationContext = require("./translationContext.js");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var reactDom = require("react-dom");
var componentOverrideContext = require("./multitenancy-shared.js");
var recipe = require("./multifactorauth-shared2.js");
var types = require("./multifactorauth-shared.js");
var utils = require("./authRecipe-shared.js");
var NormalisedURLPath$1 = require("supertokens-web-js/lib/build/normalisedURLPath");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);
var NormalisedURLPath__default$1 = /*#__PURE__*/ _interopDefault(NormalisedURLPath$1);

const ComponentOverrideContext = React__default.default.createContext("IS_DEFAULT");

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
 * Component.
 */
function SpinnerIcon() {
    return jsxRuntime.jsx("svg", {
        version: "1.1",
        viewBox: "25 25 50 50",
        "data-supertokens": "spinnerIcon",
        children: jsxRuntime.jsxs("circle", {
            cx: "50",
            cy: "50",
            r: "20",
            fill: "none",
            stroke: "rgb(var(--palette-primary))",
            strokeWidth: "5",
            strokeLinecap: "round",
            strokeDashoffset: "0",
            strokeDasharray: "100, 200",
            children: [
                jsxRuntime.jsx("animateTransform", {
                    attributeName: "transform",
                    attributeType: "XML",
                    type: "rotate",
                    from: "0 50 50",
                    to: "360 50 50",
                    dur: "4s",
                    repeatCount: "indefinite",
                }),
                jsxRuntime.jsx("animate", {
                    attributeName: "stroke-dashoffset",
                    values: "0;-30;-124",
                    dur: "2s",
                    repeatCount: "indefinite",
                }),
                jsxRuntime.jsx("animate", {
                    attributeName: "stroke-dasharray",
                    values: "0,200;110,200;110,200",
                    dur: "2s",
                    repeatCount: "indefinite",
                }),
            ],
        }),
    });
}

const useComponentOverride = (overrideKey) => {
    const ctx = React.useContext(ComponentOverrideContext);
    if (ctx === "IS_DEFAULT") {
        throw new Error("Cannot use component override outside ComponentOverrideContext provider.");
    }
    const OverrideComponent = ctx[overrideKey];
    return OverrideComponent === undefined ? null : OverrideComponent;
};

const withOverride = (overrideKey, DefaultComponent) => {
    const finalKey = overrideKey + "_Override";
    DefaultComponent.displayName = finalKey;
    return (props) => {
        // console.log("Non WC Override Props: ", props);
        const OverrideComponent = useComponentOverride(finalKey);
        if (OverrideComponent !== null) {
            return jsxRuntime.jsx(OverrideComponent, { DefaultComponent: DefaultComponent, ...props });
        }
        return jsxRuntime.jsx(DefaultComponent, { ...props });
    };
};

var styles$1 =
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 128, 128, 128;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        transform: rotateX(-100deg);\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        transform: rotateX(0deg);\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 10px auto 0;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 400;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n    margin-top: 24px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 500;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    font-weight: 400;\n    color: rgb(var(--palette-textGray));\n    margin-bottom: 21px;\n}\n[data-supertokens~="headerSubtitle"][data-supertokens~="secondaryText"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="secondaryText"] strong {\n    font-weight: 500;\n}\n[data-supertokens~="divider"] {\n    margin-top: 1.5em;\n    margin-bottom: 1.5em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n    flex: 3 3;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    font-family: "Rubik", sans-serif;\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 500;\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    font-family: "Rubik", sans-serif;\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="delayedRender"] {\n    animation-duration: 0.1s;\n    animation-name: animate-fade;\n    animation-delay: 0.2s;\n    animation-fill-mode: backwards;\n}\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] {\n    display: flex;\n    flex-direction: column;\n    margin-top: 10px;\n    gap: 24px;\n}\n[data-supertokens~="footerLinkGroupVert"] > div {\n    cursor: pointer;\n    margin: 0;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryText"] {\n    font-weight: 400;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    font-weight: 500;\n    position: relative;\n    left: -6px; /* half the width of the left arrow */\n}\n@media (max-width: 360px) {\n    [data-supertokens~="footerLinkGroupVert"] {\n        flex-direction: column;\n    }\n    [data-supertokens~="footerLinkGroupVert"] > div {\n        margin: 0 auto;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] div:only-child {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 14px;\n}\n[data-supertokens~="withBackButton"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="dividerWithOr"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="dividerText"] {\n    flex: 1 1;\n}\n[data-supertokens~="formLabelWithLinkWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="formLabelLinkBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n}\n[data-supertokens~="formLabelLinkBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="formLabelLinkBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n[data-supertokens~="authComponentList"] {\n    padding-bottom: 20px;\n}\n';

const ThemeBase$1 = ({ children, userStyles, loadDefaultFont }) => {
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            children,
            loadDefaultFont &&
                jsxRuntime.jsx("link", {
                    href: "//fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700",
                    rel: "stylesheet",
                    type: "text/css",
                }),
            jsxRuntime.jsxs("style", { children: [styles$1, userStyles.join("\n")] }),
        ],
    });
};

const MultitenancyDynamicLoginMethodsSpinnerTheme = () => {
    return jsxRuntime.jsx("div", {
        "data-supertokens": "container delayedRender",
        children: jsxRuntime.jsx("div", {
            "data-supertokens": "row",
            children: jsxRuntime.jsx("div", {
                "data-supertokens": "spinner delayedRender",
                children: jsxRuntime.jsx(SpinnerIcon, {}),
            }),
        }),
    });
};
const DynamicLoginMethodsSpinnerThemeWithOverride = withOverride(
    "MultitenancyDynamicLoginMethodsSpinnerTheme",
    MultitenancyDynamicLoginMethodsSpinnerTheme
);
const DynamicLoginMethodsSpinnerTheme = (props) => {
    const rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    return jsxRuntime.jsx(ThemeBase$1, {
        loadDefaultFont: false,
        userStyles: [rootStyle, props.config.recipeRootStyle],
        children: jsxRuntime.jsx(DynamicLoginMethodsSpinnerThemeWithOverride, {}),
    });
};

// TODO: move this to the root components dir and rename (incl. the override)
// This is a special "feature" component:
//  - it's used inside FeatureWrapper & RoutingComponent (meaning it can't use FeatureWrapper)
//  - it's not used in any specific route (multitenancy doesn't have a pre-built UI)
const DynamicLoginMethodsSpinner = () => {
    const recipe = genericComponentOverrideContext.Multitenancy.getInstanceOrThrow();
    const recipeComponentOverrides = componentOverrideContext.useContext();
    return jsxRuntime.jsx(ComponentOverrideContext.Provider, {
        value: recipeComponentOverrides,
        children: jsxRuntime.jsx(WithOrWithoutShadowDom, {
            useShadowDom: genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().useShadowDom,
            children: jsxRuntime.jsx(DynamicLoginMethodsSpinnerTheme, { config: recipe.config }),
        }),
    });
};

const dynamicLoginMethodsContext = React__default.default.createContext(undefined);
const useDynamicLoginMethods = () => {
    const value = React__default.default.useContext(dynamicLoginMethodsContext);
    if (value === undefined) {
        throw new Error("useDynamicLoginMethods used outside of a valid provider (FeatureWrapper)");
    }
    return value;
};
const DynamicLoginMethodsProvider = ({ value, children }) => {
    const contextValue = value === undefined ? { loaded: false } : { loaded: true, loginMethods: value };
    return jsxRuntime.jsx(dynamicLoginMethodsContext.Provider, { value: contextValue, children: children });
};

const UserContextContext = React__default.default.createContext(undefined);
const useUserContext = () => {
    return React__default.default.useContext(UserContextContext);
};
const UserContextProvider = ({ children, userContext }) => {
    const [currentUserContext] = React.useState(genericComponentOverrideContext.getNormalisedUserContext(userContext));
    return jsxRuntime.jsx(UserContextContext.Provider, { value: currentUserContext, children: children });
};

function FeatureWrapper({ children, useShadowDom, defaultStore }) {
    const userContext = useUserContext();
    const rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    const [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods] = React.useState(undefined);
    const st = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow();
    React.useEffect(() => {
        if (loadedDynamicLoginMethods) {
            return;
        }
        genericComponentOverrideContext.Multitenancy.getInstanceOrThrow()
            .getCurrentDynamicLoginMethods({ userContext })
            .then(
                (loginMethods) => setLoadedDynamicLoginMethods(loginMethods),
                (err) => rethrowInRender(err)
            );
    }, [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods]);
    if (genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods && !loadedDynamicLoginMethods) {
        return jsxRuntime.jsx(DynamicLoginMethodsSpinner, {});
    }
    return jsxRuntime.jsx(DynamicLoginMethodsProvider, {
        value: loadedDynamicLoginMethods,
        children: jsxRuntime.jsx(translationContext.TranslationContextProvider, {
            defaultLanguage: st.languageTranslations.defaultLanguage,
            defaultStore: genericComponentOverrideContext.mergeObjects(
                defaultStore,
                st.languageTranslations.userTranslationStore
            ),
            translationControlEventSource: st.languageTranslations.translationEventSource,
            userTranslationFunc: st.languageTranslations.userTranslationFunc,
            children: jsxRuntime.jsx(WithOrWithoutShadowDom, { useShadowDom: useShadowDom, children: children }),
        }),
    });
}
function WithShadowDom({ children }) {
    const rootDiv = React.useRef(null);
    const [shadowRoot, setShadowRoot] = React.useState();
    React.useEffect(() => {
        if (rootDiv.current) {
            // defaults from react-shadow
            setShadowRoot(
                (os) =>
                    os ||
                    rootDiv.current.shadowRoot ||
                    rootDiv.current.attachShadow({ mode: "open", delegatesFocus: false })
            );
        }
    }, [rootDiv]);
    // Otherwise, use shadow dom.
    return jsxRuntime.jsx("div", {
        id: genericComponentOverrideContext.ST_ROOT_ID,
        ref: rootDiv,
        children: shadowRoot && reactDom.createPortal(children, shadowRoot),
    });
}
function WithOrWithoutShadowDom({ children, useShadowDom }) {
    // If explicitely specified to not use shadow dom.
    if (useShadowDom === false) {
        return jsxRuntime.jsxs("div", {
            id: genericComponentOverrideContext.ST_ROOT_ID,
            children: [children, jsxRuntime.jsx(DisableAutoFillInput, {})],
        });
    }
    return jsxRuntime.jsxs(WithShadowDom, { children: [children, jsxRuntime.jsx(DisableAutoFillInput, {})] });
}
function DisableAutoFillInput() {
    /* eslint-disable react/jsx-no-literals */
    return jsxRuntime.jsx("style", {
        type: "text/css",
        children:
            "input.supertokens-input:-webkit-autofill,input.supertokens-input:-webkit-autofill:focus,input.supertokens-input:-webkit-autofill:hover,select:-webkit-autofill,select:-webkit-autofill:focus,select:-webkit-autofill:hover,textarea:-webkit-autofill,textarea:-webkit-autofill:focus,textarea:-webkit-autofill:hover{transition:background-color 5000s ease-in-out 0s}",
    });
    /* eslint-enable react/jsx-no-literals */
}

const defaultTranslationsCommon = {
    en: {
        AUTH_PAGE_HEADER_TITLE_SIGN_IN_AND_UP: "Sign Up / Sign In",
        AUTH_PAGE_HEADER_TITLE_SIGN_IN: "Sign In",
        AUTH_PAGE_HEADER_TITLE_SIGN_UP: "Sign Up",
        AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_START: "Not registered yet?",
        AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_SIGN_UP_LINK: "Sign Up",
        AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_END: "",
        AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_START: "Already have an account?",
        AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_SIGN_IN_LINK: "Sign In",
        AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_END: "",
        AUTH_PAGE_FOOTER_START: "By continuing, you agree to our ",
        AUTH_PAGE_FOOTER_TOS: "Terms of Service",
        AUTH_PAGE_FOOTER_AND: " and ",
        AUTH_PAGE_FOOTER_PP: "Privacy Policy",
        AUTH_PAGE_FOOTER_END: "",
        DIVIDER_OR: "or",
        BRANDING_POWERED_BY_START: "Powered by ",
        BRANDING_POWERED_BY_END: "",
        SOMETHING_WENT_WRONG_ERROR: "Something went wrong. Please try again.",
        SOMETHING_WENT_WRONG_ERROR_RELOAD: "Something went wrong. Please try again later or reload the page.",
    },
};

const SessionContext = React__default.default.createContext({
    loading: true,
    isDefault: true,
});

const useSessionContext = () => {
    const ctx = React__default.default.useContext(SessionContext);
    if (ctx.isDefault === true) {
        throw new Error("Cannot use useSessionContext outside auth wrapper components.");
    }
    return ctx;
};

const [useContext, Provider] = genericComponentOverrideContext.createGenericComponentsOverrideContext();

function SuperTokensBranding() {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsxs("a", {
        "data-supertokens": "superTokensBranding",
        href: "https://supertokens.com?utm_campaign=poweredby",
        target: "_blank",
        children: [
            t("BRANDING_POWERED_BY_START"),
            jsxRuntime.jsx("strong", { children: "SuperTokens" }),
            t("BRANDING_POWERED_BY_END"),
        ],
    });
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
function hasFontDefined(style) {
    if (style === undefined) {
        return false;
    }
    const lowerStyle = style.toLowerCase();
    return lowerStyle.includes("font-family:") || lowerStyle.includes("font:");
}

function UserContextWrapper(props) {
    /**
     * If we receive a userContext as a props we should assume that the user
     * is either trying to use a theme component as standalone or that they
     * want to override an existing value for userContext.
     *
     * In this case we should always return a Provider with the value of userContext
     */
    if (props.userContext !== undefined) {
        return jsxRuntime.jsx(UserContextProvider, { userContext: props.userContext, children: props.children });
    }
    return jsxRuntime.jsx(UserContextContext.Consumer, {
        children: (value) => {
            /**
             * value is undefined only if there is no Provider in the tree. In this case it is safe to
             * assume that the theme component is not being rendered by the SDK and that the user is not
             * using this as a child of one of the pre-built feature components.
             *
             * In this case we return a provider so that the userContext hook can be used by the children
             * of this theme component
             */
            if (value === undefined) {
                return jsxRuntime.jsx(UserContextProvider, { children: props.children });
            }
            /**
             * If value is not undefined then a provider exists in the tree. This means that this component
             * is either being rendered by the SDK or the user has added it as a child of the pre-built
             * feature components. In either case the userContext hook will be available so simply
             * return the theme component.
             */
            return props.children;
        },
    });
}

function GeneralError({ error }) {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsx("div", { "data-supertokens": "generalError", children: t(error) });
}

var styles =
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 128, 128, 128;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        transform: rotateX(-100deg);\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        transform: rotateX(0deg);\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 10px auto 0;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 400;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n    margin-top: 24px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 500;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    font-weight: 400;\n    color: rgb(var(--palette-textGray));\n    margin-bottom: 21px;\n}\n[data-supertokens~="headerSubtitle"][data-supertokens~="secondaryText"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="secondaryText"] strong {\n    font-weight: 500;\n}\n[data-supertokens~="divider"] {\n    margin-top: 1.5em;\n    margin-bottom: 1.5em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n    flex: 3 3;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    font-family: "Rubik", sans-serif;\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 500;\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    font-family: "Rubik", sans-serif;\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="delayedRender"] {\n    animation-duration: 0.1s;\n    animation-name: animate-fade;\n    animation-delay: 0.2s;\n    animation-fill-mode: backwards;\n}\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] {\n    display: flex;\n    flex-direction: column;\n    margin-top: 10px;\n    gap: 24px;\n}\n[data-supertokens~="footerLinkGroupVert"] > div {\n    cursor: pointer;\n    margin: 0;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryText"] {\n    font-weight: 400;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    font-weight: 500;\n    position: relative;\n    left: -6px; /* half the width of the left arrow */\n}\n@media (max-width: 360px) {\n    [data-supertokens~="footerLinkGroupVert"] {\n        flex-direction: column;\n    }\n    [data-supertokens~="footerLinkGroupVert"] > div {\n        margin: 0 auto;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] div:only-child {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 14px;\n}\n[data-supertokens~="withBackButton"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="dividerWithOr"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="dividerText"] {\n    flex: 1 1;\n}\n[data-supertokens~="formLabelWithLinkWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="formLabelLinkBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n}\n[data-supertokens~="formLabelLinkBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="formLabelLinkBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n[data-supertokens~="authComponentList"] {\n    padding-bottom: 20px;\n}\n';

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

const AuthPageComponentList = withOverride("AuthPageComponentList", function AuthPageComponentList(props) {
    const t = translationContext.useTranslation();
    const list = [props.authComponents[0]];
    for (let i = 1; i < props.authComponents.length; ++i) {
        list.push(() =>
            jsxRuntime.jsxs(
                "div",
                {
                    "data-supertokens": "dividerWithOr",
                    children: [
                        jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                        jsxRuntime.jsx("div", { "data-supertokens": "dividerText", children: t("DIVIDER_OR") }),
                        jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                    ],
                },
                `divider-${i}`
            )
        );
        list.push(props.authComponents[i]);
    }
    return jsxRuntime.jsx("div", {
        "data-supertokens": "authComponentList",
        children: list.map((i) =>
            i({
                ...props,
            })
        ),
    });
});

const AuthPageFooter = withOverride(
    "AuthPageFooter",
    function AuthPageFooter({ hasSeparateSignUpView, isSignUp, termsOfServiceLink, privacyPolicyLink }) {
        const t = translationContext.useTranslation();
        if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
            return null;
        }
        if (hasSeparateSignUpView && !isSignUp) {
            return null;
        }
        return jsxRuntime.jsxs("div", {
            "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions",
            children: [
                t("AUTH_PAGE_FOOTER_START"),
                termsOfServiceLink !== undefined &&
                    jsxRuntime.jsx("a", {
                        "data-supertokens": "link",
                        href: termsOfServiceLink,
                        target: "_blank",
                        rel: "noopener noreferer",
                        children: t("AUTH_PAGE_FOOTER_TOS"),
                    }),
                termsOfServiceLink !== undefined && privacyPolicyLink !== undefined && t("AUTH_PAGE_FOOTER_AND"),
                privacyPolicyLink !== undefined &&
                    jsxRuntime.jsx("a", {
                        "data-supertokens": "link",
                        href: privacyPolicyLink,
                        target: "_blank",
                        rel: "noopener noreferer",
                        children: t("AUTH_PAGE_FOOTER_PP"),
                    }),
                t("AUTH_PAGE_FOOTER_END"),
            ],
        });
    }
);

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
 * Component.
 */
function HeavyArrowLeftIcon({ color }) {
    return jsxRuntime.jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "13",
        viewBox: "0 0 16 13",
        "data-supertokens": "heavyArrowLeftIcon",
        children: jsxRuntime.jsx("path", {
            fill: color,
            d: "M13 6.8h.022H3.8l2.9 2.9a.761.761 0 0 1 0 1.07l-.451.451a.754.754 0 0 1-1.064 0L.22 6.254a.759.759 0 0 1 0-1.068L5.186.22a.755.755 0 0 1 1.064 0l.45.451a.746.746 0 0 1 .22.532.724.724 0 0 1-.22.522l-2.93 2.92h9.24a.781.781 0 0 1 .764.773v.638A.766.766 0 0 1 13 6.8z",
            transform: "translate(1.182 .708)",
        }),
    });
}

/*
 * Component.
 */
function BackButton({ onClick }) {
    return jsxRuntime.jsx("button", {
        onClick: onClick,
        "data-supertokens": "backButton backButtonCommon",
        children: jsxRuntime.jsx(HeavyArrowLeftIcon, { color: "rgb(var(--palette-textTitle))" }),
    });
}

const AuthPageHeader = withOverride(
    "AuthPageHeader",
    function AuthPageHeader({
        onSignInUpSwitcherClick,
        hasSeparateSignUpView,
        isSignUp,
        showBackButton,
        resetFactorList,
    }) {
        const t = translationContext.useTranslation();
        return jsxRuntime.jsxs(React.Fragment, {
            children: [
                jsxRuntime.jsxs("div", {
                    "data-supertokens": "headerTitle withBackButton",
                    children: [
                        showBackButton
                            ? jsxRuntime.jsx(BackButton, { onClick: resetFactorList })
                            : jsxRuntime.jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                        !hasSeparateSignUpView
                            ? t("AUTH_PAGE_HEADER_TITLE_SIGN_IN_AND_UP")
                            : isSignUp
                            ? t("AUTH_PAGE_HEADER_TITLE_SIGN_UP")
                            : t("AUTH_PAGE_HEADER_TITLE_SIGN_IN"),
                        jsxRuntime.jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                    ],
                }),
                hasSeparateSignUpView &&
                    (!isSignUp
                        ? jsxRuntime.jsxs("div", {
                              "data-supertokens": "headerSubtitle secondaryText",
                              children: [
                                  t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_START"),
                                  jsxRuntime.jsx("span", {
                                      "data-supertokens": "link",
                                      onClick: onSignInUpSwitcherClick,
                                      children: t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_SIGN_UP_LINK"),
                                  }),
                                  t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_END"),
                              ],
                          })
                        : jsxRuntime.jsxs("div", {
                              "data-supertokens": "headerSubtitle secondaryText",
                              children: [
                                  t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_START"),
                                  jsxRuntime.jsx("span", {
                                      "data-supertokens": "link",
                                      onClick: onSignInUpSwitcherClick,
                                      children: t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_SIGN_IN_LINK"),
                                  }),
                                  t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_END"),
                              ],
                          })),
                jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
            ],
        });
    }
);

function AuthPageTheme(props) {
    if (props.fullPageCompWithPreloadedInfo) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, {
            children: props.fullPageCompWithPreloadedInfo.component({
                ...props,
                preloadInfo: props.fullPageCompWithPreloadedInfo.preloadInfo,
            }),
        });
    }
    return jsxRuntime.jsxs("div", {
        "data-supertokens": `container authPage ${props.factorIds.length > 1 ? "multiFactor" : "singleFactor"}`,
        children: [
            jsxRuntime.jsxs("div", {
                "data-supertokens": "row",
                children: [
                    jsxRuntime.jsx(AuthPageHeader, {
                        factorIds: props.factorIds,
                        isSignUp: props.isSignUp,
                        onSignInUpSwitcherClick: props.onSignInUpSwitcherClick,
                        hasSeparateSignUpView: props.hasSeparateSignUpView,
                        resetFactorList: props.resetFactorList,
                        showBackButton: props.showBackButton,
                    }),
                    props.error !== undefined && jsxRuntime.jsx(GeneralError, { error: props.error }),
                    jsxRuntime.jsx(AuthPageComponentList, { ...props }),
                    jsxRuntime.jsx(AuthPageFooter, {
                        factorIds: props.factorIds,
                        isSignUp: props.isSignUp,
                        hasSeparateSignUpView: props.hasSeparateSignUpView,
                        privacyPolicyLink: props.privacyPolicyLink,
                        termsOfServiceLink: props.termsOfServiceLink,
                    }),
                ],
            }),
            jsxRuntime.jsx(SuperTokensBranding, {}),
        ],
    });
}
function AuthPageThemeWrapper(props) {
    const rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    const hasFont = hasFontDefined(rootStyle);
    return jsxRuntime.jsx(UserContextWrapper, {
        userContext: props.userContext,
        children: jsxRuntime.jsx(ThemeBase, {
            loadDefaultFont: !hasFont,
            userStyles: [rootStyle],
            children: jsxRuntime.jsx(AuthPageTheme, { ...props }),
        }),
    });
}

const errorQSMap = {
    signin: "SOMETHING_WENT_WRONG_ERROR",
    no_email_present: "THIRD_PARTY_ERROR_NO_EMAIL",
    restart_link: "ERROR_SIGN_IN_UP_LINK",
};
const AuthPageWrapper = (props) => {
    const authRecipeComponentOverrides = useContext();
    return jsxRuntime.jsx(UserContextProvider, {
        userContext: props.userContext,
        children: jsxRuntime.jsx(SessionAuthWrapper, {
            requireAuth: false,
            doRedirection: false,
            children: jsxRuntime.jsx(ComponentOverrideContext.Provider, {
                value: authRecipeComponentOverrides,
                children: jsxRuntime.jsx(AuthPageInner, { ...props }),
            }),
        }),
    });
};
const AuthPageInner = (props) => {
    if (props.factors !== undefined && props.factors.length === 0) {
        throw new Error("The factors array cannot be empty");
    }
    const windowHandler$1 = windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler;
    const search = new URLSearchParams(windowHandler$1.location.getSearch());
    const showStringFromQS = search.get("show");
    const isSignUpFromQS =
        props.useSignUpStateFromQueryString !== true || showStringFromQS === null
            ? undefined
            : showStringFromQS === "signup";
    let errorFromQS =
        search.get("error") !== null ? search.get("message") ?? search.get("error") ?? undefined : undefined;
    errorFromQS = errorFromQS !== undefined ? errorQSMap[errorFromQS] ?? errorFromQS : undefined;
    const showStringFromQSRef = React.useRef(showStringFromQS);
    const errorFromQSRef = React.useRef(errorFromQS);
    const sessionContext = useSessionContext();
    const userContext = useUserContext();
    const rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    const [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods] = React.useState(undefined);
    const [error, setError] = React.useState(errorFromQS);
    const [sessionLoadedAndNotRedirecting, setSessionLoadedAndNotRedirecting] = React.useState(false);
    const st = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow();
    const [factorList, setFactorList] = React.useState(props.factors);
    const [isSignUp, setIsSignUp] = React.useState(props.isSignUp ?? isSignUpFromQS ?? st.defaultToSignUp);
    // We use this to signal that we need to update the components we show on screen
    const [rebuildReqCount, setRebuildReqCount] = React.useState(0);
    const lastBuild = React.useRef({ buildReq: undefined });
    React.useEffect(() => {
        if (props.useSignUpStateFromQueryString && showStringFromQSRef.current !== showStringFromQS) {
            const isSignUpFromQS =
                props.useSignUpStateFromQueryString !== true || showStringFromQS === null
                    ? undefined
                    : showStringFromQS === "signup";
            showStringFromQSRef.current = showStringFromQS;
            const newIsSignUpVal = isSignUpFromQS ?? st.defaultToSignUp;
            if (isSignUp !== newIsSignUpVal) {
                setIsSignUp(newIsSignUpVal);
                setRebuildReqCount((v) => v + 1);
            }
        }
    });
    React.useEffect(() => {
        if (errorFromQSRef.current !== errorFromQS) {
            errorFromQSRef.current = errorFromQS;
            setError(errorFromQS);
        }
    });
    const onSignInUpSwitcherClick = React.useCallback(() => {
        if (props.useSignUpStateFromQueryString === true) {
            genericComponentOverrideContext.updateQueryParam("show", isSignUp ? "signin" : "signup");
        }
        setError(undefined);
        setIsSignUp(!isSignUp);
        setRebuildReqCount((v) => v + 1);
    }, [isSignUp, setIsSignUp, setRebuildReqCount, setError, props.useSignUpStateFromQueryString]);
    React.useEffect(() => {
        if (loadedDynamicLoginMethods) {
            return;
        }
        genericComponentOverrideContext.Multitenancy.getInstanceOrThrow()
            .getCurrentDynamicLoginMethods({ userContext })
            .then(
                (loginMethods) => setLoadedDynamicLoginMethods(loginMethods),
                (err) => rethrowInRender(err)
            );
    }, [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods]);
    React.useEffect(() => {
        if (sessionLoadedAndNotRedirecting) {
            return;
        }
        // we want to do this just once, so we supply it with only the loading state.
        // if we supply it with props, sessionContext, then once the user signs in, then this will route the
        // user to the dashboard, as opposed to the sign up / sign in functions.
        if (sessionContext.loading === false) {
            if (sessionContext.doesSessionExist) {
                if (props.onSessionAlreadyExists !== undefined) {
                    props.onSessionAlreadyExists();
                } else if (props.redirectOnSessionExists !== false) {
                    types.Session.getInstanceOrThrow().config.onHandleEvent({
                        action: "SESSION_ALREADY_EXISTS",
                    });
                    void types.Session.getInstanceOrThrow()
                        .validateGlobalClaimsAndHandleSuccessRedirection(
                            undefined,
                            types.Session.RECIPE_ID, // TODO
                            genericComponentOverrideContext.getRedirectToPathFromURL(),
                            userContext,
                            props.navigate
                        )
                        .catch(rethrowInRender);
                } else {
                    setSessionLoadedAndNotRedirecting(true);
                }
            } else {
                setSessionLoadedAndNotRedirecting(true);
            }
        }
    }, [sessionContext.loading]);
    const [authComponentListInfo, setAuthComponentListInfo] = React.useState();
    const showUseAnotherLink =
        factorList !== undefined &&
        (props.factors === undefined || props.factors.some((id) => !factorList.includes(id)));
    const stInstance = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow();
    const privacyPolicyLink = stInstance.privacyPolicyLink;
    const termsOfServiceLink = stInstance.termsOfServiceLink;
    React.useEffect(() => {
        const abortCtl = new AbortController();
        if (lastBuild.current.buildReq === rebuildReqCount) {
            return;
        }
        if (
            sessionLoadedAndNotRedirecting &&
            (loadedDynamicLoginMethods !== undefined ||
                !genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods)
        ) {
            void buildAndSetChildProps(
                props.preBuiltUIList,
                loadedDynamicLoginMethods,
                userContext,
                factorList,
                isSignUp,
                setAuthComponentListInfo,
                abortCtl.signal
            ).then(() => {
                lastBuild.current.buildReq = rebuildReqCount;
            }, rethrowInRender);
        }
        return () => {
            abortCtl.abort();
        };
    }, [
        sessionLoadedAndNotRedirecting,
        rebuildReqCount,
        setRebuildReqCount,
        props.preBuiltUIList,
        loadedDynamicLoginMethods,
        userContext,
        factorList,
        isSignUp,
        setAuthComponentListInfo,
        rethrowInRender,
    ]);
    const childProps =
        authComponentListInfo !== undefined
            ? {
                  ...authComponentListInfo,
                  error,
                  onError: (err) => {
                      setError(err);
                  },
                  clearError: () => setError(undefined),
                  navigate: props.navigate,
                  onSignInUpSwitcherClick,
                  privacyPolicyLink,
                  rebuildAuthPage: () => setRebuildReqCount((v) => v + 1),
                  setFactorList: (factorIds) => {
                      setFactorList(factorIds);
                      setRebuildReqCount((v) => v + 1);
                  },
                  resetFactorList: () => {
                      setFactorList(props.factors);
                      setRebuildReqCount((v) => v + 1);
                  },
                  showBackButton: showUseAnotherLink,
                  termsOfServiceLink,
                  userContext,
              }
            : undefined;
    const mergedTranslations = React.useMemo(() => {
        let res = defaultTranslationsCommon;
        if (authComponentListInfo !== undefined) {
            for (const ui of props.preBuiltUIList) {
                res = genericComponentOverrideContext.mergeObjects(res, ui.languageTranslations);
            }
        }
        res = genericComponentOverrideContext.mergeObjects(res, st.languageTranslations.userTranslationStore);
        return res;
    }, [st.languageTranslations.userTranslationStore, authComponentListInfo]);
    if (childProps === undefined) {
        return jsxRuntime.jsx(DynamicLoginMethodsSpinner, {});
    } else {
        return jsxRuntime.jsx(DynamicLoginMethodsProvider, {
            value: loadedDynamicLoginMethods,
            children: jsxRuntime.jsx(translationContext.TranslationContextProvider, {
                defaultLanguage: st.languageTranslations.defaultLanguage,
                defaultStore: mergedTranslations,
                translationControlEventSource: st.languageTranslations.translationEventSource,
                userTranslationFunc: st.languageTranslations.userTranslationFunc,
                children: jsxRuntime.jsx(WithOrWithoutShadowDom, {
                    useShadowDom: st.useShadowDom,
                    children: jsxRuntime.jsxs(React.Fragment, {
                        children: [
                            props.children === undefined && jsxRuntime.jsx(AuthPageThemeWrapper, { ...childProps }),
                            props.children &&
                                React__default.default.Children.map(props.children, (child) => {
                                    if (React__default.default.isValidElement(child)) {
                                        return React__default.default.cloneElement(child, childProps);
                                    }
                                    return child;
                                }),
                        ],
                    }),
                }),
            }),
        });
    }
};
async function buildAndSetChildProps(
    recipeRouters,
    loadedDynamicLoginMethods,
    userContext,
    factorListState,
    isSignUpState,
    setComponentListInfo,
    abort
) {
    const authRecipesInited = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().recipeList.filter(
        (recipe) => "firstFactorIds" in recipe
    );
    // The first factors list we show is a fallback:
    let firstFactors =
        factorListState ?? // First we use the in-memory list (initialized to whatever we get from props)
        loadedDynamicLoginMethods?.firstFactors ?? // or the tenant config
        recipe.MultiFactorAuth.getInstance()?.config.firstFactors ?? // or the static config from the MFA recipe
        authRecipesInited.reduce((acc, recipe) => [...acc, ...recipe.getFirstFactorsForAuthPage()], []); // or we show everything we have initialized
    if (
        factorListState === undefined &&
        loadedDynamicLoginMethods?.firstFactors === undefined &&
        recipe.MultiFactorAuth.getInstance()?.config.firstFactors === undefined
    ) {
        const missingPreBuiltUIs = authRecipesInited.filter(
            (recipe) => !recipeRouters.some((router) => router.recipeInstance.recipeID === recipe.recipeID)
        );
        if (missingPreBuiltUIs.length > 0) {
            // In this case we'd most likely throw anyway (except in the case of EP+Pwless), but we want to provide a better error message
            throw new Error(
                `Factor list not set but PreBuiltUI not added for ${missingPreBuiltUIs.map((r) => r.recipeID)}`
            );
        }
    }
    if (firstFactors.includes(types.FactorIds.THIRDPARTY)) {
        // we get the thirdparty recipe here like this, because importing the recipe here would heavily increase the bundle size of many recipes
        const thirdPartyPreBuiltUI = recipeRouters.find(
            (r) => r.recipeInstance.recipeID === types.FactorIds.THIRDPARTY
        );
        // here we ignore if we couldn't find the necessary prebuilt UI, because we want to throw in the standard location
        if (thirdPartyPreBuiltUI !== undefined) {
            // We remove the thirdparty factor if:
            //  We have no provider defined on the client side and
            //  We have no provider defined for the tenant either
            if (
                thirdPartyPreBuiltUI.recipeInstance.config.signInAndUpFeature.providers.length === 0 &&
                (!genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods ||
                    loadedDynamicLoginMethods.thirdparty.providers.length === 0)
            ) {
                firstFactors = firstFactors.filter((f) => f !== types.FactorIds.THIRDPARTY);
            }
        }
    }
    // We want only want to show a separate sign up view if there is a UI that both:
    // 1. requires showing a separate sign up page (i.e.: emailpassword)
    // 2. overlaps with the first factors list
    const hasSeparateSignUpView = recipeRouters.some(
        (ui) => ui.requiresSignUpPage && ui.recipeInstance.firstFactorIds.some((id) => firstFactors.includes(id))
    );
    const isSignUp = hasSeparateSignUpView && isSignUpState;
    const authComps = [];
    for (const ui of recipeRouters) {
        authComps.push(...ui.getAuthComponents());
    }
    for (const a of authComps) {
        if (a.type === "FULL_PAGE") {
            const preloadRes = await a.preloadInfoAndRunChecks(firstFactors, userContext);
            // We skip setting if the auth page unmounted while we were checking
            // if we should show any full page comps
            if (abort.aborted) {
                return;
            }
            if (preloadRes.shouldDisplay) {
                setComponentListInfo({
                    authComponents: [],
                    fullPageCompWithPreloadedInfo: {
                        component: a.component,
                        preloadInfo: preloadRes.preloadInfo,
                    },
                    isSignUp,
                    hasSeparateSignUpView,
                    factorIds: firstFactors,
                });
                return;
            }
        }
    }
    if (abort.aborted) {
        // We stop if the auth page unmounted while we were checking if we should show any full page comps
        return;
    }
    // We check all the full page comps above, so we can focus on building an auth page from partials
    let partialAuthComps = authComps.filter(
        (c) => c.type !== "FULL_PAGE" && c.factorIds.every((id) => firstFactors.includes(id))
    );
    partialAuthComps = partialAuthComps.filter(
        (c) =>
            c.type === "SIGN_IN_UP" || // sign in+up components show in all cases
            (isSignUp ? c.type === "SIGN_UP" : c.type === "SIGN_IN") // otherwise we check if the sign up state is appropriate
    );
    // We sort the auth components by the number of factors they cover, DESC
    // This helps us choose combination components (ep+pwless) first
    partialAuthComps.sort((a, b) => b.factorIds.length - a.factorIds.length);
    const selectedComponents = utils.selectComponentsToCoverAllFirstFactors(partialAuthComps, firstFactors);
    if (selectedComponents === undefined) {
        throw new Error("Couldn't cover all first factors");
    }
    setComponentListInfo({
        authComponents: selectedComponents.sort((a, b) => a.displayOrder - b.displayOrder).map((w) => w.component),
        factorIds: firstFactors,
        hasSeparateSignUpView,
        isSignUp,
    });
}

// The related ADR: https://supertokens.com/docs/contribute/decisions/multitenancy/0006
const priorityOrder = [
    {
        rid: "thirdpartyemailpassword",
        includes: ["thirdparty", "emailpassword"],
        factorsProvided: [types.FactorIds.THIRDPARTY, types.FactorIds.EMAILPASSWORD],
    },
    {
        rid: "thirdpartypasswordless",
        includes: ["thirdparty", "passwordless"],
        factorsProvided: [
            types.FactorIds.THIRDPARTY,
            types.FactorIds.OTP_PHONE,
            types.FactorIds.OTP_EMAIL,
            types.FactorIds.LINK_PHONE,
            types.FactorIds.LINK_EMAIL,
        ],
    },
    { rid: "emailpassword", includes: ["emailpassword"], factorsProvided: [types.FactorIds.EMAILPASSWORD] },
    {
        rid: "passwordless",
        includes: ["passwordless"],
        factorsProvided: [
            types.FactorIds.OTP_PHONE,
            types.FactorIds.OTP_EMAIL,
            types.FactorIds.LINK_PHONE,
            types.FactorIds.LINK_EMAIL,
        ],
    },
    { rid: "thirdparty", includes: ["thirdparty"], factorsProvided: [types.FactorIds.THIRDPARTY] },
];
function chooseComponentBasedOnFirstFactors(firstFactors, routeComponents) {
    let fallbackRid;
    let fallbackComponent;
    // We first try to find an exact match, and fall back on something that covers all factors (but maybe more)
    /*
        Examples:
            1. firstFactors: emailpassword, route components from: thirdparty ->
                - no matches found, throwing error

            2. firstFactors: emailpassword, route components from: thirdpartyemailpassword ->
                - we find thirdpartyemailpassword covers all first factors, save it as fallback
                - we check all other recipes, bot nothing else has matching components
                - return fallback from TPEP

            3. firstFactors: emailpassword, route components from: thirdpartyemailpassword, emailpassword ->
                - we find thirdpartyemailpassword covers all first factors, save it as fallback
                - we find emailpassword as an exact match and return it

            4. firstFactors: otp-phone, route components from: thirdpartypasswordless, passwordless, thirdparty ->
                - we find thirdpartypasswordless covers all first factors (but more), save it as fallback
                - we find passwordless that covers all factors (but more), saving it as a fallback.
                  Keep in mind, that the passwordless and thirdpartypasswordless recipe provides 4 factors, so this is not an exact match.
                - no other recipes have matching components, so we return the fallback from passwordless

            5. firstFactors: thirdparty, otp-phone, route components from: thirdpartypasswordless, passwordless, thirdparty ->
                - we find thirdpartypasswordless covers all first factors (but more), save it as fallback
                  this is not an exact match, because thirdpartypasswordless provides multiple passwordless factors.
                - no other recipes cover all factors, so we return the fallback from thirdpartypasswordless
    */
    for (const { rid, factorsProvided } of priorityOrder) {
        if (firstFactors.every((factor) => factorsProvided.includes(factor))) {
            const matchingComp = routeComponents.find((comp) => comp.recipeID === rid);
            if (matchingComp) {
                fallbackRid = rid;
                fallbackComponent = matchingComp;
                if (firstFactors.length === factorsProvided.length) {
                    genericComponentOverrideContext.logDebugMessage(
                        `Rendering ${rid} because it matches factors: ${firstFactors} exactly`
                    );
                    return matchingComp;
                }
            }
        }
    }
    if (fallbackComponent !== undefined) {
        genericComponentOverrideContext.logDebugMessage(
            `Rendering ${fallbackRid} to cover ${firstFactors} as a fallback`
        );
        return fallbackComponent;
    }
    // We may get here if:
    // - The backend/tenantconfig is older and didn't have the firstFactors array defined
    // - There is a configuration error
    // We choose not to throw in the configuration error case because:
    // - we can't tell these cases apart after the firstFactors array was made a requrired prop
    // - we want to maintain backwards compatbility
    // Here we replicate the old logic we had before the firstFactors array
    const enabledLoginMethods = [];
    if (firstFactors.includes(types.FactorIds.EMAILPASSWORD)) {
        enabledLoginMethods.push("emailpassword");
    }
    if (firstFactors.includes(types.FactorIds.THIRDPARTY)) {
        enabledLoginMethods.push("thirdparty");
    }
    if (
        [
            types.FactorIds.OTP_PHONE,
            types.FactorIds.OTP_EMAIL,
            types.FactorIds.LINK_PHONE,
            types.FactorIds.LINK_EMAIL,
        ].some((pwlessFactorId) => firstFactors.includes(pwlessFactorId))
    ) {
        enabledLoginMethods.push("passwordless");
    }
    genericComponentOverrideContext.logDebugMessage(
        `Choosing component using fallback logic w/ ${enabledLoginMethods.join(", ")} enabled`
    );
    const enabledRecipeCount = enabledLoginMethods.length;
    // We try and choose which component to show based on the enabled login methods
    // We first try to find an exact match (a recipe that covers all enabled login methods and nothing else)
    for (const { rid, includes } of priorityOrder) {
        if (
            enabledRecipeCount === includes.length &&
            includes.every((subRId) => enabledLoginMethods.includes(subRId))
        ) {
            const matchingComp = routeComponents.find((comp) => comp.recipeID === rid);
            if (matchingComp) {
                return matchingComp;
            }
        }
    }
    // We try to find a partial match (so any recipe that overlaps with the enabled login methods)
    for (const { rid, includes } of priorityOrder) {
        if (includes.some((subRId) => enabledLoginMethods.includes(subRId))) {
            const matchingComp = routeComponents.find((comp) => comp.recipeID === rid);
            if (matchingComp) {
                return matchingComp;
            }
        }
    }
    throw new Error("No enabled recipes overlap with the requested firstFactors: " + firstFactors);
}
class RecipeRouter {
    pathsToFeatureComponentWithRecipeIdMap;
    static getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
        normalisedUrl,
        preBuiltUIList,
        defaultToStaticList,
        dynamicLoginMethods
    ) {
        const path = normalisedUrl.getAsStringDangerous();
        // We check if we are on the auth page to later see if we should take first factors into account.
        const isAuthPage =
            path ===
            genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().appInfo.websiteBasePath.getAsStringDangerous();
        // We get all components that can handle the current path
        const routeComponents = preBuiltUIList.reduce((components, c) => {
            const routes = c.getPathsToFeatureComponentWithRecipeIdMap();
            for (const [routePath, routeComps] of Object.entries(routes)) {
                if (
                    routePath === path ||
                    new RegExp("^" + routePath.replace(/:\w+/g, "[^/]+").replace(/\/\*/g, "/[^/]+") + "$").test(path)
                ) {
                    components = components.concat(
                        routeComps.map((c) => {
                            return { comp: c, route: routePath };
                        })
                    );
                }
            }
            return components;
        }, []);
        // We check the query params to see if any recipe was requested by id
        const componentMatchingRid = routeComponents.find((c) => c.comp.matches());
        // We default to to one requested by id or the first in the list
        // i.e.: the first prebuilt ui in the list the user provided that can handle this route.
        let defaultComp;
        if (routeComponents.length === 0) {
            defaultComp = undefined;
        } else if (componentMatchingRid !== undefined) {
            defaultComp = componentMatchingRid.comp;
        } else {
            defaultComp = routeComponents[0].comp;
        }
        // We check if any non-auth recipe (emailverification, totp) can handle this
        // There should be no overlap between the routes handled by those and the auth recipes
        // so if there is a match we can return early
        const matchingNonAuthComponent = routeComponents.find((comp) => {
            const ridlist = priorityOrder.map((a) => a.rid);
            return (
                !ridlist.includes(comp.comp.recipeID) ||
                comp.route !==
                    genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().appInfo.websiteBasePath.getAsStringDangerous()
            );
        });
        if (matchingNonAuthComponent) {
            return matchingNonAuthComponent.comp;
        }
        // We use this option in `canHandleRoute`, because it may be called by custom UIs before
        // dynamic login methods are loaded.
        if (defaultToStaticList) {
            return defaultComp;
        }
        const mfaRecipe = recipe.MultiFactorAuth.getInstance();
        if (genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods === false) {
            // If we are not using dynamic login methods, we can use the rid requested by the app
            if (componentMatchingRid) {
                return componentMatchingRid.comp;
            }
            // if we have a static firstFactors config we take it into account on the auth page
            // Other pages shouldn't care about this configuration.
            // Embedded components are not affected, since this is only called by the routing component.
            if (isAuthPage && mfaRecipe && mfaRecipe.config.firstFactors !== undefined) {
                return chooseComponentBasedOnFirstFactors(
                    mfaRecipe.config.firstFactors,
                    routeComponents.map((c) => c.comp)
                );
            } else {
                return defaultComp;
            }
        }
        if (dynamicLoginMethods === undefined) {
            throw new Error(
                "Should never come here: dynamic login methods info has not been loaded but recipeRouter rendered"
            );
        }
        // If we are using dynamic login methods, we check that the requested rid belongs to an enabled recipe
        if (
            componentMatchingRid && // if we find a component matching by rid
            (!priorityOrder.map((a) => a.rid).includes(componentMatchingRid.comp.recipeID) || // from a non-auth recipe
                priorityOrder.some(
                    (a) =>
                        a.rid === componentMatchingRid.comp.recipeID &&
                        a.factorsProvided.some((factorId) => dynamicLoginMethods.firstFactors.includes(factorId))
                )) // or an enabled auth recipe
        ) {
            return componentMatchingRid.comp;
        }
        // if we have a firstFactors config for the tenant we take it into account on the auth page
        // Other pages shouldn't care about this configuration.
        // Embedded components are not affected, since this is only called by the routing component.
        if (isAuthPage) {
            return chooseComponentBasedOnFirstFactors(
                dynamicLoginMethods.firstFactors,
                routeComponents.map((c) => c.comp)
            );
        }
        return undefined;
    }
    getPathsToFeatureComponentWithRecipeIdMap = () => {
        // Memoized version of the map.
        if (this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
            return this.pathsToFeatureComponentWithRecipeIdMap;
        }
        const pathsToFeatureComponentWithRecipeIdMap = {};
        const features = this.getFeatures();
        const featurePaths = Object.keys(features);
        for (let j = 0; j < featurePaths.length; j++) {
            // If no components yet for this route, initialize empty array.
            const featurePath = featurePaths[j];
            if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
            }
            pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
        }
        this.pathsToFeatureComponentWithRecipeIdMap = pathsToFeatureComponentWithRecipeIdMap;
        return this.pathsToFeatureComponentWithRecipeIdMap;
    };
    requiresSignUpPage = false;
}

function RoutingComponent(props) {
    const userContext = useUserContext();
    const rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    const [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods] = React.useState(undefined);
    const navigate = props.getReactRouterDomWithCustomHistory()?.useHistoryCustom();
    const path = props.path;
    const isAuthPage =
        path ===
        genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().appInfo.websiteBasePath.getAsStringDangerous();
    const location = props.getReactRouterDomWithCustomHistory()?.useLocation();
    const componentToRender = React__default.default.useMemo(() => {
        if (isAuthPage) {
            return;
        }
        const normalizedPath = new NormalisedURLPath__default.default(path);
        // During development, this runs twice so as to warn devs of if there
        // are any side effects that happen here. So in tests, it will result in
        // the console log twice
        if (
            loadedDynamicLoginMethods !== undefined ||
            genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods === false
        ) {
            const result = RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                normalizedPath,
                props.preBuiltUIList,
                false,
                loadedDynamicLoginMethods
            );
            if (result === undefined && genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods === true) {
                void redirectToAuth({ navigate, redirectBack: false });
            }
            return result;
        }
        return undefined;
        // location dependency needs to be kept in order to get new component on url change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, location, loadedDynamicLoginMethods, props.preBuiltUIList]);
    React.useEffect(() => {
        if (loadedDynamicLoginMethods) {
            return;
        }
        genericComponentOverrideContext.Multitenancy.getInstanceOrThrow()
            .getCurrentDynamicLoginMethods({ userContext })
            .then(
                (loginMethods) => setLoadedDynamicLoginMethods(loginMethods),
                (err) => rethrowInRender(err)
            );
    }, [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods]);
    if (isAuthPage) {
        return jsxRuntime.jsx(AuthPageWrapper, {
            preBuiltUIList: props.preBuiltUIList,
            navigate: navigate,
            useSignUpStateFromQueryString: true,
        });
    }
    if (
        genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods &&
        loadedDynamicLoginMethods === undefined
    ) {
        return jsxRuntime.jsx(DynamicLoginMethodsSpinner, {});
    }
    if (
        componentToRender === undefined ||
        (loadedDynamicLoginMethods === undefined && genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods)
    ) {
        return null;
    }
    return jsxRuntime.jsx(componentToRender.component, { navigate: navigate });
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDom$1({ getReactRouterDomWithCustomHistory, recipeList, basePath }) {
    const routerInfo = getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    const Route = routerInfo.router.Route;
    const routes = Object.values(
        recipeList.reduce((routes, recipe) => {
            const pathsToFeatureComponentWithRecipeIdMap = recipe.getPathsToFeatureComponentWithRecipeIdMap();
            Object.keys(pathsToFeatureComponentWithRecipeIdMap).forEach((path) => {
                path = path === "" ? "/" : path;
                const pathForRouter = getPathForRouter$1(basePath, path);
                if (!(path in routes)) {
                    routes[path] = jsxRuntime.jsx(
                        Route,
                        {
                            exact: true,
                            path: pathForRouter,
                            children: jsxRuntime.jsx(RoutingComponent, {
                                getReactRouterDomWithCustomHistory: getReactRouterDomWithCustomHistory,
                                preBuiltUIList: recipeList,
                                path: path,
                            }),
                        },
                        `st-${path}`
                    );
                }
            });
            return routes;
        }, {})
    );
    if (
        !genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().disableAuthRoute &&
        recipeList.some((ui) => ui.getAuthComponents().length !== 0)
    ) {
        const path = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(new NormalisedURLPath__default$1.default("/"))
            .getAsStringDangerous();
        routes.push(
            jsxRuntime.jsx(
                Route,
                {
                    exact: true,
                    path: getPathForRouter$1(basePath, path),
                    children: jsxRuntime.jsx(RoutingComponent, {
                        getReactRouterDomWithCustomHistory: getReactRouterDomWithCustomHistory,
                        preBuiltUIList: recipeList,
                        path: path,
                    }),
                },
                "st-/auth"
            )
        );
    }
    return routes;
}
function getPathForRouter$1(basePath, path) {
    let pathForRouter = path;
    if (basePath !== undefined) {
        if (pathForRouter.startsWith(basePath)) {
            pathForRouter = pathForRouter.slice(basePath.length);
            if (!pathForRouter.startsWith("/")) {
                pathForRouter = "/" + pathForRouter;
            }
        } else {
            throw new Error("basePath has to be a prefix of websiteBasePath passed to SuperTokens.init");
        }
    }
    return pathForRouter;
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDomV6({ getReactRouterDomWithCustomHistory, recipeList, basePath }) {
    const routerInfo = getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    const Route = routerInfo.router.Route;
    const routes = Object.values(
        recipeList.reduce((routes, recipe) => {
            const pathsToFeatureComponentWithRecipeIdMap = recipe.getPathsToFeatureComponentWithRecipeIdMap();
            Object.keys(pathsToFeatureComponentWithRecipeIdMap).forEach((path) => {
                path = path === "" ? "/" : path;
                const pathForRouter = getPathForRouter(basePath, path);
                if (!(path in routes)) {
                    routes[path] = jsxRuntime.jsx(
                        Route,
                        {
                            path: pathForRouter,
                            element: jsxRuntime.jsx(RoutingComponent, {
                                getReactRouterDomWithCustomHistory: getReactRouterDomWithCustomHistory,
                                preBuiltUIList: recipeList,
                                path: path,
                            }),
                        },
                        `st-${path}`
                    );
                }
            });
            return routes;
        }, {})
    );
    if (
        !genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().disableAuthRoute &&
        recipeList.some((ui) => ui.getAuthComponents().length !== 0)
    ) {
        const path = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(new NormalisedURLPath__default$1.default("/"))
            .getAsStringDangerous();
        routes.push(
            jsxRuntime.jsx(
                Route,
                {
                    path: getPathForRouter(basePath, path),
                    element: jsxRuntime.jsx(RoutingComponent, {
                        getReactRouterDomWithCustomHistory: getReactRouterDomWithCustomHistory,
                        preBuiltUIList: recipeList,
                        path: path,
                    }),
                },
                "st-/auth"
            )
        );
    }
    return routes;
}
function getPathForRouter(basePath, path) {
    if (basePath !== undefined) {
        if (path.startsWith(basePath)) {
            path = path.slice(basePath.length);
            if (!path.startsWith("/")) {
                path = "/" + path;
            }
        } else {
            throw new Error("basePath has to be a prefix of websiteBasePath passed to SuperTokens.init");
        }
    }
    return path;
}

class UI {
    static reactRouterDom;
    static reactRouterDomIsV6;
    static getSuperTokensRoutesForReactRouterDom(reactRouterDom, preBuiltUiClassList = [], basePath) {
        if (reactRouterDom === undefined || preBuiltUiClassList.length === 0) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getSuperTokensRoutesForReactRouterDom like getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [EmailPasswordPreBuiltUI]) in your render function'
            );
        }
        const recipeList = preBuiltUiClassList.map((r) => r.getInstanceOrInitAndGetInstance());
        if (UI.reactRouterDomIsV6 === undefined) {
            UI.reactRouterDomIsV6 = reactRouterDom.withRouter === undefined;
        }
        if (UI.reactRouterDomIsV6) {
            if (UI.reactRouterDom === undefined) {
                // this function wraps the react-router-dom v6 useNavigate function in a way
                // that enforces that it runs within a useEffect. The reason we do this is
                // cause of https://github.com/remix-run/react-router/issues/7460
                // which gets shown when visiting a social auth callback url like
                // /auth/callback/github, without a valid code or state. This then
                // doesn't navigate the user to the auth page.
                const useNavigateHookForRRDV6 = function () {
                    const navigateHook = reactRouterDom.useNavigate();
                    const [to, setTo] = React__default.default.useState(undefined);
                    React__default.default.useEffect(() => {
                        if (to !== undefined) {
                            setTo(undefined);
                            navigateHook(to);
                        }
                    }, [to, navigateHook, setTo]);
                    return setTo;
                };
                UI.reactRouterDom = {
                    router: reactRouterDom,
                    useHistoryCustom: useNavigateHookForRRDV6,
                    useLocation: reactRouterDom.useLocation,
                };
            }
            return getSuperTokensRoutesForReactRouterDomV6({
                getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
                recipeList,
                basePath,
            });
        }
        if (UI.reactRouterDom === undefined) {
            UI.reactRouterDom = {
                router: reactRouterDom,
                useHistoryCustom: reactRouterDom.useHistory,
                useLocation: reactRouterDom.useLocation,
            };
        }
        return getSuperTokensRoutesForReactRouterDom$1({
            getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
            recipeList,
            basePath,
        });
    }
    static getReactRouterDomWithCustomHistory = () => {
        return UI.reactRouterDom;
    };
    static canHandleRoute(preBuiltUiClassList) {
        const recipeList = preBuiltUiClassList.map((r) => r.getInstanceOrInitAndGetInstance());
        const path = genericComponentOverrideContext.getCurrentNormalisedUrlPath().getAsStringDangerous();
        const isAuthPage =
            path ===
            genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().appInfo.websiteBasePath.getAsStringDangerous();
        if (isAuthPage) {
            return !genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().disableAuthRoute;
        }
        return (
            RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                genericComponentOverrideContext.getCurrentNormalisedUrlPath(),
                recipeList,
                true
            ) !== undefined
        );
    }
    static getRoutingComponent(preBuiltUiClassList) {
        const recipeList = preBuiltUiClassList.map((r) => r.getInstanceOrInitAndGetInstance());
        return jsxRuntime.jsx(RoutingComponent, {
            getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
            path: genericComponentOverrideContext.getCurrentNormalisedUrlPath().getAsStringDangerous(),
            preBuiltUIList: recipeList,
        });
    }
    static AuthPage = (props) =>
        jsxRuntime.jsx(AuthPageWrapper, {
            ...props,
            preBuiltUIList: props.preBuiltUIList.map((r) => r.getInstanceOrInitAndGetInstance()),
        });
    static AuthPageTheme = AuthPageTheme;
    static AuthPageFooter = AuthPageFooter;
    static AuthPageHeader = AuthPageHeader;
    static AuthPageComponentList = AuthPageComponentList;
    static AuthRecipeComponentsOverrideContextProvider = Provider;
}
const getSuperTokensRoutesForReactRouterDom = UI.getSuperTokensRoutesForReactRouterDom;
const canHandleRoute = UI.canHandleRoute;
const getRoutingComponent = UI.getRoutingComponent;
const AuthPage = UI.AuthPage;

const SessionAuth = ({ children, ...props }) => {
    const requireAuth = React.useRef(props.requireAuth);
    if (props.requireAuth !== requireAuth.current) {
        throw new Error(
            // eslint-disable-next-line @typescript-eslint/quotes
            'requireAuth prop should not change. If you are seeing this, it probably means that you are using SessionAuth in multiple routes with different values for requireAuth. To solve this, try adding the "key" prop to all uses of SessionAuth like <SessionAuth key="someUniqueKeyPerRoute" requireAuth={...}>'
        );
    }
    // Reusing the parent context was removed because it caused a redirect loop in an edge case
    // because it'd also reuse the invalid claims part until it loaded.
    const [context, setContext] = React.useState({ loading: true });
    const session = React.useRef();
    // We store this here, to prevent the list of called hooks changing even if a navigate hook is added later to SuperTokens.
    const navigateHookRef = React.useRef(UI.getReactRouterDomWithCustomHistory()?.useHistoryCustom);
    let navigate;
    try {
        if (navigateHookRef.current) {
            navigate = navigateHookRef.current();
        }
    } catch {
        // We catch and ignore errors here, because this is may throw if
        // the app is using react-router-dom but added a session auth outside of the router.
    }
    const userContext = useUserContext();
    const rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    const redirectToLogin = React.useCallback(() => {
        void genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
            navigate,
            userContext,
            redirectBack: true,
        });
    }, []);
    const buildContext = React.useCallback(async () => {
        if (session.current === undefined) {
            session.current = types.Session.getInstanceOrThrow();
        }
        const sessionExists = await session.current.doesSessionExist({
            userContext,
        });
        if (sessionExists === false) {
            return {
                loading: false,
                doesSessionExist: false,
                accessTokenPayload: {},
                invalidClaims: [],
                userId: "",
            };
        }
        let invalidClaims;
        try {
            invalidClaims = await session.current.validateClaims({
                overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                userContext,
            });
        } catch (err) {
            // These errors should only come from getAccessTokenPayloadSecurely inside validateClaims if refreshing a claim cleared the session
            // Which means that the session was most likely cleared, meaning returning false is right.
            // This might also happen if the user provides an override or a custom claim validator that throws (or if we have a bug)
            // In which case the session will not be cleared so we rethrow the error
            if (
                await session.current.doesSessionExist({
                    userContext,
                })
            ) {
                throw err;
            }
            return {
                loading: false,
                doesSessionExist: false,
                accessTokenPayload: {},
                invalidClaims: [],
                userId: "",
            };
        }
        try {
            return {
                loading: false,
                doesSessionExist: true,
                invalidClaims,
                accessTokenPayload: await session.current.getAccessTokenPayloadSecurely({
                    userContext,
                }),
                userId: await session.current.getUserId({
                    userContext,
                }),
            };
        } catch (err) {
            if (
                await session.current.doesSessionExist({
                    userContext,
                })
            ) {
                throw err;
            }
            // This means that loading the access token or the userId failed
            // This may happen if the server cleared the error since the validation was done which should be extremely rare
            return {
                loading: false,
                doesSessionExist: false,
                accessTokenPayload: {},
                invalidClaims: [],
                userId: "",
            };
        }
    }, []);
    const setInitialContextAndMaybeRedirect = React.useCallback(
        async (toSetContext) => {
            if (context.loading === false) {
                return;
            }
            if (props.doRedirection !== false) {
                if (!toSetContext.doesSessionExist && props.requireAuth !== false) {
                    redirectToLogin();
                    return;
                }
                if (toSetContext.invalidClaims.length !== 0) {
                    let failureRedirectInfo;
                    try {
                        failureRedirectInfo = await types.getFailureRedirectionInfo({
                            invalidClaims: toSetContext.invalidClaims,
                            overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                            userContext,
                        });
                        if (failureRedirectInfo.redirectPath !== undefined) {
                            if (
                                types.validateAndCompareOnFailureRedirectionURLToCurrent(
                                    failureRedirectInfo.redirectPath
                                )
                            ) {
                                setContext(toSetContext);
                                return;
                            } else {
                                return await genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                    failureRedirectInfo.redirectPath,
                                    navigate
                                );
                            }
                        }
                    } catch (err) {
                        rethrowInRender(err);
                        throw err;
                    }
                    if (props.accessDeniedScreen !== undefined && failureRedirectInfo.failedClaim !== undefined) {
                        console.warn({
                            message: "Showing access denied screen because a claim validator failed",
                            claimValidationError: failureRedirectInfo.failedClaim,
                        });
                        return setContext({
                            ...toSetContext,
                            accessDeniedValidatorError: failureRedirectInfo.failedClaim,
                        });
                    }
                }
            }
            setContext(toSetContext);
        },
        [
            context.loading,
            props.doRedirection,
            props.requireAuth,
            props.overrideGlobalClaimValidators,
            props.accessDeniedScreen,
            redirectToLogin,
            userContext,
            navigate,
        ]
    );
    genericComponentOverrideContext.useOnMountAPICall(buildContext, setInitialContextAndMaybeRedirect);
    // subscribe to events on mount
    React.useEffect(() => {
        async function onHandleEvent(event) {
            switch (event.action) {
                // We intentionally fall through as they are all handled the same way.
                case "SESSION_CREATED":
                case "REFRESH_SESSION":
                case "ACCESS_TOKEN_PAYLOAD_UPDATED":
                case "API_INVALID_CLAIM": {
                    // In general the user should not be calling APIs that fail w/ invalid claim
                    // This may suggest that a claim was invalidated in the meantime
                    // so we re-validate even if the session context wasn't updated.
                    const invalidClaims = await session.current.validateClaims({
                        overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                        userContext,
                    });
                    if (props.doRedirection !== false) {
                        let failureRedirectInfo;
                        try {
                            failureRedirectInfo = await types.getFailureRedirectionInfo({
                                invalidClaims,
                                overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                userContext,
                            });
                            if (failureRedirectInfo.redirectPath) {
                                if (
                                    types.validateAndCompareOnFailureRedirectionURLToCurrent(
                                        failureRedirectInfo.redirectPath
                                    )
                                ) {
                                    setContext({ ...event.sessionContext, loading: false, invalidClaims });
                                } else {
                                    return await genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                        failureRedirectInfo.redirectPath,
                                        navigate
                                    );
                                }
                            }
                        } catch (err) {
                            rethrowInRender(err);
                            throw err;
                        }
                        if (props.accessDeniedScreen !== undefined && failureRedirectInfo.failedClaim !== undefined) {
                            console.warn({
                                message: "Showing access denied screen because a claim validator failed",
                                claimValidationError: failureRedirectInfo.failedClaim,
                            });
                            return setContext({
                                ...event.sessionContext,
                                loading: false,
                                invalidClaims,
                                accessDeniedValidatorError: failureRedirectInfo.failedClaim,
                            });
                        }
                    }
                    setContext({ ...event.sessionContext, loading: false, invalidClaims });
                    return;
                }
                case "SIGN_OUT":
                    setContext({ ...event.sessionContext, loading: false, invalidClaims: [] });
                    return;
                case "UNAUTHORISED":
                    setContext({ ...event.sessionContext, loading: false, invalidClaims: [] });
                    if (props.onSessionExpired !== undefined) {
                        props.onSessionExpired();
                    } else if (props.requireAuth !== false && props.doRedirection !== false) {
                        redirectToLogin();
                    }
                    return;
            }
        }
        if (session.current === undefined) {
            session.current = types.Session.getInstanceOrThrow();
        }
        if (context.loading === false) {
            // we return here cause addEventListener returns a function that removes
            // the listener, and this function will be called by useEffect when
            // onHandleEvent changes or if the component is unmounting.
            return session.current.addEventListener(onHandleEvent);
        }
        return undefined;
    }, [props, setContext, context.loading, userContext, navigate, redirectToLogin]);
    if (props.requireAuth !== false && (context.loading || !context.doesSessionExist)) {
        return null;
    }
    if (!context.loading && context.accessDeniedValidatorError && props.accessDeniedScreen) {
        return jsxRuntime.jsx(props.accessDeniedScreen, {
            userContext: userContext,
            navigate: navigate,
            validationError: context.accessDeniedValidatorError,
        });
    }
    return jsxRuntime.jsx(SessionContext.Provider, { value: context, children: children });
};
const SessionAuthWrapper = (props) => {
    return jsxRuntime.jsx(UserContextWrapper, {
        userContext: props.userContext,
        children: jsxRuntime.jsx(SessionAuth, { ...props }),
    });
};

const SuperTokensWrapper = (props) => {
    return jsxRuntime.jsx(SessionAuthWrapper, { ...props, requireAuth: false, doRedirection: false });
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
/*
 * Imports.
 */
/*
 * API Wrapper exposed to user.
 */
class SuperTokensAPIWrapper {
    static SuperTokensWrapper = SuperTokensWrapper;
    static init(config) {
        genericComponentOverrideContext.SuperTokens.init(config);
    }
    static changeLanguage(language) {
        return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().changeLanguage(language);
    }
    static loadTranslation(store) {
        return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().loadTranslation(store);
    }
    static redirectToAuth = async (options) => {
        return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
            ...options,
            redirectBack: options?.redirectBack ?? true,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(options?.userContext),
        });
    };
    static useTranslation = translationContext.useTranslation;
    static useUserContext = useUserContext;
}
const init = SuperTokensAPIWrapper.init;
const changeLanguage = SuperTokensAPIWrapper.changeLanguage;
const loadTranslation = SuperTokensAPIWrapper.loadTranslation;
const redirectToAuth = SuperTokensAPIWrapper.redirectToAuth;

exports.AuthPage = AuthPage;
exports.AuthPageComponentList = AuthPageComponentList;
exports.AuthPageFooter = AuthPageFooter;
exports.AuthPageHeader = AuthPageHeader;
exports.AuthPageTheme = AuthPageTheme;
exports.BackButton = BackButton;
exports.ComponentOverrideContext = ComponentOverrideContext;
exports.FeatureWrapper = FeatureWrapper;
exports.GeneralError = GeneralError;
exports.Provider = Provider;
exports.RecipeRouter = RecipeRouter;
exports.SessionAuthWrapper = SessionAuthWrapper;
exports.SessionContext = SessionContext;
exports.SpinnerIcon = SpinnerIcon;
exports.SuperTokensAPIWrapper = SuperTokensAPIWrapper;
exports.SuperTokensBranding = SuperTokensBranding;
exports.SuperTokensWrapper = SuperTokensWrapper;
exports.UI = UI;
exports.UserContextContext = UserContextContext;
exports.UserContextWrapper = UserContextWrapper;
exports.canHandleRoute = canHandleRoute;
exports.changeLanguage = changeLanguage;
exports.defaultTranslationsCommon = defaultTranslationsCommon;
exports.getRoutingComponent = getRoutingComponent;
exports.getSuperTokensRoutesForReactRouterDom = getSuperTokensRoutesForReactRouterDom;
exports.hasFontDefined = hasFontDefined;
exports.init = init;
exports.loadTranslation = loadTranslation;
exports.redirectToAuth = redirectToAuth;
exports.useDynamicLoginMethods = useDynamicLoginMethods;
exports.useSessionContext = useSessionContext;
exports.useUserContext = useUserContext;
exports.withOverride = withOverride;
