/// <reference types="react" />
export type ProviderButtonProps = {
    providerName: string;
    displayName: string;
    logo?: JSX.Element;
};
export default function ProviderButton({
    logo,
    providerName,
    displayName,
}: ProviderButtonProps): import("react/jsx-runtime").JSX.Element;
