import React from "react";
export declare function withWCOverride<Props extends Record<string, unknown>>(
    overrideKey: string,
    ElementName: string,
    registrant: (data: Props) => void
): React.ComponentType<Props>;
