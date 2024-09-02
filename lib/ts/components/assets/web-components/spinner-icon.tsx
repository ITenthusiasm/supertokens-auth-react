/** @jsxImportSource solid-js */
/** @jsx preserve */
import { customElement, noShadowDOM } from "solid-element";

const SolidSpinnerIcon = customElement("spinner-icon", {}, () => {
    noShadowDOM();

    return (
        <svg version="1.1" viewBox="25 25 50 50" data-supertokens="spinnerIcon">
            <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="rgb(var(--palette-primary))"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dashoffset="0"
                stroke-dasharray="100, 200">
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="4s"
                    repeatCount="indefinite"
                />
                <animate attributeName="stroke-dashoffset" values="0;-30;-124" dur="2s" repeatCount="indefinite" />
                <animate
                    attributeName="stroke-dasharray"
                    values="0,200;110,200;110,200"
                    dur="2s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
});

declare module "solid-js" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "spinner-icon": {};
        }
    }
}
