import type { GetLoginMethodsResponseNormalized } from "./types";
import type { FC, PropsWithChildren } from "react";
export type DynamicLoginMethodsContextValue =
    | {
          loaded: false;
      }
    | {
          loaded: true;
          loginMethods: GetLoginMethodsResponseNormalized;
      };
export declare const useDynamicLoginMethods: () => DynamicLoginMethodsContextValue;
export declare const DynamicLoginMethodsProvider: FC<
    PropsWithChildren<{
        value: GetLoginMethodsResponseNormalized | undefined;
    }>
>;
