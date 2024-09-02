/** @jsxImportSource solid-js */
/** @jsx preserve */
import { customElement, noShadowDOM } from "solid-element";

const SolidCheckedRoundIcon = customElement("checked-round-icon", {}, () => {
    noShadowDOM();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            viewBox="0 0 33 33"
            data-supertokens="checkedRoundIcon">
            <g fill="rgb(var(--palette-success))" stroke="rgb(var(--palette-success))">
                <path
                    d="M6.715 15.334a1.135 1.135 0 0 1 1.605-1.605l4.558 4.558 9.573-9.573a1.135 1.135 0 0 1 1.605 1.605L13.748 20.627a1.231 1.231 0 0 1-1.741 0z"
                    transform="translate(-.5 -.5) translate(1.242 1.703)"
                />
                <path
                    fill-rule="evenodd"
                    d="M17 1a16 16 0 1 0 16 16A16 16 0 0 0 17 1zM3.462 17A13.538 13.538 0 1 1 17 30.538 13.538 13.538 0 0 1 3.462 17z"
                    transform="translate(-.5 -.5)"
                />
            </g>
        </svg>
    );
});

declare module "solid-js" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "checked-round-icon": {};
        }
    }
}
