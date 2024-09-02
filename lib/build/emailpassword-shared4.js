"use strict";

var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var STGeneralError = require("supertokens-web-js/utils/error");
var constants = require("./emailpassword-shared3.js");
require("./index2.js");
var translationContext = require("./translationContext.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);
var STGeneralError__default = /*#__PURE__*/ _interopDefault(STGeneralError);

/*
 * Component.
 */
function Button({ type, label, disabled, isLoading, onClick }) {
    const t = translationContext.useTranslation();
    if (disabled === undefined) {
        disabled = false;
    }
    return jsxRuntime.jsxs("button", {
        type: type,
        disabled: disabled,
        onClick: onClick,
        "data-supertokens": "button",
        children: [t(label), isLoading && "..."],
    });
}

/*
 * Component.
 */
function FormRow({ children, hasError }) {
    return jsxRuntime.jsx("div", {
        "data-supertokens": ["formRow", hasError ? "hasError" : ""].join(" "),
        children: children,
    });
}

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
/*
 * Component.
 */
function CheckedIcon() {
    return jsxRuntime.jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "14.862",
        height: "12.033",
        viewBox: "0 0 14.862 12.033",
        "data-supertokens": "checkedIcon",
        children: jsxRuntime.jsx("path", {
            fill: "rgb(var(--palette-primary))",
            d: "M12.629 49L5.06 56.572l-2.829-2.829L0 55.977l5.057 5.057.654-.651 9.152-9.152z",
            transform: "translate(0 -49)",
        }),
    });
}

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
/*
 * Component.
 */
function ErrorIcon() {
    return jsxRuntime.jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "17",
        height: "15",
        viewBox: "0 0 17 15",
        "data-supertokens": "errorIcon",
        children: jsxRuntime.jsxs("g", {
            children: [
                jsxRuntime.jsx("g", {
                    className: "Asdf",
                    fill: "rgb(var(--palette-error))",
                    children: jsxRuntime.jsx("path", {
                        d: "M13.568 14.75H3.432c-.63 0-1.195-.325-1.512-.869-.317-.544-.32-1.196-.01-1.744l5.067-8.943c.315-.556.884-.887 1.523-.887.639 0 1.208.331 1.523.887l5.067 8.943c.31.548.307 1.2-.01 1.744s-.882.869-1.512.869z",
                        transform: "translate(-824.894 -352.829) translate(824.894 352.829)",
                    }),
                }),
                jsxRuntime.jsx("text", {
                    fill: "#fff",
                    fontSize: "10px",
                    fontWeight: "700",
                    transform: "translate(-824.894 -352.829) translate(832.014 365.198)",
                    children: jsxRuntime.jsx("tspan", { x: "0", y: "0", children: "!" }),
                }),
            ],
        }),
    });
}

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
/*
 * Component.
 */
function ShowPasswordIcon({ showPassword }) {
    if (showPassword === true) {
        return jsxRuntime.jsx("div", {
            children: jsxRuntime.jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "18.391",
                height: "16.276",
                viewBox: "0 0 18.391 16.276",
                "data-supertokens": "showPasswordIcon show",
                children: jsxRuntime.jsxs("g", {
                    children: [
                        jsxRuntime.jsx("g", {
                            children: jsxRuntime.jsx("g", {
                                children: jsxRuntime.jsx("g", {
                                    children: jsxRuntime.jsx("path", {
                                        fill: "rgb(var(--palette-textPrimary))",
                                        d: "M29.289 100.33c-2.4-3.63-5.619-5.63-9.069-5.63s-6.67 2-9.069 5.63a.767.767 0 0 0 0 .845c2.4 3.63 5.619 5.63 9.069 5.63s6.67-2 9.069-5.63a.767.767 0 0 0 0-.845zm-9.069 4.944c-2.785 0-5.435-1.6-7.5-4.519 2.065-2.92 4.715-4.519 7.5-4.519s5.435 1.6 7.5 4.519c-2.064 2.92-4.711 4.519-7.5 4.519z",
                                        transform:
                                            "translate(-822 -420.048) translate(822 422.035) translate(-11.025 -94.7)",
                                    }),
                                }),
                            }),
                        }),
                        jsxRuntime.jsxs("g", {
                            fill: "rgb(var(--palette-textPrimary))",
                            stroke: "rgb(var(--palette-inputBackground))",
                            transform: "translate(-822 -420.048) translate(827.164 424.055)",
                            children: [
                                jsxRuntime.jsx("circle", { cx: "4.036", cy: "4.036", r: "4.036", stroke: "none" }),
                                jsxRuntime.jsx("circle", { cx: "4.036", cy: "4.036", r: "3.536", fill: "none" }),
                            ],
                        }),
                        jsxRuntime.jsx("path", {
                            fill: "none",
                            stroke: "#707070",
                            strokeLinecap: "round",
                            strokeWidth: "2.25px",
                            d: "M11.981 0L0 11.981",
                            transform: "translate(-822 -420.048) translate(825.084 421.639)",
                        }),
                        jsxRuntime.jsx("path", {
                            fill: "none",
                            stroke: "rgb(var(--palette-inputBackground))",
                            strokeLinecap: "round",
                            d: "M13.978 0L0 13.978",
                            transform: "translate(-822 -420.048) translate(825.084 421.639)",
                        }),
                    ],
                }),
            }),
        });
    }
    return jsxRuntime.jsx("div", {
        children: jsxRuntime.jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "18.281",
            height: "12.033",
            viewBox: "0 0 18.281 12.033",
            "data-supertokens": "showPasswordIcon hide",
            children: jsxRuntime.jsxs("g", {
                children: [
                    jsxRuntime.jsx("g", {
                        children: jsxRuntime.jsx("g", {
                            children: jsxRuntime.jsx("g", {
                                children: jsxRuntime.jsx("path", {
                                    fill: "rgb(var(--palette-textPrimary))",
                                    d: "M29.18 100.3c-2.384-3.608-5.586-5.6-9.015-5.6s-6.63 1.989-9.015 5.6a.763.763 0 0 0 0 .84c2.384 3.608 5.586 5.6 9.015 5.6s6.63-1.989 9.015-5.6a.763.763 0 0 0 0-.84zm-9.015 4.914c-2.769 0-5.4-1.589-7.459-4.492 2.052-2.9 4.686-4.492 7.459-4.492s5.4 1.589 7.459 4.492c-2.056 2.899-4.686 4.489-7.458 4.489z",
                                    transform:
                                        "translate(-822 -422.088) translate(822 422.088) translate(-11.025 -94.7)",
                                }),
                            }),
                        }),
                    }),
                    jsxRuntime.jsxs("g", {
                        fill: "rgb(var(--palette-textPrimary))",
                        stroke: "rgb(var(--palette-inputBackground))",
                        transform: "translate(-822 -422.088) translate(827.133 424.096)",
                        children: [
                            jsxRuntime.jsx("circle", { cx: "4.012", cy: "4.012", r: "4.012", stroke: "none" }),
                            jsxRuntime.jsx("circle", { cx: "4.012", cy: "4.012", r: "3.512", fill: "none" }),
                        ],
                    }),
                ],
            }),
        }),
    });
}

const Input = ({
    type,
    name,
    hasError,
    autoComplete,
    onInputFocus,
    onInputBlur,
    onChange,
    value,
    placeholder,
    validated,
    autofocus,
}) => {
    const t = translationContext.useTranslation();
    const [showPassword, setShowPassword] = React.useState(false);
    /*
     * Method.
     */
    function handleFocus() {
        if (onInputFocus !== undefined) {
            onInputFocus(value);
        }
    }
    function handleBlur() {
        if (onInputBlur !== undefined) {
            onInputBlur(value);
        }
    }
    function handleChange(event) {
        if (onChange) {
            onChange(event.target.value);
        }
    }
    if (autoComplete === undefined) {
        autoComplete = "off";
    }
    let inputType = type;
    if (type === "password" && showPassword === true) {
        inputType = "text";
    }
    return jsxRuntime.jsx("div", {
        "data-supertokens": "inputContainer",
        children: jsxRuntime.jsxs("div", {
            "data-supertokens": ["inputWrapper", hasError ? "inputError" : ""].join(" "),
            children: [
                jsxRuntime.jsx("input", {
                    autoFocus: autofocus,
                    autoComplete: autoComplete,
                    "data-supertokens": `input input-${name}`,
                    className: "supertokens-input",
                    onFocus: handleFocus,
                    onBlur: handleBlur,
                    type: inputType,
                    name: name,
                    placeholder: t(placeholder),
                    onChange: handleChange,
                    value: value,
                }),
                hasError === true &&
                    jsxRuntime.jsx("div", {
                        "data-supertokens": "inputAdornment inputAdornmentError",
                        children: jsxRuntime.jsx(ErrorIcon, {}),
                    }),
                validated === true &&
                    hasError === false &&
                    jsxRuntime.jsx("div", {
                        "data-supertokens": "inputAdornment inputAdornmentSuccess",
                        children: jsxRuntime.jsx(CheckedIcon, {}),
                    }),
                type === "password" &&
                    value.length > 0 &&
                    jsxRuntime.jsx("div", {
                        onClick: () => setShowPassword(showPassword === false),
                        "data-supertokens": "inputAdornment showPassword",
                        children: jsxRuntime.jsx(ShowPasswordIcon, { showPassword: showPassword }),
                    }),
            ],
        }),
    });
};

function InputError({ error }) {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsx("div", { "data-supertokens": "inputErrorMessage", children: t(error) });
}

function Label({ value, showIsRequired }) {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsxs("div", {
        "data-supertokens": "label",
        children: [t(value), showIsRequired && value && value.trim() !== "" && " *"],
    });
}

const fetchDefaultValue = (field) => {
    if (field.getDefaultValue !== undefined) {
        const defaultValue = field.getDefaultValue();
        if (typeof defaultValue !== "string") {
            throw new Error(`getDefaultValue for ${field.id} must return a string`);
        } else {
            return defaultValue;
        }
    }
    return "";
};
function InputComponentWrapper(props) {
    const { field, type, fstate, onInputFocus, onInputBlur, onInputChange } = props;
    const useCallbackOnInputFocus = React.useCallback(
        (value) => {
            onInputFocus({
                id: field.id,
                value,
            });
        },
        [onInputFocus, field.id]
    );
    const useCallbackOnInputBlur = React.useCallback(
        (value) => {
            onInputBlur({
                id: field.id,
                value,
            });
        },
        [onInputBlur, field.id]
    );
    const useCallbackOnInputChange = React.useCallback(
        (value) => {
            onInputChange({
                id: field.id,
                value,
            });
        },
        [onInputChange, field.id]
    );
    return field.inputComponent !== undefined
        ? jsxRuntime.jsx(
              field.inputComponent,
              {
                  type: type,
                  name: field.id,
                  validated: fstate.validated === true,
                  placeholder: field.placeholder,
                  value: fstate.value,
                  autoComplete: field.autoComplete,
                  autofocus: field.autofocus,
                  onInputFocus: useCallbackOnInputFocus,
                  onInputBlur: useCallbackOnInputBlur,
                  onChange: useCallbackOnInputChange,
                  hasError: fstate.error !== undefined,
              },
              field.id
          )
        : jsxRuntime.jsx(
              Input,
              {
                  type: type,
                  name: field.id,
                  validated: fstate.validated === true,
                  placeholder: field.placeholder,
                  value: fstate.value,
                  autoComplete: field.autoComplete,
                  onInputFocus: useCallbackOnInputFocus,
                  onInputBlur: useCallbackOnInputBlur,
                  onChange: useCallbackOnInputChange,
                  autofocus: field.autofocus,
                  hasError: fstate.error !== undefined,
              },
              field.id
          );
}
const FormBase = (props) => {
    const { footer, buttonLabel, showLabels, validateOnBlur, formFields } = props;
    const unmounting = React.useRef(new AbortController());
    React.useEffect(() => {
        // We need this because in some cases this gets called multiple times
        unmounting.current = new AbortController();
        return () => {
            unmounting.current.abort();
        };
    }, [unmounting]);
    const [fieldStates, setFieldStates] = React.useState(
        props.formFields.map((f) => ({ id: f.id, value: fetchDefaultValue(f) }))
    );
    React.useEffect(() => {
        setFieldStates((fs) => {
            let ret = fs;
            const fieldsWithoutState = props.formFields.filter((f) => !fieldStates.some((s) => f.id === s.id));
            // If there is a formfield missing from the states array, we fill with the default value
            if (fieldsWithoutState.length > 0) {
                fs = [...fs, ...fieldsWithoutState.map((f) => ({ id: f.id, value: fetchDefaultValue(f) }))];
            }
            // If a field has been removed from formFields, we want to remove it from the states array as well.
            if (fieldStates.some((s) => !props.formFields.some((f) => f.id === s.id))) {
                ret = fs.filter((s) => props.formFields.some((f) => f.id === s.id));
            }
            return ret;
        });
    }, [props.formFields, setFieldStates]);
    const [isLoading, setIsLoading] = React.useState(false);
    const updateFieldState = React.useCallback(
        (id, update) => {
            setFieldStates((os) => {
                const field = os.find((f) => f.id === id);
                if (field === undefined) {
                    return [...os, update({ id, value: "" })];
                }
                return os.filter((f) => f.id !== field.id).concat(update(field));
            });
        },
        [setFieldStates]
    );
    const onInputFocus = React.useCallback(
        (field) => {
            updateFieldState(field.id, (os) => ({ ...os, validated: false }));
        },
        [updateFieldState]
    );
    const onInputBlur = React.useCallback(
        async (field) => {
            if (!validateOnBlur) {
                return;
            }
            // This should never be undefined, but even if it is, we can
            const fieldConfig = props.formFields.find((f) => f.id === field.id);
            const error = fieldConfig && field.value !== "" ? await fieldConfig.validate(field.value) : undefined;
            updateFieldState(field.id, (os) => ({
                ...os,
                error,
                validated: error === undefined && field.value.length !== 0,
            }));
        },
        [validateOnBlur, updateFieldState, props.formFields]
    );
    const onInputChange = React.useCallback(
        (field) => {
            if (typeof field.value !== "string") {
                throw new Error(`${field.id} value must be a string`);
            }
            updateFieldState(field.id, (os) => ({ ...os, value: field.value, error: undefined }));
            props.clearError();
        },
        [updateFieldState]
    );
    const onFormSubmit = React.useCallback(
        async (e) => {
            // Prevent default event propagation.
            e.preventDefault();
            // Set loading state.
            setIsLoading(true);
            setFieldStates((os) => os.map((fs) => ({ ...fs, error: undefined })));
            // Get the fields values from form.
            const apiFields = formFields.map((field) => {
                const fieldState = fieldStates.find((fs) => fs.id === field.id);
                return {
                    id: field.id,
                    value: fieldState === undefined ? "" : fieldState.value,
                };
            });
            const fieldUpdates = [];
            // Call API.
            try {
                let result;
                let generalError;
                let fetchError;
                try {
                    result = await props.callAPI(apiFields, (id, value) => fieldUpdates.push({ id, value }));
                } catch (e) {
                    if (STGeneralError__default.default.isThisError(e)) {
                        generalError = e;
                    } else if (e instanceof Response) {
                        fetchError = e;
                    } else {
                        throw e;
                    }
                }
                if (unmounting.current.signal.aborted) {
                    return;
                }
                if (generalError !== undefined || (result !== undefined && result.status !== "OK")) {
                    for (const field of formFields) {
                        const update = fieldUpdates.find((f) => f.id === field.id);
                        if (update || field.clearOnSubmit === true) {
                            // We can do these one by one, it's almost never more than one field
                            updateFieldState(field.id, (os) => ({ ...os, value: update ? update.value : "" }));
                        }
                    }
                }
                if (generalError !== undefined) {
                    props.onError(generalError.message);
                } else if (fetchError !== undefined) {
                    if (props.onFetchError) {
                        props.onFetchError(fetchError);
                    } else {
                        throw fetchError;
                    }
                } else {
                    // If successful
                    if (result.status === "OK") {
                        setIsLoading(false);
                        props.clearError();
                        if (props.onSuccess !== undefined) {
                            props.onSuccess(result);
                        }
                    }
                    if (unmounting.current.signal.aborted) {
                        return;
                    }
                    // If field error.
                    if (result.status === "FIELD_ERROR") {
                        const errorFields = result.formFields;
                        const getErrorMessage = (fs) => {
                            const errorMessage = errorFields.find((ef) => ef.id === fs.id)?.error;
                            if (errorMessage === "Field is not optional") {
                                const fieldConfigData = props.formFields.find((f) => f.id === fs.id);
                                // replace non-optional server error message from nonOptionalErrorMsg
                                if (fieldConfigData?.nonOptionalErrorMsg !== undefined) {
                                    return fieldConfigData?.nonOptionalErrorMsg;
                                }
                            }
                            return errorMessage;
                        };
                        setFieldStates((os) => os.map((fs) => ({ ...fs, error: getErrorMessage(fs) })));
                    }
                }
            } catch (e) {
                props.onError("SOMETHING_WENT_WRONG_ERROR");
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setFieldStates, props, formFields, fieldStates]
    );
    return jsxRuntime.jsx(FormStateContext.Provider, {
        value: fieldStates,
        children: jsxRuntime.jsxs("form", {
            autoComplete: "on",
            noValidate: true,
            onSubmit: onFormSubmit,
            "data-supertokens": props.formDataSupertokens,
            children: [
                formFields
                    .filter((f) => f.hidden !== true)
                    .map((field) => {
                        let type = "text";
                        // If email or password, replace field type.
                        if (constants.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                            type = field.id;
                        }
                        if (field.id === "confirm-password") {
                            type = "password";
                        }
                        const fstate = fieldStates.find((s) => s.id === field.id) || {
                            id: field.id,
                            value: fetchDefaultValue(field),
                        };
                        return jsxRuntime.jsx(
                            FormRow,
                            {
                                hasError: fstate.error !== undefined,
                                children: jsxRuntime.jsxs(React.Fragment, {
                                    children: [
                                        showLabels &&
                                            (field.labelComponent !== undefined
                                                ? field.labelComponent
                                                : jsxRuntime.jsx(Label, {
                                                      value: field.label,
                                                      showIsRequired: field.showIsRequired,
                                                  })),
                                        jsxRuntime.jsx(InputComponentWrapper, {
                                            type: type,
                                            field: field,
                                            fstate: fstate,
                                            onInputFocus: onInputFocus,
                                            onInputBlur: onInputBlur,
                                            onInputChange: onInputChange,
                                        }),
                                        fstate.error && jsxRuntime.jsx(InputError, { error: fstate.error }),
                                    ],
                                }),
                            },
                            field.id
                        );
                    }),
                jsxRuntime.jsx(
                    FormRow,
                    {
                        children: jsxRuntime.jsxs(React.Fragment, {
                            children: [
                                jsxRuntime.jsx(Button, {
                                    disabled: isLoading,
                                    isLoading: isLoading,
                                    type: "submit",
                                    label: buttonLabel,
                                }),
                                footer,
                            ],
                        }),
                    },
                    "form-button"
                ),
            ],
        }),
    });
};
const FormStateContext = React__default.default.createContext(undefined);
const useFormFields = () => {
    const ctx = React.useContext(FormStateContext);
    if (ctx === undefined) {
        throw new Error("useFormState used outside FormBase");
    }
    return ctx;
};

exports.Button = Button;
exports.ErrorIcon = ErrorIcon;
exports.FormBase = FormBase;
exports.FormRow = FormRow;
exports.Label = Label;
exports.useFormFields = useFormFields;
