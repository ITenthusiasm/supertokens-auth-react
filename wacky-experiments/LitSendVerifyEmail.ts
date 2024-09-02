import { LitElement, html } from "lit";
import type { PropertyDeclarations } from "lit";
import { when } from "lit/directives/when.js";
import STGeneralError from "supertokens-web-js/utils/error";
import Session from "../lib/ts/recipe/session/recipe";
import type { SendVerifyEmailThemeProps } from "../lib/ts/recipe/emailverification/types";
import type { UserContext } from "../lib/ts/types";
import AsyncRequestController from "./controllers/AsyncRequestController";

export default class LitSendVerifyEmail extends LitElement {
    // DEFERRED: All of the setup goes away if we use decorators, though that would require a build step.
    declare t: (key: string) => string;
    declare userContext: UserContext;
    declare recipeImplementation: SendVerifyEmailThemeProps["recipeImplementation"];
    declare redirectToAuth: SendVerifyEmailThemeProps["redirectToAuth"];
    declare signOut: SendVerifyEmailThemeProps["signOut"];

    declare _status: "READY" | "ERROR" | "EMAIL_PRESENT";
    declare _errorMessage: string | undefined;

    static properties = {
        // Props
        t: { attribute: false },
        userContext: { attribute: false },
        recipeImplementation: { attribute: false },
        redirectToAuth: { attribute: false },
        signOut: { attribute: false },

        // State
        _status: { type: String, state: true },
        _errorMessage: { type: String, state: true },
    } satisfies PropertyDeclarations;

    constructor() {
        super();
        this._status = "READY";
        new AsyncRequestController(this, this.#sendVerificationEmail, this.#handleResponse, this.#handleSendError);
    }

    connectedCallback() {
        super.connectedCallback();

        const wrapper = document.getElementById("supertokens-root") as HTMLElement;
        const superTokensRoot = wrapper.shadowRoot ?? wrapper;

        const stylesObserver = new MutationObserver((mutationList) => {
            mutationList.forEach((mutation) => {
                const newStyles = Array.from(mutation.addedNodes).filter(
                    (node) => node instanceof HTMLStyleElement || node instanceof HTMLLinkElement
                );

                const clonedStyles = newStyles.map((n) => n.cloneNode(true));
                this.renderRoot.append(...clonedStyles);
            });
        });

        stylesObserver.observe(superTokensRoot, { childList: true });
    }

    async #resendEmail(): Promise<void> {
        try {
            const response = await this.recipeImplementation.sendVerificationEmail({
                userContext: this.userContext,
            });

            if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                this.dispatchEvent(new CustomEvent("emailverificationsuccess", { bubbles: true, composed: true }));
            } else if (response.status === "OK") {
                this._status = "EMAIL_PRESENT";
            }
        } catch (e) {
            if (STGeneralError.isThisError(e)) {
                this._errorMessage = e.message;
            }

            this._status = "ERROR";
            return this.#handleSendError();
        }
    }

    async #logout(): Promise<void> {
        try {
            await this.signOut();
        } catch (e) {
            if (STGeneralError.isThisError(e)) {
                this._errorMessage = e.message;
            }

            this._status = "ERROR";
        }
    }

    // AsyncRequestController Functions
    #sendVerificationEmail = () => {
        return this.recipeImplementation.sendVerificationEmail({ userContext: this.userContext });
    };

    #handleResponse = async (response: any): Promise<void> => {
        if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
            this.dispatchEvent(new CustomEvent("emailverificationsuccess", { bubbles: true, composed: true }));
        }
    };

    #handleSendError = async (): Promise<void> => {
        // TODO: we will not need this after restructuring the emailverification components, since it should be
        // handled by SessionAuth. If the error cleared the session we should redirect to auth.
        if ((await Session.getInstanceOrThrow().doesSessionExist({ userContext: this.userContext })) !== true) {
            await this.redirectToAuth();
        }
        // We intentionally ignore the error here, because we don't want to show an error without the user taking action
    };

    render() {
        return html`
            <slot name="full-content">
                <div data-supertokens="container">
                    <div data-supertokens="row">
                        <slot name="header">
                            ${when(
                                this._status === "ERROR",
                                () =>
                                    html`<lit-general-error
                                        error=${this._errorMessage ?? "SOMETHING_WENT_WRONG_ERROR"}
                                        .t=${this.t}
                                    ></lit-general-error>`
                            )}
                            ${when(
                                this._status === "EMAIL_PRESENT",
                                () => html`
                                    <div data-supertokens="generalSuccess">
                                        ${this.t("EMAIL_VERIFICATION_RESEND_SUCCESS")}
                                    </div>
                                `
                            )}

                            <div data-supertokens="sendVerifyEmailIcon">
                                <email-large-icon></email-large-icon>
                            </div>
                        </slot>

                        <slot name="body">
                            <div data-supertokens="headerTitle headerTinyTitle">
                                ${this.t("EMAIL_VERIFICATION_SEND_TITLE")}
                            </div>

                            <div data-supertokens="primaryText sendVerifyEmailText">
                                ${this.t("EMAIL_VERIFICATION_SEND_DESC_START")}
                                <strong>${this.t("EMAIL_VERIFICATION_SEND_DESC_STRONG")}</strong>
                                ${this.t("EMAIL_VERIFICATION_SEND_DESC_END")}
                            </div>
                        </slot>

                        <slot name="actions">
                            ${when(
                                this._status !== "EMAIL_PRESENT",
                                () => html`
                                    <div data-supertokens="link sendVerifyEmailResend" @click="${this.#resendEmail}">
                                        ${this.t("EMAIL_VERIFICATION_RESEND_BTN")}
                                    </div>
                                `
                            )}

                            <div data-supertokens="secondaryText secondaryLinkWithArrow" @click=${this.#logout}>
                                ${this.t("EMAIL_VERIFICATION_LOGOUT")}
                                <arrow-right-icon color="rgb(var(--palette-textPrimary))" />
                            </div>
                        </slot>
                    </div>
                </div>
            </slot>
        `;
    }
}

export class LitGeneralError extends LitElement {
    declare error: string;
    declare t: (key: string) => string;
    static properties = { t: { attribute: false }, error: { type: String } } satisfies PropertyDeclarations;

    render() {
        return html`<div data-supertokens="generalError">${this.t(this.error)}</div>`;
    }
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "lit-send-verify-email": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            "lit-general-error": { error: string };
        }
    }
}

// DEFERRED: Custom element definition would be best delegated to callers (one time only)
customElements.define("lit-send-verify-email", LitSendVerifyEmail);
customElements.define("lit-general-error", LitGeneralError);
