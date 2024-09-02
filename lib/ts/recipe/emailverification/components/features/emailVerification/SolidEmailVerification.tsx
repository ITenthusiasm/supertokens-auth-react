import * as React from "react";
import { useContext, useState, useMemo, useCallback, Fragment } from "react";

import { redirectToAuth } from "../../../../..";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { useUserContext } from "../../../../../usercontext";
import { clearQueryParams, getQueryParams } from "../../../../../utils";
import { useOnMountAPICall, useRethrowInRender } from "../../solidUtils";
import { SessionContext } from "../../../../session";
import Session from "../../../../session/recipe";
import EmailVerificationTheme from "../../themes/emailVerification";
import { defaultTranslationsEmailVerification } from "../../themes/translations";

import type { FeatureBaseProps, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailverification";

import { customElement } from "solid-element";
import { createSignal, Show, onMount, onCleanup } from "solid-js";

type Prop = FeatureBaseProps<{
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
}>;

export const EmailVerification = customElement("solid-email-verification", {} as any, (props: Prop, { element }) => {
    /**
     * A `Promise` that resolves when this component has been "mounted". This is important because
     * currently "Object Data" is only loaded AFTER the component has mounted.
     */
    const componentMounted = new Promise<void>((resolve) => onMount(resolve));
    const [status, setStatus] = createSignal<"LOADING" | "READY">("LOADING");
    const rethrowInRender = useRethrowInRender();

    const sessionContext = useContext(SessionContext);
    const userContext = props.userContext ?? useUserContext();
    const recipeComponentOverrides = props.useComponentOverrides();

    async function redirectToAuthWithHistory() {
        await componentMounted;
        await redirectToAuth({ redirectBack: false, navigate: props.navigate });
    }

    const modifiedRecipeImplementation = {
        ...props.recipe.webJSRecipe,
        async sendVerificationEmail(input) {
            await componentMounted;
            const response = await props.recipe.webJSRecipe.sendVerificationEmail(input);
            clearQueryParams(["token"]);
            return response;
        },
    };

    // Success-handling Logic
    onMount(() => document.addEventListener("emailverificationsuccess", handleSuccess));
    onCleanup(() => document.removeEventListener("emailverificationsuccess", handleSuccess));
    async function handleSuccess() {
        await componentMounted;
        return Session.getInstanceOrThrow()
            .validateGlobalClaimsAndHandleSuccessRedirection(
                undefined,
                props.recipe.recipeID,
                undefined,
                userContext,
                props.navigate
            )
            .catch(rethrowInRender);
    }

    // Mounting Logic
    useOnMountAPICall(
        async function fetchIsEmailVerified() {
            await componentMounted;
            if (sessionContext.loading === true) {
                // This callback should only be called if the session is already loaded
                throw new Error("Should never come here");
            }

            const token = getQueryParams("token") ?? undefined;
            if (token === undefined) {
                if (!sessionContext.doesSessionExist) {
                    await redirectToAuthWithHistory();
                } else {
                    // we check if the email is already verified, and if it is, then we redirect the user
                    return (await props.recipe.webJSRecipe.isEmailVerified({ userContext })).isVerified;
                }
            }
            return false;
        },

        async function checkIsEmailVerified(isVerified: boolean): Promise<void> {
            if (isVerified) {
                return void handleSuccess();
            }
            setStatus("READY");
        },

        async function handleError(err) {
            // TODO: we will not need this after restructuring the emailverification components, since it should be handled by SessionAuth
            // If the error cleared the session we redirect away, otherwise we have no way of handling it.
            if (await Session.getInstanceOrThrow().doesSessionExist({ userContext })) {
                throw err;
            } else {
                await redirectToAuthWithHistory();
            }
        },

        sessionContext.loading === false
    );

    async function signOut(): Promise<void> {
        await componentMounted;
        const session = Session.getInstanceOrThrow();
        await session.signOut({ userContext });
        return redirectToAuthWithHistory();
    }

    if (status() === "LOADING") {
        return null; // TODO: This doesn't work in Solid. Use `<Show>`
    }

    const sendVerifyEmailScreenFeature = props.recipe.config.sendVerifyEmailScreen;

    const sendVerifyEmailScreen = {
        styleFromInit: sendVerifyEmailScreenFeature.style,
        recipeImplementation: modifiedRecipeImplementation,
        config: props.recipe.config,
        signOut: signOut,
        redirectToAuth: redirectToAuthWithHistory,
    };

    const verifyEmailLinkClickedScreenFeature = props.recipe.config.verifyEmailLinkClickedScreen;
    const token = getQueryParams("token") ?? undefined;

    const verifyEmailLinkClickedScreen = token
        ? {
              styleFromInit: verifyEmailLinkClickedScreenFeature.style,
              onTokenInvalidRedirect: redirectToAuthWithHistory,
              recipeImplementation: modifiedRecipeImplementation,
              config: props.recipe.config,
              token,
          }
        : undefined;

    const childProps = {
        config: props.recipe.config,
        sendVerifyEmailScreen: sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen,
        hasToken: token !== undefined,
    };

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsEmailVerification}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && <EmailVerificationTheme {...childProps} />}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {props.children &&
                        React.Children.map(props.children, (child) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, childProps);
                            }

                            return child;
                        })}
                </Fragment>
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
});

export default EmailVerification;
