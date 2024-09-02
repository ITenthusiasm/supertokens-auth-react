import type { DateProviderInput } from "./dateProvider/types";
import type { BaseRecipeModule } from "./recipe/recipeModule/baseRecipeModule";
import type { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import type { TranslationFunc, TranslationStore } from "./translation/translationHelpers";
import type { ComponentClass, PropsWithChildren } from "react";
import type { CreateRecipeFunction as CreateRecipeFunctionWebJS } from "supertokens-web-js/lib/build/types";
import type { SessionClaimValidator as SessionClaimValidatorWebJS } from "supertokens-web-js/recipe/session";
import type { CookieHandlerInput } from "supertokens-web-js/utils/cookieHandler/types";
import type NormalisedURLDomain from "supertokens-web-js/utils/normalisedURLDomain";
import type NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import type { WindowHandlerInput } from "supertokens-web-js/utils/windowHandler/types";
export type SuccessRedirectContext = {
    recipeId:
        | "emailpassword"
        | "thirdparty"
        | "passwordless"
        | "thirdpartypasswordless"
        | "thirdpartyemailpassword"
        | "emailverification"
        | "totp";
    action: "SUCCESS";
    isNewRecipeUser: boolean;
    createdNewUser: boolean;
    newSessionCreated: boolean;
    redirectToPath?: string;
};
export type GetRedirectionURLContext =
    | {
          action: "TO_AUTH";
          showSignIn?: boolean;
      }
    | SuccessRedirectContext;
export type ValidationFailureCallback =
    | (({
          userContext,
          reason,
      }: {
          userContext: UserContext;
          reason: any;
      }) => Promise<string | undefined> | string | undefined)
    | undefined;
export type SessionClaimValidator = SessionClaimValidatorWebJS & {
    showAccessDeniedOnFailure?: boolean;
    onFailureRedirection?: ValidationFailureCallback;
};
export type SuperTokensConfig = {
    appInfo: AppInfoUserInput;
    /**
     * Identifier for the client, such as `web`, `ios`, etc. to be used with thirdparty, multitenancy recipes.
     */
    clientType?: string;
    recipeList: {
        recipeID: string;
        authReact: CreateRecipeFunction<any, any, any, any>;
        webJS: CreateRecipeFunctionWebJS<any>;
    }[];
    cookieHandler?: CookieHandlerInput;
    windowHandler?: WindowHandlerInput;
    dateProvider?: DateProviderInput;
    usesDynamicLoginMethods?: boolean;
    languageTranslations?: {
        defaultLanguage?: string;
        currentLanguageCookieScope?: string;
        translations?: TranslationStore;
        translationFunc?: TranslationFunc;
    };
    enableDebugLogs?: boolean;
    getRedirectionURL?: (
        context: GetRedirectionURLContext,
        userContext: UserContext
    ) => Promise<string | undefined | null>;
    style?: string;
    useShadowDom?: boolean;
    disableAuthRoute?: boolean;
    defaultToSignUp?: boolean;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
};
export type WebJSRecipeInterface<T> = Omit<T, "default" | "init" | "signOut">;
export type CreateRecipeFunction<T, S, R, N extends NormalisedRecipeModuleConfig<T, S, R>> = (
    appInfo: NormalisedAppInfo,
    enableDebugLogs: boolean
) => BaseRecipeModule<T, S, R, N>;
export type AppInfoUserInput = {
    appName: string;
    apiDomain: string;
    websiteDomain: string;
    apiBasePath?: string;
    websiteBasePath?: string;
    /**
     * An API gateway may be used which prepends a path to the API route.
     * That path should be specified here.
     */
    apiGatewayPath?: string;
};
export type RecipeInitResult<T, Action, R, P extends NormalisedRecipeModuleConfig<T, Action, R>> = {
    recipeID: string;
    authReact: CreateRecipeFunction<T, Action, R, P>;
    webJS: CreateRecipeFunctionWebJS<Action>;
};
export type NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig> = NormalisedConfig & {
    appInfo: NormalisedAppInfo;
    recipeId: string;
};
export type NormalisedAppInfo = {
    appName: string;
    apiDomain: NormalisedURLDomain;
    websiteDomain: NormalisedURLDomain;
    apiBasePath: NormalisedURLPath;
    websiteBasePath: NormalisedURLPath;
};
export type ComponentWithRecipeAndMatchingMethod = {
    component: ReactComponentClass;
    matches: () => boolean;
    /**
     * Recipe ID this component belongs
     */
    recipeID: string;
};
export type RecipeFeatureComponentMap = Record<string, ComponentWithRecipeAndMatchingMethod>;
export type BaseFeatureComponentMap = Record<string, ComponentWithRecipeAndMatchingMethod[]>;
export type FormFieldBaseConfig = {
    id: string;
    label: string;
    placeholder?: string;
    getDefaultValue?: () => string;
    nonOptionalErrorMsg?: string;
};
export type FormField = FormFieldBaseConfig & {
    validate?: (value: any) => Promise<string | undefined>;
    optional?: boolean;
};
export type APIFormField = {
    id: string;
    value: string;
};
export type NormalisedFormField = {
    id: string;
    label: string;
    placeholder: string;
    validate: (value: any) => Promise<string | undefined> | string | undefined;
    optional: boolean;
    nonOptionalErrorMsg?: string;
    autoComplete?: string;
    autofocus?: boolean;
    getDefaultValue?: () => string;
    hidden?: boolean;
};
export type ReactComponentClass<P = any> = ComponentClass<P, any> | ((props: P) => JSX.Element);
export type FeatureBaseConfig = {
    style?: string;
};
export type NormalisedBaseConfig = {
    style: string;
};
export type ThemeBaseProps = {
    styleFromInit?: string;
};
export type FeatureBaseProps<T = Record<string, unknown>> = PropsWithChildren<
    {
        navigate?: Navigate;
    } & T
>;
export type Awaited<T> = T extends null | undefined
    ? T
    : T extends object & {
          then(onfulfilled: infer F): any;
      }
    ? F extends (value: infer V, ...args: any) => any
        ? V
        : never
    : T;
interface NavigateFunction {
    (to: string): void;
    (delta: number): void;
}
export type Navigate =
    | {
          push: (path: string) => void;
          goBack: () => void;
      }
    | NavigateFunction;
export type UserContext = Record<string, any>;
export type AuthComponentProps = {
    setFactorList: (factorIds: string[]) => void;
    rebuildAuthPage: () => void;
    navigate: Navigate | undefined;
    userContext: UserContext;
    error: string | undefined;
    onError: (err: string) => void;
    clearError: () => void;
};
export type PartialAuthComponentProps = AuthComponentProps;
export type FullPageAuthComponentProps<PreloadInfoType> = AuthComponentProps & {
    preloadInfo: PreloadInfoType;
};
export type FullPageAuthComponent<PreloadInfoType = any> = {
    type: "FULL_PAGE";
    preloadInfoAndRunChecks: (
        firstFactors: string[],
        userContext: UserContext
    ) => Promise<
        | {
              shouldDisplay: true;
              preloadInfo: PreloadInfoType;
          }
        | {
              shouldDisplay: false;
          }
    >;
    component: React.FC<FullPageAuthComponentProps<PreloadInfoType>>;
};
export type PartialAuthComponent = {
    type: "SIGN_IN_UP" | "SIGN_IN" | "SIGN_UP";
    factorIds: string[];
    displayOrder: number;
    component: React.FC<PartialAuthComponentProps>;
};
export type AuthComponent<T = any> = PartialAuthComponent | FullPageAuthComponent<T>;
export {};
