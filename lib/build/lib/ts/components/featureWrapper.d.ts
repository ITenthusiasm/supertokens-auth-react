import type { TranslationStore } from "../translation/translationHelpers";
import type { PropsWithChildren } from "react";
type FeatureWrapperProps = {
    useShadowDom?: boolean;
    defaultStore: TranslationStore;
};
export default function FeatureWrapper({
    children,
    useShadowDom,
    defaultStore,
}: PropsWithChildren<FeatureWrapperProps>): JSX.Element | null;
type WithOrWithoutShadowDomProps = {
    useShadowDom?: boolean;
};
export declare function WithOrWithoutShadowDom({
    children,
    useShadowDom,
}: PropsWithChildren<WithOrWithoutShadowDomProps>): JSX.Element;
export {};
