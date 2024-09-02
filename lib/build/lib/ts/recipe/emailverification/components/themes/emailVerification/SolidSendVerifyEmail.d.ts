/// <reference types="react" />
import "../../../../../../ts/components/assets/web-components/email-large-icon";
import "../../../../../../ts/components/assets/web-components/arrow-right-icon";
export declare const TestContext: {
    __context__: unknown;
};
export declare function registerSolidSendVerifyEmail(data: any): void;
interface GeneralErrorProps {
    error: string;
}
export declare function registerSolidGeneralError(data: { t: (key: string) => string }): void;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "solid-send-verify-email": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            "solid-general-error": {
                error: string;
            };
        }
    }
}
declare module "solid-js" {
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
export {};
