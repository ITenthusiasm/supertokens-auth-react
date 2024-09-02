/// <reference types="react" />
import { LitElement } from "lit";
import type { SendVerifyEmailThemeProps } from "../lib/ts/recipe/emailverification/types";
import type { UserContext } from "../lib/ts/types";
export default class LitSendVerifyEmail extends LitElement {
    #private;
    t: (key: string) => string;
    userContext: UserContext;
    recipeImplementation: SendVerifyEmailThemeProps["recipeImplementation"];
    redirectToAuth: SendVerifyEmailThemeProps["redirectToAuth"];
    signOut: SendVerifyEmailThemeProps["signOut"];
    _status: "READY" | "ERROR" | "EMAIL_PRESENT";
    _errorMessage: string | undefined;
    static properties: {
        t: {
            attribute: false;
        };
        userContext: {
            attribute: false;
        };
        recipeImplementation: {
            attribute: false;
        };
        redirectToAuth: {
            attribute: false;
        };
        signOut: {
            attribute: false;
        };
        _status: {
            type: StringConstructor;
            state: true;
        };
        _errorMessage: {
            type: StringConstructor;
            state: true;
        };
    };
    constructor();
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class LitGeneralError extends LitElement {
    error: string;
    t: (key: string) => string;
    static properties: {
        t: {
            attribute: false;
        };
        error: {
            type: StringConstructor;
        };
    };
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "lit-send-verify-email": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            "lit-general-error": {
                error: string;
            };
        }
    }
}
