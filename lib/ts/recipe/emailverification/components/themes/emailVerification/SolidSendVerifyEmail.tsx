/* eslint @typescript-eslint/no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */
/* eslint-disable curly */
/* eslint-disable react/jsx-no-literals */
/** @jsxImportSource solid-js */
/** @jsx preserve */
/** @jsxFrag Fragment */
import { customElement, noShadowDOM } from "solid-element";
import { createSignal, createResource, createEffect, createMemo, onMount, Show, Suspense } from "solid-js";
import type { JSX } from "solid-js";
import STGeneralError from "supertokens-web-js/utils/error";

import Session from "../../../../session/recipe";
import { useOnMountAPICall } from "../../solidUtils";
import "../../../../../../ts/components/assets/web-components/email-large-icon";
import "../../../../../../ts/components/assets/web-components/arrow-right-icon";
import { getTranslate } from "../../../../../translation/translationContext";
import { createContext, ContextProvider, ContextConsumer, ContextEvent } from "@lit/context";

export const TestContext = createContext<unknown>(Symbol("test-contenxt"));

export function registerSolidSendVerifyEmail(data: any): void {
    const SolidSendVerifyEmail = customElement("solid-send-verify-email", {}, (_props: unknown, { element }) => {
        Object.assign(element, data);

        // Too Early
        element.dispatchEvent(new ContextEvent(TestContext, (data) => console.log("Data in Function Body: ", data)));

        onMount(() => {
            // Too early
            element.dispatchEvent(new ContextEvent(TestContext, (data) => console.log("Data in Mount: ", data)));

            // Works
            setTimeout(() => {
                element.dispatchEvent(
                    new ContextEvent(TestContext, (data) => console.log("Delayed Data in Mount: ", data))
                );
            });
        });

        /* Copy SuperTokens Styles */
        // WARNING: If we want to reuse the SuperTokens styles here, we need to copy nodes because of the ShadowDOM.
        // noShadowDOM();
        onMount(() => {
            if (!element.shadowRoot) return; // We aren't testing ShadowDOM now

            const wrapper = document.getElementById("supertokens-root") as HTMLElement;
            const superTokensRoot = wrapper.shadowRoot ?? wrapper;

            const stylesObserver = new MutationObserver((mutationList) => {
                mutationList.forEach((mutation) => {
                    const newStyles = Array.from(mutation.addedNodes).filter(
                        (node) => node instanceof HTMLStyleElement || node instanceof HTMLLinkElement
                    );

                    const clonedStyles = newStyles.map((n) => n.cloneNode(true));
                    element.shadowRoot.append(...clonedStyles);
                });
            });

            stylesObserver.observe(superTokensRoot, { childList: true });
        });

        const [status, setStatus] = createSignal<"READY" | "ERROR" | "EMAIL_PRESENT">("READY");
        const [errorMessage, setErrorMessage] = createSignal<string | undefined>(undefined);

        async function resendEmail(): Promise<void> {
            try {
                const response = await element.recipeImplementation.sendVerificationEmail({
                    userContext: element.userContext,
                });

                if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                    element.dispatchEvent(
                        new CustomEvent("emailverificationsuccess", { bubbles: true, composed: true })
                    );
                } else if (response.status === "OK") {
                    setStatus("EMAIL_PRESENT");
                }
            } catch (e) {
                if (STGeneralError.isThisError(e)) {
                    setErrorMessage(e.message);
                }

                setStatus("ERROR");
                return handleSendError();
            }
        }

        async function logout(): Promise<void> {
            try {
                await element.signOut();
            } catch (e) {
                if (STGeneralError.isThisError(e)) {
                    setErrorMessage(e.message);
                }

                setStatus("ERROR");
            }
        }

        useOnMountAPICall(
            function sendVerificationEmail() {
                return element.recipeImplementation.sendVerificationEmail({ userContext: element.userContext });
            },

            async function handleResponse(response: any): Promise<void> {
                if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                    element.dispatchEvent(
                        new CustomEvent("emailverificationsuccess", { bubbles: true, composed: true })
                    );
                }
            },

            handleSendError
        );

        async function handleSendError(): Promise<void> {
            // TODO: we will not need this after restructuring the emailverification components, since it should be
            // handled by SessionAuth. If the error cleared the session we should redirect to auth.
            if ((await Session.getInstanceOrThrow().doesSessionExist({ userContext: element.userContext })) !== true) {
                await element.redirectToAuth();
            }
            // We intentionally ignore the error here, because we don't want to show an error without the user taking action
        }

        const t = getTranslate();
        // DEFERRED: This is way too aggressive. A different solution would be better later. And this solution probably doesn't
        // scale anyway with multiple components...
        registerSolidGeneralError({ t });

        return () => {
            return (
                <slot name="full-content">
                    <div data-supertokens="container">
                        <div data-supertokens="row">
                            <slot name="header">
                                <Show when={status() === "ERROR"}>
                                    <solid-general-error error={errorMessage() ?? "SOMETHING_WENT_WRONG_ERROR"} />
                                </Show>

                                <Show when={status() === "EMAIL_PRESENT"}>
                                    <div data-supertokens="generalSuccess">
                                        {t("EMAIL_VERIFICATION_RESEND_SUCCESS")}
                                    </div>
                                </Show>

                                <div data-supertokens="sendVerifyEmailIcon">
                                    <email-large-icon />
                                </div>
                            </slot>

                            <slot name="body">
                                <div data-supertokens="headerTitle headerTinyTitle">
                                    {t("EMAIL_VERIFICATION_SEND_TITLE")}
                                </div>
                                <div data-supertokens="primaryText sendVerifyEmailText">
                                    {t("EMAIL_VERIFICATION_SEND_DESC_START")}
                                    <strong>{t("EMAIL_VERIFICATION_SEND_DESC_STRONG")}</strong>
                                    {t("EMAIL_VERIFICATION_SEND_DESC_END")}
                                </div>
                            </slot>

                            <slot name="actions">
                                <Show when={status() !== "EMAIL_PRESENT"}>
                                    <div data-supertokens="link sendVerifyEmailResend" onClick={resendEmail}>
                                        {t("EMAIL_VERIFICATION_RESEND_BTN")}
                                    </div>
                                </Show>

                                <div data-supertokens="secondaryText secondaryLinkWithArrow" onClick={logout}>
                                    {t("EMAIL_VERIFICATION_LOGOUT")}
                                    <arrow-right-icon color="rgb(var(--palette-textPrimary))" />
                                </div>
                            </slot>
                        </div>
                    </div>
                </slot>
            );
        };
    });
}

interface GeneralErrorProps {
    error: string;
}

export function registerSolidGeneralError(data: { t: (key: string) => string }): void {
    const SolidGeneralError = customElement("solid-general-error", { error: "" }, (props: GeneralErrorProps) => {
        noShadowDOM();

        const { t } = data;
        return <div data-supertokens="generalError">{t(props.error)}</div>;
    });
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "solid-send-verify-email": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            "solid-general-error": { error: string };
        }
    }
}

declare module "solid-js" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "solid-general-error": GeneralErrorProps;
        }
    }
}

declare global {
    interface DocumentEventMap {
        emailverificationsuccess: CustomEvent;
    }
}

customElement("my-test-element", {}, (_props: unknown, { element }) => {
    console.log("First Run");
    return <div>First run</div>;
});

customElement("my-test-element", {}, (_props: unknown, { element }) => {
    console.log("Second Run");
    return <div>Second run</div>;
});
