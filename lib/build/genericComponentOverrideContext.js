"use strict";

var SuperTokensWebJS = require("supertokens-web-js");
var cookieHandler = require("supertokens-web-js/utils/cookieHandler");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var MultitenancyWebJS = require("supertokens-web-js/recipe/multitenancy");
var utils = require("supertokens-web-js/utils");
var React = require("react");
var NormalisedURLDomain = require("supertokens-web-js/utils/normalisedURLDomain");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var jsxRuntime = require("react/jsx-runtime");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var SuperTokensWebJS__default = /*#__PURE__*/ _interopDefault(SuperTokensWebJS);
var MultitenancyWebJS__default = /*#__PURE__*/ _interopDefault(MultitenancyWebJS);
var React__default = /*#__PURE__*/ _interopDefault(React);
var NormalisedURLDomain__default = /*#__PURE__*/ _interopDefault(NormalisedURLDomain);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

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
 * Consts.
 */
const RECIPE_ID_QUERY_PARAM = "rid";
const DEFAULT_API_BASE_PATH = "/auth";
const DEFAULT_WEBSITE_BASE_PATH = "/auth";
const ST_ROOT_ID = "supertokens-root";
const SSR_ERROR =
    "\nIf you are trying to use this method doing server-side-rendering, please make sure you move this method inside a componentDidMount method or useEffect hook.";

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
const package_version = "0.42.2";

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
const SUPERTOKENS_DEBUG_NAMESPACE = "com.supertokens.auth-react";
let __debugLogsEnabled = false;
function enableLogging() {
    __debugLogsEnabled = true;
}
function logDebugMessage(message) {
    if (__debugLogsEnabled) {
        // eslint-disable-next-line no-console
        console.log(
            `${SUPERTOKENS_DEBUG_NAMESPACE} {t: "${new Date().toISOString()}", message: "${message}", supertokens-auth-react-ver: "${package_version}"}`
        );
    }
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
 * getRecipeIdFromPath
 * Input:
 * Output: The "rid" query param if present, null otherwise.
 */
function getRecipeIdFromSearch(search) {
    const urlParams = new URLSearchParams(search);
    return urlParams.get(RECIPE_ID_QUERY_PARAM);
}
function clearQueryParams(paramNames) {
    const newURL = new URL(windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref());
    for (const param of paramNames) {
        newURL.searchParams.delete(param);
    }
    windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.replaceState(
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.getState(),
        "",
        newURL.toString()
    );
}
function updateQueryParam(name, value) {
    const newURL = new URL(windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref());
    newURL.searchParams.set(name, value);
    windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.replaceState(
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.getState(),
        "",
        newURL.toString()
    );
}
function clearErrorQueryParam() {
    clearQueryParams(["error", "message"]);
}
function getQueryParams(param) {
    const urlParams = new URLSearchParams(
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
    );
    return urlParams.get(param);
}
function getURLHash() {
    // By default it is returined with the "#" at the beginning, we cut that off here.
    return windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash().substr(1);
}
function getRedirectToPathFromURL() {
    const redirectToPath = getQueryParams("redirectToPath");
    if (redirectToPath === null) {
        return undefined;
    } else {
        try {
            let url;
            try {
                url = new URL(redirectToPath);
            } catch (error) {
                const fakeDomain = redirectToPath.startsWith("/") ? "http://localhost" : "http://localhost/";
                url = new URL(`${fakeDomain}${redirectToPath}`);
            }
            // Prevent Open redirects by normalising path.
            const normalisedURLPath = new NormalisedURLPath__default.default(redirectToPath).getAsStringDangerous();
            const pathQueryParams = url.search || ""; // url.search contains the leading ?
            const pathHash = url.hash || ""; // url.hash contains the leading #
            const pathWithQueryParamsAndHash = normalisedURLPath + pathQueryParams + pathHash;
            // Ensure a leading "/" if `normalisedUrlPath` is empty but `pathWithQueryParamsAndHash` is not to ensure proper redirection.
            // Example: "?test=1" will not redirect the user to `/?test=1` if we don't add a leading "/".
            if (
                normalisedURLPath.length === 0 &&
                pathWithQueryParamsAndHash.length > 0 &&
                !pathWithQueryParamsAndHash.startsWith("/")
            ) {
                return "/" + pathWithQueryParamsAndHash;
            }
            return pathWithQueryParamsAndHash;
        } catch {
            return undefined;
        }
    }
}
/*
 * isTest
 */
function isTest() {
    try {
        return process.env.TEST_MODE === "testing" || process.env.REACT_APP_TEST_MODE === "testing";
    } catch (err) {
        // can get Uncaught ReferenceError: process is not defined error
        return false;
    }
}
function normaliseInputAppInfoOrThrowError(appInfo) {
    if (appInfo === undefined) {
        throw new Error("Please provide the appInfo object when calling supertokens.init");
    }
    if (appInfo.apiDomain === undefined) {
        throw new Error("Please provide your apiDomain inside the appInfo object when calling supertokens.init");
    }
    if (appInfo.appName === undefined) {
        throw new Error("Please provide your appName inside the appInfo object when calling supertokens.init");
    }
    if (appInfo.websiteDomain === undefined) {
        throw new Error("Please provide your websiteDomain inside the appInfo object when calling supertokens.init");
    }
    let apiGatewayPath = new NormalisedURLPath__default.default("");
    if (appInfo.apiGatewayPath !== undefined) {
        apiGatewayPath = new NormalisedURLPath__default.default(appInfo.apiGatewayPath);
    }
    return {
        appName: appInfo.appName,
        apiDomain: new NormalisedURLDomain__default.default(appInfo.apiDomain),
        websiteDomain: new NormalisedURLDomain__default.default(appInfo.websiteDomain),
        apiBasePath: apiGatewayPath.appendPath(
            getNormalisedURLPathOrDefault(DEFAULT_API_BASE_PATH, appInfo.apiBasePath)
        ),
        websiteBasePath: getNormalisedURLPathOrDefault(DEFAULT_WEBSITE_BASE_PATH, appInfo.websiteBasePath),
    };
}
function getNormalisedURLPathOrDefault(defaultPath, path) {
    if (path !== undefined) {
        return new NormalisedURLPath__default.default(path);
    } else {
        return new NormalisedURLPath__default.default(defaultPath);
    }
}
/*
 * validateForm
 */
// We check that the number of fields in input and config form field is the same.
// We check that each item in the config form field is also present in the input form field
async function validateForm(inputs, configFormFields) {
    const validationErrors = [];
    if (configFormFields.length !== inputs.length) {
        throw Error("Are you sending too many / too few formFields?");
    }
    // Loop through all form fields.
    for (let i = 0; i < configFormFields.length; i++) {
        const field = configFormFields[i];
        // Find corresponding input value.
        const input = inputs.find((i) => i.id === field.id);
        // Otherwise, use validate function.
        // Trim value for email only.
        let value = input.value;
        if (input.id === "email") {
            value = value.trim();
        }
        const error = await field.validate(value);
        // If error, add it.
        if (error !== undefined) {
            validationErrors.push({
                error,
                id: field.id,
            });
        }
    }
    return validationErrors;
}
/*
 * getCurrentNormalisedUrlPath
 */
function getCurrentNormalisedUrlPath() {
    return new NormalisedURLPath__default.default(
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getPathName()
    );
}
function getCurrentNormalisedUrlPathWithQueryParamsAndFragments() {
    const normalisedUrlPath = getCurrentNormalisedUrlPath().getAsStringDangerous();
    return (
        normalisedUrlPath +
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch() +
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash()
    );
}
function appendQueryParamsToURL(stringUrl, queryParams) {
    if (queryParams === undefined) {
        return stringUrl;
    }
    try {
        const url = new URL(stringUrl);
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        return url.href;
    } catch (e) {
        const fakeDomain = stringUrl.startsWith("/") ? "http://localhost" : "http://localhost/";
        const url = new URL(`${fakeDomain}${stringUrl}`);
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        return `${url.pathname}${url.search}${url.hash}`;
    }
}
function appendTrailingSlashToURL(stringUrl) {
    return stringUrl.endsWith("/") ? stringUrl : stringUrl + "/";
}
/*
 * Default method for matching recipe route based on query params.
 */
function matchRecipeIdUsingQueryParams(recipeId) {
    return () => {
        const recipeIdFromSearch = getRecipeIdFromSearch(
            windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
        );
        return recipeIdFromSearch === recipeId;
    };
}
function redirectWithFullPageReload(to) {
    if (to.trim() === "") {
        to = "/";
    }
    windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.setHref(to);
}
function redirectWithNavigate(to, navigate) {
    if (to.trim() === "") {
        to = "/";
    }
    if ("push" in navigate) {
        // we are using react-router-dom that is before v6
        navigate.push(to);
    } else {
        // in react-router-dom v6, it is just navigate(to)
        navigate(to);
    }
}
function getOriginOfPage() {
    return new NormalisedURLDomain__default.default(
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getOrigin()
    );
}
async function getLocalStorage(key) {
    const res = windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.getItem(key);
    if (res === null || res === undefined) {
        return null;
    }
    return res;
}
async function setLocalStorage(key, value) {
    await windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.setItem(key, value);
}
async function removeFromLocalStorage(key) {
    await windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.removeItem(key);
}
function mergeObjects(obj1, obj2) {
    const res = {
        ...obj1,
    };
    for (const key in obj2) {
        if (typeof res[key] === "object" && typeof obj2[key] === "object") {
            res[key] = mergeObjects(res[key], obj2[key]);
        } else {
            res[key] = obj2[key];
        }
    }
    return res;
}
function normaliseCookieScopeOrThrowError(cookieScope) {
    function helper(cookieScope) {
        cookieScope = cookieScope.trim().toLowerCase();
        // first we convert it to a URL so that we can use the URL class
        if (cookieScope.startsWith(".")) {
            cookieScope = cookieScope.substr(1);
        }
        if (!cookieScope.startsWith("http://") && !cookieScope.startsWith("https://")) {
            cookieScope = "http://" + cookieScope;
        }
        try {
            const urlObj = new URL(cookieScope);
            cookieScope = urlObj.hostname;
            // remove leading dot
            if (cookieScope.startsWith(".")) {
                cookieScope = cookieScope.substr(1);
            }
            return cookieScope;
        } catch (err) {
            throw new Error("Please provide a valid cookie scope");
        }
    }
    function isAnIpAddress(ipaddress) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            ipaddress
        );
    }
    const noDotNormalised = helper(cookieScope);
    if (noDotNormalised === "localhost" || isAnIpAddress(noDotNormalised)) {
        return noDotNormalised;
    }
    if (cookieScope.startsWith(".")) {
        return "." + noDotNormalised;
    }
    return noDotNormalised;
}
function getDefaultCookieScope() {
    try {
        return normaliseCookieScopeOrThrowError(
            windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName()
        );
    } catch {
        return undefined;
    }
}
/** Gets the value of the cookie with the specified `name` */
async function getCookieValue(name) {
    const value = `; ${await cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.getCookie()}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length < 2) {
        return null;
    }
    return parts.pop()?.split(";").shift() ?? null;
}
// undefined value will remove the cookie
async function setFrontendCookie(name, value, scope) {
    let expires = "Thu, 01 Jan 1970 00:00:01 GMT";
    let cookieVal = "";
    if (value !== undefined) {
        cookieVal = value;
        expires = undefined; // set cookie without expiry
    }
    if (
        scope === "localhost" ||
        scope === windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName() ||
        scope === undefined
    ) {
        // since some browsers ignore cookies with domain set to localhost
        // see https://github.com/supertokens/supertokens-website/issues/25
        if (expires !== undefined) {
            await cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                `${name}=${cookieVal};expires=${expires};path=/;samesite=lax`
            );
        } else {
            await cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                `${name}=${cookieVal};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax`
            );
        }
    } else {
        if (expires !== undefined) {
            await cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                `${name}=${cookieVal};expires=${expires};domain=${scope};path=/;samesite=lax`
            );
        } else {
            await cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                `${name}=${cookieVal};domain=${scope};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax`
            );
        }
    }
}
function getNormalisedUserContext(userContext) {
    return userContext === undefined ? {} : userContext;
}
/**
 * This function handles calling APIs that should only be called once during mount (mostly on mount of a route/feature component).
 * It's split into multiple callbacks (fetch + handleResponse/handleError) because we expect fetch to take longer and
 * and the component may be unmounted during the first fetch, in which case we want to avoid updating state/redirecting.
 * This is especially relevant for development in strict mode with React 18 (and in the future for concurrent rendering).
 *
 * @param fetch This is a callback that is only called once on mount. Mostly it's for consuming tokens/doing one-time-only API calls
 * @param handleResponse This is called with the result of the first (fetch) call if it succeeds.
 * @param handleError This is called with the error of the first (fetch) call if it rejects.
 * @param startLoading Will start the whole process if this is set to true (or omitted). Mostly used to wait for session loading.
 */
const useOnMountAPICall = (fetch, handleResponse, handleError, startLoading = true) => {
    const consumeReq = React.useRef();
    const [error, setError] = React.useState(undefined);
    React.useEffect(() => {
        if (!startLoading) {
            return;
        }
        const ctrl = new AbortController();
        void effect(ctrl.signal);
        return () => ctrl.abort();
        async function effect(signal) {
            let resp;
            try {
                if (consumeReq.current === undefined) {
                    consumeReq.current = fetch();
                }
                resp = await consumeReq.current;
                if (signal.aborted) {
                    return;
                }
                void handleResponse(resp);
            } catch (err) {
                if (signal.aborted) {
                    return;
                }
                if (!handleError) {
                    return setError(err);
                }
                try {
                    await handleError(err, resp);
                } catch (err) {
                    setError(err);
                }
            }
        }
    }, [fetch, handleResponse, handleError, startLoading]);
    if (error) {
        throw error;
    }
};
function useRethrowInRender() {
    const [error, setError] = React.useState(undefined);
    if (error) {
        throw error;
    }
    return setError;
}

class BaseRecipeModule {
    config;
    /*
     * Constructor.
     */
    constructor(config) {
        this.config = config;
    }
}

function normaliseRecipeModuleConfig(config) {
    if (config === undefined) {
        config = {};
    }
    let { onHandleEvent, getRedirectionURL, preAPIHook, postAPIHook } = config;
    if (onHandleEvent === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        onHandleEvent = (_) => {};
    }
    if (getRedirectionURL === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRedirectionURL = async (_) => undefined;
    }
    if (preAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        preAPIHook = async (context) => context;
    }
    if (postAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        postAPIHook = async () => {};
    }
    const rootStyle = config.style === undefined ? "" : config.style;
    return {
        ...config,
        getRedirectionURL,
        onHandleEvent,
        preAPIHook,
        postAPIHook,
        recipeRootStyle: rootStyle,
    };
}

function normaliseMultitenancyConfig(config) {
    return {
        ...normaliseRecipeModuleConfig(config),
        override: {
            functions: (originalImplementation) => originalImplementation,
            ...config?.override,
        },
    };
}
function hasIntersectingRecipes(tenantMethods, recipeList) {
    return tenantMethods.firstFactors.some((factorId) => recipeList.some((r) => r.firstFactorIds.includes(factorId)));
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
class Multitenancy extends BaseRecipeModule {
    webJSRecipe;
    static instance;
    static RECIPE_ID = "multitenancy";
    dynamicLoginMethodsCache;
    recipeID = Multitenancy.RECIPE_ID;
    constructor(config, webJSRecipe = MultitenancyWebJS__default.default) {
        super(config);
        this.webJSRecipe = webJSRecipe;
        this.dynamicLoginMethodsCache = {};
    }
    async getCurrentDynamicLoginMethods(input) {
        if (SuperTokens.usesDynamicLoginMethods === false) {
            return undefined;
        }
        const userContext = utils.getNormalisedUserContext(input.userContext);
        const tenantId = (await Multitenancy.getInstanceOrThrow().webJSRecipe.getTenantId()) ?? "public";
        if (this.dynamicLoginMethodsCache[tenantId] === undefined) {
            this.dynamicLoginMethodsCache[tenantId] = Multitenancy.getDynamicLoginMethods({
                tenantId,
                userContext,
            });
        }
        const tenantMethods = await this.dynamicLoginMethodsCache[tenantId];
        if (
            !hasIntersectingRecipes(
                tenantMethods,
                SuperTokens.getInstanceOrThrow().recipeList.filter((recipe) => "firstFactorIds" in recipe)
            )
        ) {
            throw new Error("Initialized recipes have no overlap with core recipes or could not load login methods");
        }
        return tenantMethods;
    }
    static async getDynamicLoginMethods(input) {
        const { thirdParty, firstFactors } = await MultitenancyWebJS__default.default.getLoginMethods(input);
        return {
            thirdparty: thirdParty,
            firstFactors,
        };
    }
    static init(config) {
        const normalisedConfig = normaliseMultitenancyConfig(config);
        return {
            recipeID: Multitenancy.RECIPE_ID,
            authReact: (appInfo) => {
                Multitenancy.instance = new Multitenancy({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: Multitenancy.RECIPE_ID,
                });
                return Multitenancy.instance;
            },
            webJS: MultitenancyWebJS__default.default.init({
                ...normalisedConfig,
            }),
        };
    }
    static getInstanceOrThrow() {
        if (Multitenancy.instance === undefined) {
            let error =
                "No instance of Multitenancy found. Make sure to call the Multitenancy.init method." +
                "See https://supertokens.io/docs/multitenancy/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }
        return Multitenancy.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!isTest()) {
            return;
        }
        Multitenancy.instance = undefined;
        return;
    }
}

class TranslationController {
    handlers = new Map();
    emit(event, detail) {
        const handlerList = this.handlers.get(event) || [];
        for (const h of handlerList) {
            h(event, detail);
        }
    }
    on(event, handler) {
        const handlerList = this.handlers.get(event) || [];
        this.handlers.set(event, handlerList.concat(handler));
    }
    off(event, handler) {
        const handlerList = this.handlers.get(event) || [];
        this.handlers.set(
            event,
            handlerList.filter((h) => h !== handler)
        );
    }
}
const CURRENT_LANGUAGE_COOKIE_NAME = "sCurrLanguage";
async function saveCurrentLanguage(language, cookieDomain) {
    try {
        await setFrontendCookie(CURRENT_LANGUAGE_COOKIE_NAME, language, cookieDomain);
    } catch {
        // This can throw if we are not in a browser
        // Since this is just saving a preference we can safely ignore the exception
    }
}
/** Gets the current language (if one is available) from the browser's cookie store */
async function getCurrentLanguageFromCookie() {
    try {
        return await getCookieValue(CURRENT_LANGUAGE_COOKIE_NAME);
    } catch {
        // TODO: If this only throws in non-browser settings, should we have a `typeof window` check instead?
        // This can throw if we are not in a browser
        // Since this is just loading a preference we can safely ignore the exception
        return null;
    }
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
class SuperTokens {
    /*
     * Static Attributes.
     */
    static instance;
    static usesDynamicLoginMethods = false;
    /*
     * Instance Attributes.
     */
    appInfo;
    languageTranslations;
    recipeList = [];
    userGetRedirectionURL;
    rootStyle;
    useShadowDom;
    privacyPolicyLink;
    termsOfServiceLink;
    defaultToSignUp;
    disableAuthRoute;
    /*
     * Constructor.
     */
    constructor(config) {
        this.appInfo = normaliseInputAppInfoOrThrowError(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        const translationConfig = config.languageTranslations === undefined ? {} : config.languageTranslations;
        this.languageTranslations = {
            defaultLanguage: translationConfig.defaultLanguage === undefined ? "en" : translationConfig.defaultLanguage,
            currentLanguageCookieScope:
                translationConfig.currentLanguageCookieScope !== undefined
                    ? normaliseCookieScopeOrThrowError(translationConfig.currentLanguageCookieScope)
                    : getDefaultCookieScope(),
            userTranslationStore: translationConfig.translations !== undefined ? translationConfig.translations : {},
            translationEventSource: new TranslationController(),
            userTranslationFunc: translationConfig.translationFunc,
        };
        const enableDebugLogs = Boolean(config?.enableDebugLogs);
        if (enableDebugLogs) {
            enableLogging();
        }
        this.userGetRedirectionURL = config.getRedirectionURL;
        this.recipeList = config.recipeList.map(({ authReact }) => {
            return authReact(this.appInfo, enableDebugLogs);
        });
        this.rootStyle = config.style ?? "";
        this.privacyPolicyLink = config.privacyPolicyLink;
        this.termsOfServiceLink = config.termsOfServiceLink;
        this.useShadowDom = config.useShadowDom ?? true;
        this.defaultToSignUp = config.defaultToSignUp ?? false;
        this.disableAuthRoute = config.disableAuthRoute ?? false;
    }
    /*
     * Static Methods.
     */
    static init(config) {
        cookieHandler.CookieHandlerReference.init(config.cookieHandler);
        windowHandler.WindowHandlerReference.init(config.windowHandler);
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokens.usesDynamicLoginMethods = config.usesDynamicLoginMethods ?? false;
        const recipes =
            config.recipeList.find((recipe) => recipe.recipeID === Multitenancy.RECIPE_ID) !== undefined
                ? config.recipeList
                : config.recipeList.concat(Multitenancy.init({}));
        SuperTokensWebJS__default.default.init({
            ...config,
            recipeList: recipes.map(({ webJS }) => webJS),
        });
        SuperTokens.instance = new SuperTokens({ ...config, recipeList: recipes });
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.runPostInitCallbacks();
    }
    static getInstanceOrThrow() {
        if (SuperTokens.instance === undefined) {
            let error = "SuperTokens must be initialized before calling this method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw new Error(error);
        }
        return SuperTokens.instance;
    }
    getRecipeOrThrow(recipeId) {
        const recipe = this.recipeList.find((recipe) => {
            return recipe.config.recipeId === recipeId;
        });
        if (recipe === undefined) {
            throw new Error(`Missing recipe: ${recipeId}`);
        }
        return recipe;
    }
    changeLanguage = async (lang) => {
        await saveCurrentLanguage(lang, this.languageTranslations.currentLanguageCookieScope);
        this.languageTranslations.translationEventSource.emit("LanguageChange", lang);
    };
    loadTranslation(store) {
        this.languageTranslations.translationEventSource.emit("TranslationLoaded", store);
    }
    async getRedirectUrl(context, userContext) {
        if (this.userGetRedirectionURL) {
            const userRes = await this.userGetRedirectionURL(context, userContext);
            if (userRes !== undefined) {
                return userRes;
            }
        }
        if (context.action === "TO_AUTH") {
            const redirectUrl = this.appInfo.websiteBasePath.getAsStringDangerous();
            return appendTrailingSlashToURL(redirectUrl);
        } else if (context.action === "SUCCESS") {
            return context.redirectToPath ?? "/";
        }
        throw new Error("Should never come here: unexpected redirection context");
    }
    redirectToAuth = async (options) => {
        const queryParams = options.queryParams === undefined ? {} : options.queryParams;
        if (options.show !== undefined) {
            queryParams.show = options.show;
        }
        if (options.redirectBack === true) {
            queryParams.redirectToPath = getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
        }
        let redirectUrl = await this.getRedirectUrl(
            {
                action: "TO_AUTH",
                showSignIn: options.show === "signin",
            },
            options.userContext
        );
        if (redirectUrl === null) {
            logDebugMessage("Skipping redirection because the user override returned null");
            return;
        }
        redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
        return this.redirectToUrl(redirectUrl, options.navigate);
    };
    redirectToUrl = async (redirectUrl, navigate) => {
        doRedirection(this.appInfo, redirectUrl, navigate);
    };
    redirect = async (context, navigate, queryParams, userContext) => {
        // NOTE: We cannot make userContext required in args because it follows optional parameters. Instead we will normalise it if it wasn't passed in.
        let redirectUrl = await this.getRedirectUrl(context, getNormalisedUserContext(userContext));
        if (redirectUrl === null) {
            logDebugMessage(
                `Skipping redirection because the user override returned null for context ${JSON.stringify(
                    context,
                    null,
                    2
                )}`
            );
            return;
        }
        redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
        return SuperTokens.getInstanceOrThrow().redirectToUrl(redirectUrl, navigate);
    };
    /*
     * Tests methods.
     */
    static reset() {
        if (!isTest()) {
            return;
        }
        SuperTokens.instance = undefined;
        return;
    }
}
function doRedirection(appInfo, redirectUrl, navigate) {
    try {
        new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
    } catch (e) {
        // For multi tenancy, If mismatch between websiteDomain and current location, prepend URL relative path with websiteDomain.
        const origin = getOriginOfPage().getAsStringDangerous();
        if (origin !== appInfo.websiteDomain.getAsStringDangerous()) {
            redirectUrl = `${appInfo.websiteDomain.getAsStringDangerous()}${redirectUrl}`;
            redirectWithFullPageReload(redirectUrl);
            return;
        }
        // If navigate was provided, use to redirect without reloading.
        if (navigate !== undefined) {
            redirectWithNavigate(redirectUrl, navigate);
            return;
        }
    }
    // Otherwise, redirect in app.
    redirectWithFullPageReload(redirectUrl);
}

const createGenericComponentsOverrideContext = (v = {}) => {
    const genericContext = React__default.default.createContext(v);
    const useComponentsOverrideContext = () => {
        return React__default.default.useContext(genericContext);
    };
    const Provider = ({ children, components }) => {
        return jsxRuntime.jsx(genericContext.Provider, { value: components, children: children });
    };
    return [useComponentsOverrideContext, Provider, genericContext.Consumer];
};

exports.BaseRecipeModule = BaseRecipeModule;
exports.Multitenancy = Multitenancy;
exports.SSR_ERROR = SSR_ERROR;
exports.ST_ROOT_ID = ST_ROOT_ID;
exports.SuperTokens = SuperTokens;
exports.appendQueryParamsToURL = appendQueryParamsToURL;
exports.clearErrorQueryParam = clearErrorQueryParam;
exports.clearQueryParams = clearQueryParams;
exports.createGenericComponentsOverrideContext = createGenericComponentsOverrideContext;
exports.getCurrentLanguageFromCookie = getCurrentLanguageFromCookie;
exports.getCurrentNormalisedUrlPath = getCurrentNormalisedUrlPath;
exports.getCurrentNormalisedUrlPathWithQueryParamsAndFragments = getCurrentNormalisedUrlPathWithQueryParamsAndFragments;
exports.getLocalStorage = getLocalStorage;
exports.getNormalisedUserContext = getNormalisedUserContext;
exports.getQueryParams = getQueryParams;
exports.getRedirectToPathFromURL = getRedirectToPathFromURL;
exports.getURLHash = getURLHash;
exports.isTest = isTest;
exports.logDebugMessage = logDebugMessage;
exports.matchRecipeIdUsingQueryParams = matchRecipeIdUsingQueryParams;
exports.mergeObjects = mergeObjects;
exports.normaliseRecipeModuleConfig = normaliseRecipeModuleConfig;
exports.redirectWithFullPageReload = redirectWithFullPageReload;
exports.removeFromLocalStorage = removeFromLocalStorage;
exports.setLocalStorage = setLocalStorage;
exports.updateQueryParam = updateQueryParam;
exports.useOnMountAPICall = useOnMountAPICall;
exports.useRethrowInRender = useRethrowInRender;
exports.validateForm = validateForm;
