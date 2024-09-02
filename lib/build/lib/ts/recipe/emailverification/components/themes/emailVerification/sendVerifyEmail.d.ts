import React from "react";
import type { SendVerifyEmailThemeProps } from "../../../types";
export declare const EmailVerificationSendVerifyEmail: React.FC<SendVerifyEmailThemeProps>;
export declare const SendVerifyEmail: React.ComponentType<
    import("../../../../../types").ThemeBaseProps & {
        recipeImplementation: import("supertokens-web-js/recipe/emailverification").RecipeInterface;
        config: import("../../../types").NormalisedConfig;
        signOut: () => Promise<void>;
        redirectToAuth: () => Promise<void>;
    } & {
        children?: React.ReactNode;
    }
>;
