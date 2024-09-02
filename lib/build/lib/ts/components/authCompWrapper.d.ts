import type { PropsWithChildren } from "react";
type AuthComponentWrapperProps = {
    recipeComponentOverrides: any;
};
export default function AuthComponentWrapper({
    children,
    recipeComponentOverrides,
}: PropsWithChildren<AuthComponentWrapperProps>): JSX.Element | null;
export {};
