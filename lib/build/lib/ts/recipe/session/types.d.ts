import type { AccessDeniedScreenTheme } from "./components/themes/accessDeniedScreenTheme";
import type Session from "./recipe";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { Navigate, FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import type { NormalisedConfig } from "../recipeModule/types";
import type OverrideableBuilder from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/session";
import type { ClaimValidationError } from "supertokens-web-js/recipe/session";
import type { UserInput as WebJSInputType, RecipeEvent } from "supertokens-web-js/recipe/session/types";
export type RecipeEventWithSessionContext = RecipeEvent & {
    sessionContext: SessionContextUpdate;
};
export type InputType = WebJSInputType & {
    style?: string;
    accessDeniedScreen?: SessionFeatureBaseConfig;
    onHandleEvent?: (event: RecipeEventWithSessionContext) => void;
};
export type NormalisedSessionConfig = NormalisedConfig<unknown, any, any> & {
    invalidClaimStatusCode: number;
    accessDeniedScreen: NormalisedBaseConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export type SessionFeatureBaseConfig = FeatureBaseConfig;
export type SessionContextUpdate = {
    doesSessionExist: boolean;
    userId: string;
    accessTokenPayload: any;
};
export type LoadedSessionContext = {
    loading: false;
    invalidClaims: ClaimValidationError[];
    accessDeniedValidatorError?: ClaimValidationError;
} & SessionContextUpdate;
export type SessionContextType =
    | LoadedSessionContext
    | {
          loading: true;
      };
export type AccessDeniedThemeProps = {
    recipe: Session;
    error?: string;
    navigate: Navigate;
    config: NormalisedSessionConfig;
};
export type ComponentOverrideMap = {
    SessionAccessDenied_Override?: ComponentOverride<typeof AccessDeniedScreenTheme>;
};
