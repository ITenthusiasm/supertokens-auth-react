/* eslint @typescript-eslint/no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */
/* eslint-disable curly */
/* eslint-disable react/jsx-no-literals */
/** @jsxImportSource solid-js */
/** @jsx preserve */
/** @jsxFrag Fragment */
import { customElement, noShadowDOM } from "solid-element";
import { Show } from "solid-js";

import styles from "../styles.css";

interface SolidThemeBaseProps {
    loaddefaultfont: boolean;

    /**
     * Usually, this would be a `string[]`. But to simplify the Solid experimentation,
     * this is assumed to be a comman-separated string instead.
     */
    userStyles?: string;
}

/*
 * NOTE: This doesn't necessarily yield the desired outcome... We don't hvae real "fragments" when it comes to
 * Web Components. Everything rendered inside a Web Component is rendered inside the Host Element. This is technically
 * a valid "conversion", but it breaks some assumptions about styling that were made earlier to Demo Slotting.
 *
 * We'll need to figure out what a good global styling solution looks like for Web Components.
 */
const SolidThemeBase = customElement("solid-theme-base", { loaddefaultfont: false }, (props: SolidThemeBaseProps) => {
    console.log("Solid Theme Base Props: ", props);
    noShadowDOM();

    return () => (
        <>
            <Show when={props.loaddefaultfont}>
                <link
                    href="//fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700"
                    rel="stylesheet"
                    type="text/css"
                />
            </Show>

            <style>
                {styles}
                {props.userStyles}
            </style>
        </>
    );
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "solid-theme-base": SolidThemeBaseProps & { children: React.ReactNode };
        }
    }
}
