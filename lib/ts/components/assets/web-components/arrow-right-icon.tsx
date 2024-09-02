/** @jsxImportSource solid-js */
/** @jsx preserve */
import { customElement, noShadowDOM } from "solid-element";

interface ArrowRightIconProps {
    color?: string;
}

const SolidArrowRightIcon = customElement("arrow-right-icon", { color: undefined }, (props: ArrowRightIconProps) => {
    noShadowDOM();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11.272"
            height="9.49"
            viewBox="0 0 11.272 9.49"
            data-supertokens="arrowRightIcon">
            <path
                fill={props.color}
                stroke="#fff"
                stroke-width="0.75px"
                d="M9.931 3.545h.016-7.041L5.12 1.33a.581.581 0 0 0 0-.817L4.775.168a.576.576 0 0 0-.813 0L.168 3.962a.58.58 0 0 0 0 .816l3.794 3.794a.577.577 0 0 0 .813 0l.344-.345a.57.57 0 0 0 .168-.407.553.553 0 0 0-.168-.4L2.881 5.191h7.058a.6.6 0 0 0 .584-.59v-.487a.585.585 0 0 0-.592-.569z"
                transform="rotate(180 5.449 4.558)"
            />
        </svg>
    );
});

declare module "solid-js" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "arrow-right-icon": ArrowRightIconProps;
        }
    }
}
