/// <reference types="react" />
interface SolidThemeBaseProps {
    loaddefaultfont: boolean;
    /**
     * Usually, this would be a `string[]`. But to simplify the Solid experimentation,
     * this is assumed to be a comman-separated string instead.
     */
    userStyles?: string;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "solid-theme-base": SolidThemeBaseProps & {
                children: React.ReactNode;
            };
        }
    }
}
export {};
