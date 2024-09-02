/** @jsxImportSource solid-js */
/** @jsx preserve */
import { customElement, noShadowDOM } from "solid-element";

const SolidErrorLargeIcon = customElement("error-large-icon", {}, () => {
    noShadowDOM();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="30"
            viewBox="0 0 33 30"
            data-supertokens="errorLargeIcon">
            <g>
                <g fill="rgb(var(--palette-error))">
                    <path
                        d="M29.617 29.75H3.383c-.626 0-1.189-.321-1.507-.86-.318-.537-.328-1.186-.027-1.733l13.118-23.85c.312-.568.885-.907 1.533-.907.648 0 1.221.339 1.533.907l13.118 23.85c.301.547.291 1.196-.027 1.734s-.881.859-1.507.859z"
                        transform="translate(-824.894 -352.483) translate(824.894 352.483)"
                    />
                </g>
                <text
                    fill="#fff"
                    font-family="Rubik-Bold, Rubik"
                    font-size="18px"
                    font-weight="700"
                    transform="translate(-824.894 -352.483) translate(838.997 377.437)">
                    <tspan x="0" y="0">
                        !
                    </tspan>
                </text>
            </g>
        </svg>
    );
});

declare module "solid-js" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "error-large-icon": {};
        }
    }
}
