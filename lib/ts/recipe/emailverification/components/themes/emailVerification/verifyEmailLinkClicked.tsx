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

import { useCallback, useState, useMemo } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import ArrowRightIcon from "../../../../../components/assets/arrowRightIcon";
import CheckedRoundIcon from "../../../../../components/assets/checkedRoundIcon";
import ErrorLargeIcon from "../../../../../components/assets/errorLargeIcon";
import SpinnerIcon from "../../../../../components/assets/spinnerIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import { useOnMountAPICall } from "../../../../../utils";
import { Button } from "../../../../emailpassword/components/library";
import useSessionContext from "../../../../session/useSessionContext";

import { registerSolidVerifyEmailLinkClicked } from "./SolidVerifyEmailLinkClicked";

import type { Awaited } from "../../../../../types";
import type { VerifyEmailLinkClickedThemeProps } from "../../../types";

export const EmailVerificationVerifyEmailLinkClicked: React.FC<VerifyEmailLinkClickedThemeProps> = (props) => {
    const t = useTranslation();
    const sessionContext = useSessionContext();
    const userContext = useUserContext();

    useMemo((): void => {
        registerSolidVerifyEmailLinkClicked({
            recipeImplementation: props.recipeImplementation,
            onTokenInvalidRedirect: props.onTokenInvalidRedirect,
            sessionContext,
            userContext,
            t,
        });
    }, []);

    return <solid-verify-email-link-clicked {...props}></solid-verify-email-link-clicked>;
};

export const VerifyEmailLinkClicked = withOverride(
    "EmailVerificationVerifyEmailLinkClicked",
    EmailVerificationVerifyEmailLinkClicked
);
