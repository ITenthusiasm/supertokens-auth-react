/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Imports.
 */

import { createComponent } from "@lit/react";
import React, { useCallback, useState, useMemo, useRef, useEffect, useLayoutEffect } from "react";
import type { MutableRefObject } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import ArrowRightIcon from "../../../../../components/assets/arrowRightIcon";
import EmailLargeIcon from "../../../../../components/assets/emailLargeIcon";
import { withWCOverride } from "../../../../../components/componentOverride/web-components/withWCOverride";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import { useOnMountAPICall } from "../../../../../utils";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import Session from "../../../../session/recipe";
import { registerSolidSendVerifyEmail } from "../../themes/emailVerification/SolidSendVerifyEmail";
import { TestContext } from "../../themes/emailVerification/SolidSendVerifyEmail";

import type { Awaited } from "../../../../../types";
import type { SendVerifyEmailThemeProps } from "../../../types";

import { createContext, ContextProvider, ContextConsumer, ContextEvent } from "@lit/context";
import LitSendVerifyEmail from "../../../../../../../wacky-experiments/LitSendVerifyEmail";

const ReactLitSendVerifyEmail = createComponent({
    tagName: "lit-send-verify-email",
    elementClass: LitSendVerifyEmail,
    react: React,
});

export const EmailVerificationSendVerifyEmail: React.FC<SendVerifyEmailThemeProps> = (props) => {
    const t = useTranslation();
    const userContext = useUserContext();
    console.log("User Context from Regular Component: ", userContext);

    // Register Data for Web Component (Icky Approach)
    useMemo(() => {
        registerSolidSendVerifyEmail({
            recipeImplementation: props.recipeImplementation,
            // DEFERRED: What about using `extends` with regular Web Components?
            // The underlying question is: How important is it for people to be able to override functions on the underlying
            // Web Components? And is said approach the best from a UX and Maintainability perspective?
            // ...
            // It could also be profitable to identify the User Experiences that are _truly_ worth losing on the WC side.
            // (Can we provide a better alternative? Was the experience never needed? Are we just gravitating to a tool?)
            // ...
            // SEPARATELY, what about only using the ShadowDOM in some areas? (e.g., where there won't be conflicts with LastPass)
            // https://discord.com/channels/1012791295170859069/1101149710649135184/1101149710649135184 ... Trying to work
            // around the Shadow DOM sounds like it can cause a lot more trouble than we'd expect.
            signOut: props.signOut,
            redirectToAuth: props.redirectToAuth,
            userContext,
            t,
        });
    }, []);

    const providerDiv = useRef() as MutableRefObject<HTMLDivElement>;
    useLayoutEffect(() => {
        const element = providerDiv.current;
        Object.assign(element, {
            _provider: new ContextProvider(element, { context: TestContext, initialValue: props }),
        });
    }, []);

    // const element = useRef() as MutableRefObject<HTMLElement>;
    // useLayoutEffect(() => {
    //     (element.current as any).setCustomData({
    //         recipeImplementation: props.recipeImplementation,
    //         onEmailAlreadyVerified: props.onEmailAlreadyVerified,
    //         signOut: props.signOut,
    //         redirectToAuth: props.redirectToAuth,
    //         userContext,
    //         t,
    //     });
    // }, []);

    // return <ReactLitSendVerifyEmail {...props} t={t} userContext={userContext} />;
    return (
        <div ref={providerDiv}>
            <solid-send-verify-email {...props}></solid-send-verify-email>
        </div>
    );
};

export const SendVerifyEmail = withOverride("EmailVerificationSendVerifyEmail", EmailVerificationSendVerifyEmail);

/* WARNING: Trying to bypass React will also result in us bypassing Context Data. So we can't do that right now. */
// export const SendVerifyEmail = withWCOverride(
//     "EmailVerificationSendVerifyEmail",
//     "solid-send-verify-email",
//     registerSolidSendVerifyEmail
// );
