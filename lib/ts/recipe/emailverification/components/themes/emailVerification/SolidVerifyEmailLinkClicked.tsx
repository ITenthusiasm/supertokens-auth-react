/** @jsxImportSource solid-js */
/** @jsx preserve */
import { customElement, noShadowDOM } from "solid-element";
import { createSignal } from "solid-js";
import STGeneralError from "supertokens-web-js/utils/error";

import { useOnMountAPICall } from "../../solidUtils";

// DEFERRED: For now, converting `Button` to a Web Component has been forgone since the component is so simple.
// (Plus, the complications of moving the translater function around are undesirable.)

export function registerSolidVerifyEmailLinkClicked(data: any): void {
    const SolidVerifyEmailLinkClicked = customElement(
        "solid-verify-email-link-clicked",
        {},
        (props: any, { element }) => {
            noShadowDOM();
            Object.assign(element, data);

            type Status = "LOADING" | "INTERACTION_REQUIRED" | "INVALID" | "GENERAL_ERROR" | "SUCCESSFUL";
            const [status, setStatus] = createSignal<Status>("LOADING");
            const [errorMessage, setErrorMessage] = createSignal<string | undefined>(undefined);
            const [verifyLoading, setVerifyLoading] = createSignal(false);

            useOnMountAPICall(
                async function verifyEmailOnMount() {
                    if (element.sessionContext.loading === true) {
                        // This callback should only be called if the session is already loaded
                        throw new Error("Should never come here");
                    }

                    // If there is no active session we know that the verification was started elsewhere, since it requires a session.
                    // Otherwise, we assume it's the same session. The main purpose of this is to prevent mail scanners
                    // from accidentally validating an email address.
                    if (!element.sessionContext.doesSessionExist) {
                        return "INTERACTION_REQUIRED";
                    }

                    return element.recipeImplementation.verifyEmail({ userContext: element.userContext });
                },
                handleVerifyResp,
                handleError,
                element.sessionContext.loading === false
            );

            async function handleVerifyResp(response: any): Promise<void> {
                if (response === "INTERACTION_REQUIRED") {
                    setStatus("INTERACTION_REQUIRED");
                } else if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
                    setStatus("INVALID");
                } else {
                    setStatus("SUCCESSFUL");
                }
            }

            function handleError(err: unknown) {
                if (STGeneralError.isThisError(err)) {
                    setErrorMessage(err.message);
                }

                setStatus("GENERAL_ERROR");
            }

            const { t } = element;

            return () => {
                if (status() === "LOADING") {
                    return (
                        <div data-supertokens="container">
                            <div data-supertokens="row">
                                <div data-supertokens="spinner">
                                    <spinner-icon />
                                </div>
                            </div>
                        </div>
                    );
                }

                if (status() === "INTERACTION_REQUIRED") {
                    return (
                        <div data-supertokens="container">
                            <div data-supertokens="row noFormRow">
                                <div data-supertokens="headerTitle">{t("EMAIL_VERIFICATION_LINK_CLICKED_HEADER")}</div>
                                <div data-supertokens="headerSubtitle secondaryText">
                                    {t("EMAIL_VERIFICATION_LINK_CLICKED_DESC")}
                                </div>

                                {/* We are not adding an emailVerificationButtonWrapper because headerSubtitle already has a margin */}
                                <button
                                    type="button"
                                    data-supertokens="button"
                                    onClick={async () => {
                                        setVerifyLoading(true);

                                        try {
                                            const resp = await props.recipeImplementation.verifyEmail({
                                                userContext: element.userContext,
                                            });
                                            await handleVerifyResp(resp);
                                        } catch (err) {
                                            void handleError(err);
                                        }
                                    }}>
                                    {t("EMAIL_VERIFICATION_LINK_CLICKED_CONTINUE_BUTTON")}
                                    {verifyLoading() && "..."}
                                </button>
                            </div>
                        </div>
                    );
                }

                if (status() === "SUCCESSFUL") {
                    return (
                        <div data-supertokens="container">
                            <div data-supertokens="row noFormRow">
                                <checked-round-icon />
                                <div data-supertokens="headerTitle headerTinyTitle">
                                    {t("EMAIL_VERIFICATION_SUCCESS")}
                                </div>

                                <div data-supertokens="emailVerificationButtonWrapper">
                                    <button
                                        type="button"
                                        data-supertokens="button"
                                        onClick={() =>
                                            element.dispatchEvent(
                                                new CustomEvent("emailverificationsuccess", {
                                                    bubbles: true,
                                                    composed: true,
                                                })
                                            )
                                        }>
                                        {t("EMAIL_VERIFICATION_CONTINUE_BTN")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                }

                if (status() === "INVALID") {
                    return (
                        <div data-supertokens="container">
                            <div data-supertokens="row noFormRow">
                                <div data-supertokens="headerTitle headerTinyTitle">
                                    {t("EMAIL_VERIFICATION_EXPIRED")}
                                </div>

                                <div
                                    onClick={element.onTokenInvalidRedirect}
                                    data-supertokens="secondaryText secondaryLinkWithArrow">
                                    {t("EMAIL_VERIFICATION_CONTINUE_LINK")}
                                    <arrow-right-icon color="rgb(var(--palette-textPrimary))" />
                                </div>
                            </div>
                        </div>
                    );
                }

                return (
                    <div data-supertokens="container">
                        <div data-supertokens="row noFormRow">
                            <div data-supertokens="headerTitle error">
                                <error-large-icon />
                                {t("EMAIL_VERIFICATION_ERROR_TITLE")}
                            </div>
                            <div data-supertokens="primaryText">
                                {t(errorMessage() ?? "EMAIL_VERIFICATION_ERROR_DESC")}
                            </div>
                        </div>
                    </div>
                );
            };
        }
    );
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "solid-verify-email-link-clicked": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
