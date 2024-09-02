import type { FC } from "react";
export type ProviderConfig = {
    id: string;
    name?: string;
    getRedirectURL?: (id: string) => string;
    buttonComponent?: BuiltInProviderConfig["buttonComponent"];
};
export type BuiltInProviderConfig = {
    id?: string;
    name?: string;
    buttonComponent?:
        | FC<{
              name: string;
          }>
        | {
              new (props: { name: string }): React.Component<any, any>;
          }
        | JSX.Element;
    getRedirectURL?: (id: string) => string;
};
export type CustomProviderConfig = {
    id: string;
    name?: string;
    /**
     * Provider Logo.
     */
    logo?: JSX.Element;
    buttonComponent?:
        | FC<{
              name: string;
          }>
        | {
              new (props: { name: string }): React.Component<any, any>;
          }
        | JSX.Element;
    getRedirectURL?: (id: string) => string;
};
