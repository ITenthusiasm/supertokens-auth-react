import React, { useMemo } from "react";

import { useComponentOverride } from "../useComponentOverride";

/*
 * WARNING: Trying to bypass React and render the Web Component(s) directly will result in us bypassing the Context Data
 * exposed by React. So we can't leverage this function/HOC right now. We'll need to develop a solution for passing
 * context data to Web Components first. How do we want to handle "Contexts" for WCs?
 */
export function withWCOverride<Props extends Record<string, unknown>>(
    overrideKey: string,
    ElementName: string,
    registrant: (data: Props) => void
): React.ComponentType<Props> {
    const finalKey = `${overrideKey}_Override`;

    const Component = (props: Props) => {
        console.log("Override Component Props: ", props);
        const OverrideComponent = useComponentOverride(finalKey);
        useMemo(() => registrant(props), [props]);

        if (OverrideComponent !== null) {
            return <OverrideComponent DefaultComponent={ElementName} {...props} />;
        }

        return <ElementName {...props} />;
    };

    Component.displayName = finalKey;
    return Component;
}
