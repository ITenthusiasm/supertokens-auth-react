"use strict";

var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var session = require("./session.js");
var recipe = require("./emailverification-shared.js");
var React = require("react");
var types = require("./multifactorauth-shared.js");
var translationContext = require("./translationContext.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var translations = require("./emailverification-shared2.js");
require("supertokens-web-js/utils/windowHandler");
require("react-dom");
require("./multitenancy-shared.js");
require("./multifactorauth-shared2.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");
require("./authRecipe-shared.js");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/recipe/session");
require("./session-shared.js");
require("supertokens-web-js/recipe/emailverification");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== "default") {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                    n,
                    k,
                    d.get
                        ? d
                        : {
                              enumerable: true,
                              get: function () {
                                  return e[k];
                              },
                          }
                );
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);
var React__namespace = /*#__PURE__*/ _interopNamespace(React);
var STGeneralError__default = /*#__PURE__*/ _interopDefault(STGeneralError);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$4 = new Set(["children", "localName", "ref", "style", "className"]),
    n$5 = new WeakMap(),
    t$2 = (e, t, o, l, a) => {
        const s = a?.[t];
        void 0 === s
            ? ((e[t] = o), null == o && t in HTMLElement.prototype && e.removeAttribute(t))
            : o !== l &&
              ((e, t, o) => {
                  let l = n$5.get(e);
                  void 0 === l && n$5.set(e, (l = new Map()));
                  let a = l.get(t);
                  void 0 !== o
                      ? void 0 === a
                          ? (l.set(t, (a = { handleEvent: o })), e.addEventListener(t, a))
                          : (a.handleEvent = o)
                      : void 0 !== a && (l.delete(t), e.removeEventListener(t, a));
              })(e, s, o);
    },
    o$3 = ({ react: n, tagName: o, elementClass: l, events: a, displayName: s }) => {
        const c = new Set(Object.keys(a ?? {})),
            r = n.forwardRef((s, r) => {
                const i = n.useRef(new Map()),
                    d = n.useRef(null),
                    f = {},
                    u = {};
                for (const [n, t] of Object.entries(s))
                    e$4.has(n)
                        ? (f["className" === n ? "class" : n] = t)
                        : c.has(n) || n in l.prototype
                        ? (u[n] = t)
                        : (f[n] = t);
                return (
                    n.useLayoutEffect(() => {
                        if (null === d.current) return;
                        const e = new Map();
                        for (const n in u)
                            t$2(d.current, n, s[n], i.current.get(n), a), i.current.delete(n), e.set(n, s[n]);
                        for (const [e, n] of i.current) t$2(d.current, e, void 0, n, a);
                        i.current = e;
                    }),
                    n.useLayoutEffect(() => {
                        d.current?.removeAttribute("defer-hydration");
                    }, []),
                    (f.suppressHydrationWarning = !0),
                    n.createElement(o, {
                        ...f,
                        ref: n.useCallback(
                            (e) => {
                                (d.current = e), "function" == typeof r ? r(e) : null !== r && (r.current = e);
                            },
                            [r]
                        ),
                    })
                );
            });
        return (r.displayName = s ?? l.name), r;
    };

const booleans = [
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "inert",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected",
];
const Properties = /*#__PURE__*/ new Set([
    "className",
    "value",
    "readOnly",
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    ...booleans,
]);
const ChildProperties = /*#__PURE__*/ new Set(["innerHTML", "textContent", "innerText", "children"]);
const Aliases = /*#__PURE__*/ Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for",
});
const PropAliases = /*#__PURE__*/ Object.assign(Object.create(null), {
    class: "className",
    formnovalidate: {
        $: "formNoValidate",
        BUTTON: 1,
        INPUT: 1,
    },
    ismap: {
        $: "isMap",
        IMG: 1,
    },
    nomodule: {
        $: "noModule",
        SCRIPT: 1,
    },
    playsinline: {
        $: "playsInline",
        VIDEO: 1,
    },
    readonly: {
        $: "readOnly",
        INPUT: 1,
        TEXTAREA: 1,
    },
});
function getPropAlias(prop, tagName) {
    const a = PropAliases[prop];
    return typeof a === "object" ? (a[tagName] ? a["$"] : undefined) : a;
}
const DelegatedEvents = /*#__PURE__*/ new Set([
    "beforeinput",
    "click",
    "dblclick",
    "contextmenu",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "touchend",
    "touchmove",
    "touchstart",
]);
const SVGElements = /*#__PURE__*/ new Set([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animate",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "color-profile",
    "cursor",
    "defs",
    "desc",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "font",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "foreignObject",
    "g",
    "glyph",
    "glyphRef",
    "hkern",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "metadata",
    "missing-glyph",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "set",
    "stop",
    "svg",
    "switch",
    "symbol",
    "text",
    "textPath",
    "tref",
    "tspan",
    "use",
    "view",
    "vkern",
]);
const SVGNamespace = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
};

function reconcileArrays(parentNode, a, b) {
    let bLength = b.length,
        aEnd = a.length,
        bEnd = bLength,
        aStart = 0,
        bStart = 0,
        after = a[aEnd - 1].nextSibling,
        map = null;
    while (aStart < aEnd || bStart < bEnd) {
        if (a[aStart] === b[bStart]) {
            aStart++;
            bStart++;
            continue;
        }
        while (a[aEnd - 1] === b[bEnd - 1]) {
            aEnd--;
            bEnd--;
        }
        if (aEnd === aStart) {
            const node = bEnd < bLength ? (bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart]) : after;
            while (bStart < bEnd) parentNode.insertBefore(b[bStart++], node);
        } else if (bEnd === bStart) {
            while (aStart < aEnd) {
                if (!map || !map.has(a[aStart])) a[aStart].remove();
                aStart++;
            }
        } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
            const node = a[--aEnd].nextSibling;
            parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
            parentNode.insertBefore(b[--bEnd], node);
            a[aEnd] = b[bEnd];
        } else {
            if (!map) {
                map = new Map();
                let i = bStart;
                while (i < bEnd) map.set(b[i], i++);
            }
            const index = map.get(a[aStart]);
            if (index != null) {
                if (bStart < index && index < bEnd) {
                    let i = aStart,
                        sequence = 1,
                        t;
                    while (++i < aEnd && i < bEnd) {
                        if ((t = map.get(a[i])) == null || t !== index + sequence) break;
                        sequence++;
                    }
                    if (sequence > index - bStart) {
                        const node = a[aStart];
                        while (bStart < index) parentNode.insertBefore(b[bStart++], node);
                    } else parentNode.replaceChild(b[bStart++], a[aStart++]);
                } else aStart++;
            } else a[aStart++].remove();
        }
    }
}

const $$EVENTS = "_$DX_DELEGATE";
function delegateEvents(eventNames, document = window.document) {
    const e = document[$$EVENTS] || (document[$$EVENTS] = new Set());
    for (let i = 0, l = eventNames.length; i < l; i++) {
        const name = eventNames[i];
        if (!e.has(name)) {
            e.add(name);
            document.addEventListener(name, eventHandler);
        }
    }
}
function setAttribute(node, name, value) {
    if (value == null) node.removeAttribute(name);
    else node.setAttribute(name, value);
}
function setAttributeNS(node, namespace, name, value) {
    if (value == null) node.removeAttributeNS(namespace, name);
    else node.setAttributeNS(namespace, name, value);
}
function className(node, value) {
    if (value == null) node.removeAttribute("class");
    else node.className = value;
}
function addEventListener(node, name, handler, delegate) {
    if (delegate) {
        if (Array.isArray(handler)) {
            node[`$$${name}`] = handler[0];
            node[`$$${name}Data`] = handler[1];
        } else node[`$$${name}`] = handler;
    } else if (Array.isArray(handler)) {
        const handlerFn = handler[0];
        node.addEventListener(name, (handler[0] = (e) => handlerFn.call(node, handler[1], e)));
    } else node.addEventListener(name, handler);
}
function classList(node, value, prev = {}) {
    const classKeys = Object.keys(value || {}),
        prevKeys = Object.keys(prev);
    let i, len;
    for (i = 0, len = prevKeys.length; i < len; i++) {
        const key = prevKeys[i];
        if (!key || key === "undefined" || value[key]) continue;
        toggleClassKey(node, key, false);
        delete prev[key];
    }
    for (i = 0, len = classKeys.length; i < len; i++) {
        const key = classKeys[i],
            classValue = !!value[key];
        if (!key || key === "undefined" || prev[key] === classValue || !classValue) continue;
        toggleClassKey(node, key, true);
        prev[key] = classValue;
    }
    return prev;
}
function style(node, value, prev) {
    if (!value) return prev ? setAttribute(node, "style") : value;
    const nodeStyle = node.style;
    if (typeof value === "string") return (nodeStyle.cssText = value);
    typeof prev === "string" && (nodeStyle.cssText = prev = undefined);
    prev || (prev = {});
    value || (value = {});
    let v, s;
    for (s in prev) {
        value[s] == null && nodeStyle.removeProperty(s);
        delete prev[s];
    }
    for (s in value) {
        v = value[s];
        if (v !== prev[s]) {
            nodeStyle.setProperty(s, v);
            prev[s] = v;
        }
    }
    return prev;
}
function spread(node, props = {}, isSVG, skipChildren) {
    const prevProps = {};
    if (!skipChildren) {
        translationContext.createRenderEffect(
            () => (prevProps.children = insertExpression(node, props.children, prevProps.children))
        );
    }
    translationContext.createRenderEffect(() =>
        typeof props.ref === "function" ? use(props.ref, node) : (props.ref = node)
    );
    translationContext.createRenderEffect(() => assign(node, props, isSVG, true, prevProps, true));
    return prevProps;
}
function dynamicProperty(props, key) {
    const src = props[key];
    Object.defineProperty(props, key, {
        get() {
            return src();
        },
        enumerable: true,
    });
    return props;
}
function use(fn, element, arg) {
    return translationContext.untrack(() => fn(element, arg));
}
function insert(parent, accessor, marker, initial) {
    if (marker !== undefined && !initial) initial = [];
    if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
    translationContext.createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
}
function assign(node, props, isSVG, skipChildren, prevProps = {}, skipRef = false) {
    props || (props = {});
    for (const prop in prevProps) {
        if (!(prop in props)) {
            if (prop === "children") continue;
            prevProps[prop] = assignProp(node, prop, null, prevProps[prop], isSVG, skipRef);
        }
    }
    for (const prop in props) {
        if (prop === "children") {
            if (!skipChildren) insertExpression(node, props.children);
            continue;
        }
        const value = props[prop];
        prevProps[prop] = assignProp(node, prop, value, prevProps[prop], isSVG, skipRef);
    }
}
function toPropertyName(name) {
    return name.toLowerCase().replace(/-([a-z])/g, (_, w) => w.toUpperCase());
}
function toggleClassKey(node, key, value) {
    const classNames = key.trim().split(/\s+/);
    for (let i = 0, nameLen = classNames.length; i < nameLen; i++) node.classList.toggle(classNames[i], value);
}
function assignProp(node, prop, value, prev, isSVG, skipRef) {
    let isCE, isProp, isChildProp, propAlias, forceProp;
    if (prop === "style") return style(node, value, prev);
    if (prop === "classList") return classList(node, value, prev);
    if (value === prev) return prev;
    if (prop === "ref") {
        if (!skipRef) value(node);
    } else if (prop.slice(0, 3) === "on:") {
        const e = prop.slice(3);
        prev && node.removeEventListener(e, prev);
        value && node.addEventListener(e, value);
    } else if (prop.slice(0, 10) === "oncapture:") {
        const e = prop.slice(10);
        prev && node.removeEventListener(e, prev, true);
        value && node.addEventListener(e, value, true);
    } else if (prop.slice(0, 2) === "on") {
        const name = prop.slice(2).toLowerCase();
        const delegate = DelegatedEvents.has(name);
        if (!delegate && prev) {
            const h = Array.isArray(prev) ? prev[0] : prev;
            node.removeEventListener(name, h);
        }
        if (delegate || value) {
            addEventListener(node, name, value, delegate);
            delegate && delegateEvents([name]);
        }
    } else if (prop.slice(0, 5) === "attr:") {
        setAttribute(node, prop.slice(5), value);
    } else if (
        (forceProp = prop.slice(0, 5) === "prop:") ||
        (isChildProp = ChildProperties.has(prop)) ||
        (!isSVG && ((propAlias = getPropAlias(prop, node.tagName)) || (isProp = Properties.has(prop)))) ||
        (isCE = node.nodeName.includes("-"))
    ) {
        if (forceProp) {
            prop = prop.slice(5);
            isProp = true;
        }
        if (prop === "class" || prop === "className") className(node, value);
        else if (isCE && !isProp && !isChildProp) node[toPropertyName(prop)] = value;
        else node[propAlias || prop] = value;
    } else {
        const ns = isSVG && prop.indexOf(":") > -1 && SVGNamespace[prop.split(":")[0]];
        if (ns) setAttributeNS(node, ns, prop, value);
        else setAttribute(node, Aliases[prop] || prop, value);
    }
    return value;
}
function eventHandler(e) {
    const key = `$$${e.type}`;
    let node = (e.composedPath && e.composedPath()[0]) || e.target;
    if (e.target !== node) {
        Object.defineProperty(e, "target", {
            configurable: true,
            value: node,
        });
    }
    Object.defineProperty(e, "currentTarget", {
        configurable: true,
        get() {
            return node || document;
        },
    });
    while (node) {
        const handler = node[key];
        if (handler && !node.disabled) {
            const data = node[`${key}Data`];
            data !== undefined ? handler.call(node, data, e) : handler.call(node, e);
            if (e.cancelBubble) return;
        }
        node = node._$host || node.parentNode || node.host;
    }
}
function insertExpression(parent, value, current, marker, unwrapArray) {
    while (typeof current === "function") current = current();
    if (value === current) return current;
    const t = typeof value,
        multi = marker !== undefined;
    parent = (multi && current[0] && current[0].parentNode) || parent;
    if (t === "string" || t === "number") {
        if (t === "number") value = value.toString();
        if (multi) {
            let node = current[0];
            if (node && node.nodeType === 3) {
                node.data !== value && (node.data = value);
            } else node = document.createTextNode(value);
            current = cleanChildren(parent, current, marker, node);
        } else {
            if (current !== "" && typeof current === "string") {
                current = parent.firstChild.data = value;
            } else current = parent.textContent = value;
        }
    } else if (value == null || t === "boolean") {
        current = cleanChildren(parent, current, marker);
    } else if (t === "function") {
        translationContext.createRenderEffect(() => {
            let v = value();
            while (typeof v === "function") v = v();
            current = insertExpression(parent, v, current, marker);
        });
        return () => current;
    } else if (Array.isArray(value)) {
        const array = [];
        const currentArray = current && Array.isArray(current);
        if (normalizeIncomingArray(array, value, current, unwrapArray)) {
            translationContext.createRenderEffect(
                () => (current = insertExpression(parent, array, current, marker, true))
            );
            return () => current;
        }
        if (array.length === 0) {
            current = cleanChildren(parent, current, marker);
            if (multi) return current;
        } else if (currentArray) {
            if (current.length === 0) {
                appendNodes(parent, array, marker);
            } else reconcileArrays(parent, current, array);
        } else {
            current && cleanChildren(parent);
            appendNodes(parent, array);
        }
        current = array;
    } else if (value.nodeType) {
        if (Array.isArray(current)) {
            if (multi) return (current = cleanChildren(parent, current, marker, value));
            cleanChildren(parent, current, null, value);
        } else if (current == null || current === "" || !parent.firstChild) {
            parent.appendChild(value);
        } else parent.replaceChild(value, parent.firstChild);
        current = value;
    } else;
    return current;
}
function normalizeIncomingArray(normalized, array, current, unwrap) {
    let dynamic = false;
    for (let i = 0, len = array.length; i < len; i++) {
        let item = array[i],
            prev = current && current[normalized.length],
            t;
        if (item == null || item === true || item === false);
        else if ((t = typeof item) === "object" && item.nodeType) {
            normalized.push(item);
        } else if (Array.isArray(item)) {
            dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
        } else if (t === "function") {
            if (unwrap) {
                while (typeof item === "function") item = item();
                dynamic =
                    normalizeIncomingArray(
                        normalized,
                        Array.isArray(item) ? item : [item],
                        Array.isArray(prev) ? prev : [prev]
                    ) || dynamic;
            } else {
                normalized.push(item);
                dynamic = true;
            }
        } else {
            const value = String(item);
            if (prev && prev.nodeType === 3 && prev.data === value) normalized.push(prev);
            else normalized.push(document.createTextNode(value));
        }
    }
    return dynamic;
}
function appendNodes(parent, array, marker = null) {
    for (let i = 0, len = array.length; i < len; i++) parent.insertBefore(array[i], marker);
}
function cleanChildren(parent, current, marker, replacement) {
    if (marker === undefined) return (parent.textContent = "");
    const node = replacement || document.createTextNode("");
    if (current.length) {
        let inserted = false;
        for (let i = current.length - 1; i >= 0; i--) {
            const el = current[i];
            if (node !== el) {
                const isParent = el.parentNode === parent;
                if (!inserted && !i) isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
                else isParent && el.remove();
            } else inserted = true;
        }
    } else parent.insertBefore(node, marker);
    return [node];
}

const $ELEMENT = Symbol("hyper-element");
function createHyperScript(r) {
    function h() {
        let args = [].slice.call(arguments),
            e,
            multiExpression = false;
        while (Array.isArray(args[0])) args = args[0];
        if (args[0][$ELEMENT]) args.unshift(h.Fragment);
        typeof args[0] === "string" && detectMultiExpression(args);
        const ret = () => {
            while (args.length) item(args.shift());
            return e;
        };
        ret[$ELEMENT] = true;
        return ret;
        function item(l) {
            const type = typeof l;
            if (l == null);
            else if ("string" === type) {
                if (!e) parseClass(l);
                else e.appendChild(document.createTextNode(l));
            } else if ("number" === type || "boolean" === type || l instanceof Date || l instanceof RegExp) {
                e.appendChild(document.createTextNode(l.toString()));
            } else if (Array.isArray(l)) {
                for (let i = 0; i < l.length; i++) item(l[i]);
            } else if (l instanceof Element) {
                r.insert(e, l, multiExpression ? null : undefined);
            } else if ("object" === type) {
                let dynamic = false;
                const d = Object.getOwnPropertyDescriptors(l);
                for (const k in d) {
                    if (k !== "ref" && k.slice(0, 2) !== "on" && typeof d[k].value === "function") {
                        r.dynamicProperty(l, k);
                        dynamic = true;
                    } else if (d[k].get) dynamic = true;
                }
                dynamic
                    ? r.spread(e, l, e instanceof SVGElement, !!args.length)
                    : r.assign(e, l, e instanceof SVGElement, !!args.length);
            } else if ("function" === type) {
                if (!e) {
                    let props,
                        next = args[0];
                    if (
                        next == null ||
                        (typeof next === "object" && !Array.isArray(next) && !(next instanceof Element))
                    )
                        props = args.shift();
                    props || (props = {});
                    if (args.length) {
                        props.children = args.length > 1 ? args : args[0];
                    }
                    const d = Object.getOwnPropertyDescriptors(props);
                    for (const k in d) {
                        if (Array.isArray(d[k].value)) {
                            const list = d[k].value;
                            props[k] = () => {
                                for (let i = 0; i < list.length; i++) {
                                    while (list[i][$ELEMENT]) list[i] = list[i]();
                                }
                                return list;
                            };
                            r.dynamicProperty(props, k);
                        } else if (typeof d[k].value === "function" && !d[k].value.length) r.dynamicProperty(props, k);
                    }
                    e = r.createComponent(l, props);
                    args = [];
                } else {
                    while (l[$ELEMENT]) l = l();
                    r.insert(e, l, multiExpression ? null : undefined);
                }
            }
        }
        function parseClass(string) {
            const m = string.split(/([\.#]?[^\s#.]+)/);
            if (/^\.|#/.test(m[1])) e = document.createElement("div");
            for (let i = 0; i < m.length; i++) {
                const v = m[i],
                    s = v.substring(1, v.length);
                if (!v) continue;
                if (!e)
                    e = r.SVGElements.has(v)
                        ? document.createElementNS("http://www.w3.org/2000/svg", v)
                        : document.createElement(v);
                else if (v[0] === ".") e.classList.add(s);
                else if (v[0] === "#") e.setAttribute("id", s);
            }
        }
        function detectMultiExpression(list) {
            for (let i = 1; i < list.length; i++) {
                if (typeof list[i] === "function") {
                    multiExpression = true;
                    return;
                } else if (Array.isArray(list[i])) {
                    detectMultiExpression(list[i]);
                }
            }
        }
    }
    h.Fragment = (props) => props.children;
    return h;
}

const h$2 = createHyperScript({
    spread,
    assign,
    insert,
    createComponent: translationContext.createComponent,
    dynamicProperty,
    SVGElements,
});

function Fragment(props) {
    return props.children;
}
function jsx(type, props) {
    return h$2(type, props);
}

function cloneProps(props) {
    const propKeys = Object.keys(props);
    return propKeys.reduce((memo, k) => {
        const prop = props[k];
        memo[k] = Object.assign({}, prop);
        if (isObject(prop.value) && !isFunction(prop.value) && !Array.isArray(prop.value))
            memo[k].value = Object.assign({}, prop.value);
        if (Array.isArray(prop.value)) memo[k].value = prop.value.slice(0);
        return memo;
    }, {});
}

function normalizePropDefs(props) {
    if (!props) return {};
    const propKeys = Object.keys(props);
    return propKeys.reduce((memo, k) => {
        const v = props[k];
        memo[k] = !(isObject(v) && "value" in v)
            ? {
                  value: v,
              }
            : v;
        memo[k].attribute || (memo[k].attribute = toAttribute(k));
        memo[k].parse = "parse" in memo[k] ? memo[k].parse : typeof memo[k].value !== "string";
        return memo;
    }, {});
}
function propValues(props) {
    const propKeys = Object.keys(props);
    return propKeys.reduce((memo, k) => {
        memo[k] = props[k].value;
        return memo;
    }, {});
}
function initializeProps(element, propDefinition) {
    const props = cloneProps(propDefinition),
        propKeys = Object.keys(propDefinition);
    propKeys.forEach((key) => {
        const prop = props[key],
            attr = element.getAttribute(prop.attribute),
            value = element[key];
        if (attr) prop.value = prop.parse ? parseAttributeValue(attr) : attr;
        if (value != null) prop.value = Array.isArray(value) ? value.slice(0) : value;
        prop.reflect && reflect(element, prop.attribute, prop.value);
        Object.defineProperty(element, key, {
            get() {
                return prop.value;
            },

            set(val) {
                const oldValue = prop.value;
                prop.value = val;
                prop.reflect && reflect(this, prop.attribute, prop.value);

                for (let i = 0, l = this.__propertyChangedCallbacks.length; i < l; i++) {
                    this.__propertyChangedCallbacks[i](key, val, oldValue);
                }
            },

            enumerable: true,
            configurable: true,
        });
    });
    return props;
}
function parseAttributeValue(value) {
    if (!value) return;

    try {
        return JSON.parse(value);
    } catch (err) {
        return value;
    }
}
function reflect(node, attribute, value) {
    if (value == null || value === false) return node.removeAttribute(attribute);
    let reflect = JSON.stringify(value);
    node.__updating[attribute] = true;
    if (reflect === "true") reflect = "";
    node.setAttribute(attribute, reflect);
    Promise.resolve().then(() => delete node.__updating[attribute]);
}
function toAttribute(propName) {
    return propName
        .replace(/\.?([A-Z]+)/g, (x, y) => "-" + y.toLowerCase())
        .replace("_", "-")
        .replace(/^-/, "");
}
function isObject(obj) {
    return obj != null && (typeof obj === "object" || typeof obj === "function");
}
function isFunction(val) {
    return Object.prototype.toString.call(val) === "[object Function]";
}
function isConstructor(f) {
    return typeof f === "function" && f.toString().indexOf("class") === 0;
}

let currentElement;
function noShadowDOM() {
    Object.defineProperty(currentElement, "renderRoot", {
        value: currentElement,
    });
}
function createElementType(BaseElement, propDefinition) {
    const propKeys = Object.keys(propDefinition);
    return class CustomElement extends BaseElement {
        static get observedAttributes() {
            return propKeys.map((k) => propDefinition[k].attribute);
        }

        constructor() {
            super();
            this.__initialized = false;
            this.__released = false;
            this.__releaseCallbacks = [];
            this.__propertyChangedCallbacks = [];
            this.__updating = {};
            this.props = {};
        }

        connectedCallback() {
            if (this.__initialized) return;
            this.__releaseCallbacks = [];
            this.__propertyChangedCallbacks = [];
            this.__updating = {};
            this.props = initializeProps(this, propDefinition);
            const props = propValues(this.props),
                ComponentType = this.Component,
                outerElement = currentElement;

            try {
                currentElement = this;
                this.__initialized = true;
                if (isConstructor(ComponentType))
                    new ComponentType(props, {
                        element: this,
                    });
                else
                    ComponentType(props, {
                        element: this,
                    });
            } finally {
                currentElement = outerElement;
            }
        }

        async disconnectedCallback() {
            // prevent premature releasing when element is only temporarely removed from DOM
            await Promise.resolve();
            if (this.isConnected) return;
            this.__propertyChangedCallbacks.length = 0;
            let callback = null;

            while ((callback = this.__releaseCallbacks.pop())) callback(this);

            delete this.__initialized;
            this.__released = true;
        }

        attributeChangedCallback(name, oldVal, newVal) {
            if (!this.__initialized) return;
            if (this.__updating[name]) return;
            name = this.lookupProp(name);

            if (name in propDefinition) {
                if (newVal == null && !this[name]) return;
                this[name] = propDefinition[name].parse ? parseAttributeValue(newVal) : newVal;
            }
        }

        lookupProp(attrName) {
            if (!propDefinition) return;
            return propKeys.find((k) => attrName === k || attrName === propDefinition[k].attribute);
        }

        get renderRoot() {
            return (
                this.shadowRoot ||
                this.attachShadow({
                    mode: "open",
                })
            );
        }

        addReleaseCallback(fn) {
            this.__releaseCallbacks.push(fn);
        }

        addPropertyChangedCallback(fn) {
            this.__propertyChangedCallbacks.push(fn);
        }
    };
}

function register(tag, props = {}, options = {}) {
    const { BaseElement = HTMLElement, extension } = options;
    return (ComponentType) => {
        if (!tag) throw new Error("tag is required to register a Component");
        let ElementType = customElements.get(tag);

        if (ElementType) {
            // Consider disabling this in a production mode
            ElementType.prototype.Component = ComponentType;
            return ElementType;
        }

        ElementType = createElementType(BaseElement, normalizePropDefs(props));
        ElementType.prototype.Component = ComponentType;
        ElementType.prototype.registeredTag = tag;
        customElements.define(tag, ElementType, extension);
        return ElementType;
    };
}

function createProps(raw) {
    const keys = Object.keys(raw);
    const props = {};
    for (let i = 0; i < keys.length; i++) {
        const [get, set] = translationContext.createSignal(raw[keys[i]]);
        Object.defineProperty(props, keys[i], {
            get,
            set(v) {
                set(() => v);
            },
        });
    }
    return props;
}
function lookupContext(el) {
    if (el.assignedSlot && el.assignedSlot._$owner) return el.assignedSlot._$owner;
    let next = el.parentNode;
    while (next && !next._$owner && !(next.assignedSlot && next.assignedSlot._$owner)) next = next.parentNode;
    return next && next.assignedSlot ? next.assignedSlot._$owner : el._$owner;
}
function withSolid(ComponentType) {
    return (rawProps, options) => {
        const { element } = options;
        return translationContext.createRoot((dispose) => {
            const props = createProps(rawProps);
            element.addPropertyChangedCallback((key, val) => (props[key] = val));
            element.addReleaseCallback(() => {
                element.renderRoot.textContent = "";
                dispose();
            });
            const comp = ComponentType(props, options);
            return insert(element.renderRoot, comp);
        }, lookupContext(element));
    };
}
function customElement(tag, props, ComponentType) {
    if (arguments.length === 2) {
        ComponentType = props;
        props = {};
    }
    return register(tag, props)(withSolid(ComponentType));
}

/**
 * This function handles calling APIs that should only be called once during mount (mostly on mount of a route/feature component).
 * It's split into multiple callbacks (fetch + handleResponse/handleError) because we expect fetch to take longer and
 * and the component may be unmounted during the first fetch, in which case we want to avoid updating state/redirecting.
 *
 * @param fetch This is a callback that is only called once on mount. Mostly it's for consuming tokens/doing one-time-only API calls
 * @param handleResponse This is called with the result of the first (fetch) call if it succeeds.
 * @param handleError This is called with the error of the first (fetch) call if it rejects.
 * @param startLoading Will start the whole process if this is set to true (or omitted). Mostly used to wait for session loading.
 */
function useOnMountAPICall(fetch, handleResponse, handleError, startLoading = true) {
    if (!startLoading) {
        return;
    }
    const [error, setError] = translationContext.createSignal(undefined);
    const controller = new AbortController();
    translationContext.onMount(async () => {
        let resp;
        try {
            resp = await fetch();
            if (controller.signal.aborted) {
                return;
            }
            void handleResponse(resp);
        } catch (err) {
            if (controller.signal.aborted) {
                return;
            }
            if (!handleError) {
                return void setError(err);
            }
            try {
                await handleError(err, resp);
            } catch (err) {
                setError(err);
            }
        }
    });
    translationContext.onCleanup(() => controller.abort());
    translationContext.createEffect(() => {
        if (error()) {
            throw error();
        }
    });
}

customElement("email-large-icon", {}, () => {
    noShadowDOM();
    return jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "59.867",
        height: "40.34",
        viewBox: "0 0 59.867 40.34",
        children: jsx("g", {
            id: "email",
            transform: "translate(0 -83.5)",
            children: [
                jsx("path", {
                    id: "Path_91396",
                    d: "M470.393 98.615h-3.508v36.805h3.508a3.031 3.031 0 0 0 .89-2.15v-32.505a3.031 3.031 0 0 0-.89-2.15z",
                    fill: "#8ae7ff",
                    transform: "translate(-412.293 -13.348)",
                }),
                jsx("path", {
                    id: "Path_91397",
                    d: "M115.09 100.765a3.031 3.031 0 0 0-.89-2.15H68.39a3.031 3.031 0 0 0-.89 2.15v32.506a3.031 3.031 0 0 0 .89 2.15h45.81a3.031 3.031 0 0 0 .89-2.15z",
                    fill: "#c4f3ff",
                    transform: "translate(-59.607 -13.348)",
                }),
                jsx("path", {
                    id: "Path_91398",
                    fill: "#4fdbff",
                    d: "M451.54 391l-3.04 3.508h3.508a3.031 3.031 0 0 0 2.15-.89z",
                    transform: "translate(-396.058 -271.545)",
                }),
                jsx("path", {
                    id: "Path_91399",
                    d: "M121.814 225.009v-.468L99.773 202.5l-24.658 24.658a3.031 3.031 0 0 0 2.15.89h41.509a3.04 3.04 0 0 0 3.04-3.039z",
                    fill: "#8ae7ff",
                    transform: "translate(-66.332 -105.086)",
                }),
                jsx("path", {
                    id: "Path_91400",
                    d: "M452.008 91H448.5l3.04 3.508 2.617-2.617a3.031 3.031 0 0 0-2.149-.891z",
                    fill: "#c4f3ff",
                    transform: "translate(-396.058 -6.623)",
                }),
                jsx("path", {
                    id: "Path_91401",
                    fill: "#fff",
                    d: "M118.774 91H77.265a3.031 3.031 0 0 0-2.15.89l20.318 20.318a6.139 6.139 0 0 0 8.681 0l17.7-17.7v-.468a3.04 3.04 0 0 0-3.04-3.04z",
                    transform: "translate(-66.332 -6.623)",
                }),
                jsx("path", {
                    id: "Path_91402",
                    d: "M55.95 83.5H10.933a3.922 3.922 0 0 0-3.917 3.917v8.36H.877a.877.877 0 1 0 0 1.754H11.4a.877.877 0 1 0 0-1.754H8.77v-8.36a2.147 2.147 0 0 1 .147-.776l17.029 17.029-17.03 17.03a2.147 2.147 0 0 1-.147-.776v-5.729a.877.877 0 1 0-1.754 0v5.729a3.922 3.922 0 0 0 3.917 3.917H55.95a3.922 3.922 0 0 0 3.917-3.917V87.417A3.922 3.922 0 0 0 55.95 83.5zm-15.013 20.17l17.03-17.029a2.147 2.147 0 0 1 .147.776v32.506a2.147 2.147 0 0 1-.147.776zM55.95 85.254a2.147 2.147 0 0 1 .776.147l-19.564 19.564a5.267 5.267 0 0 1-7.441 0L10.156 85.4a2.147 2.147 0 0 1 .776-.147zm-45.017 36.832a2.147 2.147 0 0 1-.776-.146l17.029-17.03 1.295 1.295a7.024 7.024 0 0 0 9.922 0l1.297-1.295 17.027 17.03a2.147 2.147 0 0 1-.776.146z",
                }),
                jsx("path", {
                    id: "Path_91403",
                    d: "M7.893 218.5a.877.877 0 0 0-.877.877v2.631H.877a.877.877 0 0 0 0 1.754h14.031a.877.877 0 0 0 0-1.754H8.77v-2.631a.877.877 0 0 0-.877-.877z",
                    transform: "translate(0 -119.215)",
                }),
                jsx("path", {
                    id: "Path_91404",
                    d: "M11.4 283.762a.877.877 0 0 0 0-1.754H8.77v-2.631a.877.877 0 1 0-1.754 0v2.631H.877a.877.877 0 0 0 0 1.754z",
                    transform: "translate(0 -172.199)",
                }),
            ],
        }),
    });
});

customElement("arrow-right-icon", { color: undefined }, (props) => {
    noShadowDOM();
    return jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "11.272",
        height: "9.49",
        viewBox: "0 0 11.272 9.49",
        "data-supertokens": "arrowRightIcon",
        children: jsx("path", {
            fill: props.color,
            stroke: "#fff",
            "stroke-width": "0.75px",
            d: "M9.931 3.545h.016-7.041L5.12 1.33a.581.581 0 0 0 0-.817L4.775.168a.576.576 0 0 0-.813 0L.168 3.962a.58.58 0 0 0 0 .816l3.794 3.794a.577.577 0 0 0 .813 0l.344-.345a.57.57 0 0 0 .168-.407.553.553 0 0 0-.168-.4L2.881 5.191h7.058a.6.6 0 0 0 .584-.59v-.487a.585.585 0 0 0-.592-.569z",
            transform: "rotate(180 5.449 4.558)",
        }),
    });
});

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let s$4 = class s extends Event {
    constructor(s, t, e) {
        super("context-request", { bubbles: !0, composed: !0 }),
            (this.context = s),
            (this.callback = t),
            (this.subscribe = e ?? !1);
    }
};

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function n$4(n) {
    return n;
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let s$3 = class s {
    get value() {
        return this.o;
    }
    set value(s) {
        this.setValue(s);
    }
    setValue(s, t = !1) {
        const i = t || !Object.is(s, this.o);
        (this.o = s), i && this.updateObservers();
    }
    constructor(s) {
        (this.subscriptions = new Map()),
            (this.updateObservers = () => {
                for (const [s, { disposer: t }] of this.subscriptions) s(this.o, t);
            }),
            void 0 !== s && (this.value = s);
    }
    addCallback(s, t, i) {
        if (!i) return void s(this.value);
        this.subscriptions.has(s) ||
            this.subscriptions.set(s, {
                disposer: () => {
                    this.subscriptions.delete(s);
                },
                consumerHost: t,
            });
        const { disposer: h } = this.subscriptions.get(s);
        s(this.value, h);
    }
    clearCallbacks() {
        this.subscriptions.clear();
    }
};

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ let e$3 = class e extends Event {
    constructor(t) {
        super("context-provider", { bubbles: !0, composed: !0 }), (this.context = t);
    }
};
let i$2 = class i extends s$3 {
    constructor(s, e, i) {
        super(void 0 !== e.context ? e.initialValue : i),
            (this.onContextRequest = (t) => {
                const s = t.composedPath()[0];
                t.context === this.context &&
                    s !== this.host &&
                    (t.stopPropagation(), this.addCallback(t.callback, s, t.subscribe));
            }),
            (this.onProviderRequest = (s) => {
                const e = s.composedPath()[0];
                if (s.context !== this.context || e === this.host) return;
                const i = new Set();
                for (const [s, { consumerHost: e }] of this.subscriptions)
                    i.has(s) || (i.add(s), e.dispatchEvent(new s$4(this.context, s, !0)));
                s.stopPropagation();
            }),
            (this.host = s),
            void 0 !== e.context ? (this.context = e.context) : (this.context = e),
            this.attachListeners(),
            this.host.addController?.(this);
    }
    attachListeners() {
        this.host.addEventListener("context-request", this.onContextRequest),
            this.host.addEventListener("context-provider", this.onProviderRequest);
    }
    hostConnected() {
        this.host.dispatchEvent(new e$3(this.context));
    }
};

const TestContext = n$4(Symbol("test-contenxt"));
function registerSolidSendVerifyEmail(data) {
    customElement("solid-send-verify-email", {}, (_props, { element }) => {
        Object.assign(element, data);
        // Too Early
        element.dispatchEvent(new s$4(TestContext, (data) => console.log("Data in Function Body: ", data)));
        translationContext.onMount(() => {
            // Too early
            element.dispatchEvent(new s$4(TestContext, (data) => console.log("Data in Mount: ", data)));
            // Works
            setTimeout(() => {
                element.dispatchEvent(new s$4(TestContext, (data) => console.log("Delayed Data in Mount: ", data)));
            });
        });
        /* Copy SuperTokens Styles */
        // WARNING: If we want to reuse the SuperTokens styles here, we need to copy nodes because of the ShadowDOM.
        // noShadowDOM();
        translationContext.onMount(() => {
            if (!element.shadowRoot) return; // We aren't testing ShadowDOM now
            const wrapper = document.getElementById("supertokens-root");
            const superTokensRoot = wrapper.shadowRoot ?? wrapper;
            const stylesObserver = new MutationObserver((mutationList) => {
                mutationList.forEach((mutation) => {
                    const newStyles = Array.from(mutation.addedNodes).filter(
                        (node) => node instanceof HTMLStyleElement || node instanceof HTMLLinkElement
                    );
                    const clonedStyles = newStyles.map((n) => n.cloneNode(true));
                    element.shadowRoot.append(...clonedStyles);
                });
            });
            stylesObserver.observe(superTokensRoot, { childList: true });
        });
        const [status, setStatus] = translationContext.createSignal("READY");
        const [errorMessage, setErrorMessage] = translationContext.createSignal(undefined);
        async function resendEmail() {
            try {
                const response = await element.recipeImplementation.sendVerificationEmail({
                    userContext: element.userContext,
                });
                if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                    element.dispatchEvent(
                        new CustomEvent("emailverificationsuccess", { bubbles: true, composed: true })
                    );
                } else if (response.status === "OK") {
                    setStatus("EMAIL_PRESENT");
                }
            } catch (e) {
                if (STGeneralError__default.default.isThisError(e)) {
                    setErrorMessage(e.message);
                }
                setStatus("ERROR");
                return handleSendError();
            }
        }
        async function logout() {
            try {
                await element.signOut();
            } catch (e) {
                if (STGeneralError__default.default.isThisError(e)) {
                    setErrorMessage(e.message);
                }
                setStatus("ERROR");
            }
        }
        useOnMountAPICall(
            function sendVerificationEmail() {
                return element.recipeImplementation.sendVerificationEmail({ userContext: element.userContext });
            },
            async function handleResponse(response) {
                if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                    element.dispatchEvent(
                        new CustomEvent("emailverificationsuccess", { bubbles: true, composed: true })
                    );
                }
            },
            handleSendError
        );
        async function handleSendError() {
            // TODO: we will not need this after restructuring the emailverification components, since it should be
            // handled by SessionAuth. If the error cleared the session we should redirect to auth.
            if (
                (await types.Session.getInstanceOrThrow().doesSessionExist({ userContext: element.userContext })) !==
                true
            ) {
                await element.redirectToAuth();
            }
            // We intentionally ignore the error here, because we don't want to show an error without the user taking action
        }
        const t = translationContext.getTranslate();
        // DEFERRED: This is way too aggressive. A different solution would be better later. And this solution probably doesn't
        // scale anyway with multiple components...
        registerSolidGeneralError({ t });
        return () => {
            return jsx("slot", {
                name: "full-content",
                children: jsx("div", {
                    "data-supertokens": "container",
                    children: jsx("div", {
                        "data-supertokens": "row",
                        children: [
                            jsx("slot", {
                                name: "header",
                                children: [
                                    jsx(translationContext.Show, {
                                        when: status() === "ERROR",
                                        children: jsx("solid-general-error", {
                                            error: errorMessage() ?? "SOMETHING_WENT_WRONG_ERROR",
                                        }),
                                    }),
                                    jsx(translationContext.Show, {
                                        when: status() === "EMAIL_PRESENT",
                                        children: jsx("div", {
                                            "data-supertokens": "generalSuccess",
                                            children: t("EMAIL_VERIFICATION_RESEND_SUCCESS"),
                                        }),
                                    }),
                                    jsx("div", {
                                        "data-supertokens": "sendVerifyEmailIcon",
                                        children: jsx("email-large-icon", {}),
                                    }),
                                ],
                            }),
                            jsx("slot", {
                                name: "body",
                                children: [
                                    jsx("div", {
                                        "data-supertokens": "headerTitle headerTinyTitle",
                                        children: t("EMAIL_VERIFICATION_SEND_TITLE"),
                                    }),
                                    jsx("div", {
                                        "data-supertokens": "primaryText sendVerifyEmailText",
                                        children: [
                                            t("EMAIL_VERIFICATION_SEND_DESC_START"),
                                            jsx("strong", { children: t("EMAIL_VERIFICATION_SEND_DESC_STRONG") }),
                                            t("EMAIL_VERIFICATION_SEND_DESC_END"),
                                        ],
                                    }),
                                ],
                            }),
                            jsx("slot", {
                                name: "actions",
                                children: [
                                    jsx(translationContext.Show, {
                                        when: status() !== "EMAIL_PRESENT",
                                        children: jsx("div", {
                                            "data-supertokens": "link sendVerifyEmailResend",
                                            onClick: resendEmail,
                                            children: t("EMAIL_VERIFICATION_RESEND_BTN"),
                                        }),
                                    }),
                                    jsx("div", {
                                        "data-supertokens": "secondaryText secondaryLinkWithArrow",
                                        onClick: logout,
                                        children: [
                                            t("EMAIL_VERIFICATION_LOGOUT"),
                                            jsx("arrow-right-icon", { color: "rgb(var(--palette-textPrimary))" }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
            });
        };
    });
}
function registerSolidGeneralError(data) {
    customElement("solid-general-error", { error: "" }, (props) => {
        noShadowDOM();
        const { t } = data;
        return jsx("div", { "data-supertokens": "generalError", children: t(props.error) });
    });
}
customElement("my-test-element", {}, (_props, { element }) => {
    console.log("First Run");
    return jsx("div", { children: "First run" });
});
customElement("my-test-element", {}, (_props, { element }) => {
    console.log("Second Run");
    return jsx("div", { children: "Second run" });
});

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis,
    e$2 =
        t$1.ShadowRoot &&
        (void 0 === t$1.ShadyCSS || t$1.ShadyCSS.nativeShadow) &&
        "adoptedStyleSheets" in Document.prototype &&
        "replace" in CSSStyleSheet.prototype,
    s$2 = Symbol(),
    o$2 = new WeakMap();
let n$3 = class n {
    constructor(t, e, o) {
        if (((this._$cssResult$ = !0), o !== s$2))
            throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        (this.cssText = t), (this.t = e);
    }
    get styleSheet() {
        let t = this.o;
        const s = this.t;
        if (e$2 && void 0 === t) {
            const e = void 0 !== s && 1 === s.length;
            e && (t = o$2.get(s)),
                void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && o$2.set(s, t));
        }
        return t;
    }
    toString() {
        return this.cssText;
    }
};
const r$3 = (t) => new n$3("string" == typeof t ? t : t + "", void 0, s$2),
    S$1 = (s, o) => {
        if (e$2) s.adoptedStyleSheets = o.map((t) => (t instanceof CSSStyleSheet ? t : t.styleSheet));
        else
            for (const e of o) {
                const o = document.createElement("style"),
                    n = t$1.litNonce;
                void 0 !== n && o.setAttribute("nonce", n), (o.textContent = e.cssText), s.appendChild(o);
            }
    },
    c$2 = e$2
        ? (t) => t
        : (t) =>
              t instanceof CSSStyleSheet
                  ? ((t) => {
                        let e = "";
                        for (const s of t.cssRules) e += s.cssText;
                        return r$3(e);
                    })(t)
                  : t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const {
        is: i$1,
        defineProperty: e$1,
        getOwnPropertyDescriptor: r$2,
        getOwnPropertyNames: h$1,
        getOwnPropertySymbols: o$1,
        getPrototypeOf: n$2,
    } = Object,
    a$1 = globalThis,
    c$1 = a$1.trustedTypes,
    l$1 = c$1 ? c$1.emptyScript : "",
    p$1 = a$1.reactiveElementPolyfillSupport,
    d$1 = (t, s) => t,
    u$1 = {
        toAttribute(t, s) {
            switch (s) {
                case Boolean:
                    t = t ? l$1 : null;
                    break;
                case Object:
                case Array:
                    t = null == t ? t : JSON.stringify(t);
            }
            return t;
        },
        fromAttribute(t, s) {
            let i = t;
            switch (s) {
                case Boolean:
                    i = null !== t;
                    break;
                case Number:
                    i = null === t ? null : Number(t);
                    break;
                case Object:
                case Array:
                    try {
                        i = JSON.parse(t);
                    } catch (t) {
                        i = null;
                    }
            }
            return i;
        },
    },
    f$1 = (t, s) => !i$1(t, s),
    y$1 = { attribute: !0, type: String, converter: u$1, reflect: !1, hasChanged: f$1 };
(Symbol.metadata ??= Symbol("metadata")), (a$1.litPropertyMetadata ??= new WeakMap());
class b extends HTMLElement {
    static addInitializer(t) {
        this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
        return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t, s = y$1) {
        if ((s.state && (s.attribute = !1), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor)) {
            const i = Symbol(),
                r = this.getPropertyDescriptor(t, i, s);
            void 0 !== r && e$1(this.prototype, t, r);
        }
    }
    static getPropertyDescriptor(t, s, i) {
        const { get: e, set: h } = r$2(this.prototype, t) ?? {
            get() {
                return this[s];
            },
            set(t) {
                this[s] = t;
            },
        };
        return {
            get() {
                return e?.call(this);
            },
            set(s) {
                const r = e?.call(this);
                h.call(this, s), this.requestUpdate(t, r, i);
            },
            configurable: !0,
            enumerable: !0,
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) ?? y$1;
    }
    static _$Ei() {
        if (this.hasOwnProperty(d$1("elementProperties"))) return;
        const t = n$2(this);
        t.finalize(), void 0 !== t.l && (this.l = [...t.l]), (this.elementProperties = new Map(t.elementProperties));
    }
    static finalize() {
        if (this.hasOwnProperty(d$1("finalized"))) return;
        if (((this.finalized = !0), this._$Ei(), this.hasOwnProperty(d$1("properties")))) {
            const t = this.properties,
                s = [...h$1(t), ...o$1(t)];
            for (const i of s) this.createProperty(i, t[i]);
        }
        const t = this[Symbol.metadata];
        if (null !== t) {
            const s = litPropertyMetadata.get(t);
            if (void 0 !== s) for (const [t, i] of s) this.elementProperties.set(t, i);
        }
        this._$Eh = new Map();
        for (const [t, s] of this.elementProperties) {
            const i = this._$Eu(t, s);
            void 0 !== i && this._$Eh.set(i, t);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s) {
        const i = [];
        if (Array.isArray(s)) {
            const e = new Set(s.flat(1 / 0).reverse());
            for (const s of e) i.unshift(c$2(s));
        } else void 0 !== s && i.push(c$2(s));
        return i;
    }
    static _$Eu(t, s) {
        const i = s.attribute;
        return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    constructor() {
        super(),
            (this._$Ep = void 0),
            (this.isUpdatePending = !1),
            (this.hasUpdated = !1),
            (this._$Em = null),
            this._$Ev();
    }
    _$Ev() {
        (this._$ES = new Promise((t) => (this.enableUpdating = t))),
            (this._$AL = new Map()),
            this._$E_(),
            this.requestUpdate(),
            this.constructor.l?.forEach((t) => t(this));
    }
    addController(t) {
        (this._$EO ??= new Set()).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
        this._$EO?.delete(t);
    }
    _$E_() {
        const t = new Map(),
            s = this.constructor.elementProperties;
        for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
        t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
        const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return S$1(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
        (this.renderRoot ??= this.createRenderRoot()),
            this.enableUpdating(!0),
            this._$EO?.forEach((t) => t.hostConnected?.());
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        this._$EO?.forEach((t) => t.hostDisconnected?.());
    }
    attributeChangedCallback(t, s, i) {
        this._$AK(t, i);
    }
    _$EC(t, s) {
        const i = this.constructor.elementProperties.get(t),
            e = this.constructor._$Eu(t, i);
        if (void 0 !== e && !0 === i.reflect) {
            const r = (void 0 !== i.converter?.toAttribute ? i.converter : u$1).toAttribute(s, i.type);
            (this._$Em = t), null == r ? this.removeAttribute(e) : this.setAttribute(e, r), (this._$Em = null);
        }
    }
    _$AK(t, s) {
        const i = this.constructor,
            e = i._$Eh.get(t);
        if (void 0 !== e && this._$Em !== e) {
            const t = i.getPropertyOptions(e),
                r =
                    "function" == typeof t.converter
                        ? { fromAttribute: t.converter }
                        : void 0 !== t.converter?.fromAttribute
                        ? t.converter
                        : u$1;
            (this._$Em = e), (this[e] = r.fromAttribute(s, t.type)), (this._$Em = null);
        }
    }
    requestUpdate(t, s, i) {
        if (void 0 !== t) {
            if (((i ??= this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? f$1)(this[t], s))) return;
            this.P(t, s, i);
        }
        !1 === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t, s, i) {
        this._$AL.has(t) || this._$AL.set(t, s),
            !0 === i.reflect && this._$Em !== t && (this._$Ej ??= new Set()).add(t);
    }
    async _$ET() {
        this.isUpdatePending = !0;
        try {
            await this._$ES;
        } catch (t) {
            Promise.reject(t);
        }
        const t = this.scheduleUpdate();
        return null != t && (await t), !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
            if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
                for (const [t, s] of this._$Ep) this[t] = s;
                this._$Ep = void 0;
            }
            const t = this.constructor.elementProperties;
            if (t.size > 0)
                for (const [s, i] of t)
                    !0 !== i.wrapped || this._$AL.has(s) || void 0 === this[s] || this.P(s, this[s], i);
        }
        let t = !1;
        const s = this._$AL;
        try {
            (t = this.shouldUpdate(s)),
                t ? (this.willUpdate(s), this._$EO?.forEach((t) => t.hostUpdate?.()), this.update(s)) : this._$EU();
        } catch (s) {
            throw ((t = !1), this._$EU(), s);
        }
        t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
        this._$EO?.forEach((t) => t.hostUpdated?.()),
            this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
            this.updated(t);
    }
    _$EU() {
        (this._$AL = new Map()), (this.isUpdatePending = !1);
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$ES;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        (this._$Ej &&= this._$Ej.forEach((t) => this._$EC(t, this[t]))), this._$EU();
    }
    updated(t) {}
    firstUpdated(t) {}
}
(b.elementStyles = []),
    (b.shadowRootOptions = { mode: "open" }),
    (b[d$1("elementProperties")] = new Map()),
    (b[d$1("finalized")] = new Map()),
    p$1?.({ ReactiveElement: b }),
    (a$1.reactiveElementVersions ??= []).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis,
    i = t.trustedTypes,
    s$1 = i ? i.createPolicy("lit-html", { createHTML: (t) => t }) : void 0,
    e = "$lit$",
    h = `lit$${Math.random().toFixed(9).slice(2)}$`,
    o = "?" + h,
    n$1 = `<${o}>`,
    r$1 = document,
    l = () => r$1.createComment(""),
    c = (t) => null === t || ("object" != typeof t && "function" != typeof t),
    a = Array.isArray,
    u = (t) => a(t) || "function" == typeof t?.[Symbol.iterator],
    d = "[ \t\n\f\r]",
    f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    v = /-->/g,
    _ = />/g,
    m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"),
    p = /'/g,
    g = /"/g,
    $ = /^(?:script|style|textarea|title)$/i,
    y =
        (t) =>
        (i, ...s) => ({ _$litType$: t, strings: i, values: s }),
    x = y(1),
    w = Symbol.for("lit-noChange"),
    T = Symbol.for("lit-nothing"),
    A = new WeakMap(),
    E = r$1.createTreeWalker(r$1, 129);
function C(t, i) {
    if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s$1 ? s$1.createHTML(i) : i;
}
const P = (t, i) => {
    const s = t.length - 1,
        o = [];
    let r,
        l = 2 === i ? "<svg>" : "",
        c = f;
    for (let i = 0; i < s; i++) {
        const s = t[i];
        let a,
            u,
            d = -1,
            y = 0;
        for (; y < s.length && ((c.lastIndex = y), (u = c.exec(s)), null !== u); )
            (y = c.lastIndex),
                c === f
                    ? "!--" === u[1]
                        ? (c = v)
                        : void 0 !== u[1]
                        ? (c = _)
                        : void 0 !== u[2]
                        ? ($.test(u[2]) && (r = RegExp("</" + u[2], "g")), (c = m))
                        : void 0 !== u[3] && (c = m)
                    : c === m
                    ? ">" === u[0]
                        ? ((c = r ?? f), (d = -1))
                        : void 0 === u[1]
                        ? (d = -2)
                        : ((d = c.lastIndex - u[2].length),
                          (a = u[1]),
                          (c = void 0 === u[3] ? m : '"' === u[3] ? g : p))
                    : c === g || c === p
                    ? (c = m)
                    : c === v || c === _
                    ? (c = f)
                    : ((c = m), (r = void 0));
        const x = c === m && t[i + 1].startsWith("/>") ? " " : "";
        l +=
            c === f
                ? s + n$1
                : d >= 0
                ? (o.push(a), s.slice(0, d) + e + s.slice(d) + h + x)
                : s + h + (-2 === d ? i : x);
    }
    return [C(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : "")), o];
};
class V {
    constructor({ strings: t, _$litType$: s }, n) {
        let r;
        this.parts = [];
        let c = 0,
            a = 0;
        const u = t.length - 1,
            d = this.parts,
            [f, v] = P(t, s);
        if (((this.el = V.createElement(f, n)), (E.currentNode = this.el.content), 2 === s)) {
            const t = this.el.content.firstChild;
            t.replaceWith(...t.childNodes);
        }
        for (; null !== (r = E.nextNode()) && d.length < u; ) {
            if (1 === r.nodeType) {
                if (r.hasAttributes())
                    for (const t of r.getAttributeNames())
                        if (t.endsWith(e)) {
                            const i = v[a++],
                                s = r.getAttribute(t).split(h),
                                e = /([.?@])?(.*)/.exec(i);
                            d.push({
                                type: 1,
                                index: c,
                                name: e[2],
                                strings: s,
                                ctor: "." === e[1] ? k : "?" === e[1] ? H : "@" === e[1] ? I : R,
                            }),
                                r.removeAttribute(t);
                        } else t.startsWith(h) && (d.push({ type: 6, index: c }), r.removeAttribute(t));
                if ($.test(r.tagName)) {
                    const t = r.textContent.split(h),
                        s = t.length - 1;
                    if (s > 0) {
                        r.textContent = i ? i.emptyScript : "";
                        for (let i = 0; i < s; i++) r.append(t[i], l()), E.nextNode(), d.push({ type: 2, index: ++c });
                        r.append(t[s], l());
                    }
                }
            } else if (8 === r.nodeType)
                if (r.data === o) d.push({ type: 2, index: c });
                else {
                    let t = -1;
                    for (; -1 !== (t = r.data.indexOf(h, t + 1)); ) d.push({ type: 7, index: c }), (t += h.length - 1);
                }
            c++;
        }
    }
    static createElement(t, i) {
        const s = r$1.createElement("template");
        return (s.innerHTML = t), s;
    }
}
function N(t, i, s = t, e) {
    if (i === w) return i;
    let h = void 0 !== e ? s._$Co?.[e] : s._$Cl;
    const o = c(i) ? void 0 : i._$litDirective$;
    return (
        h?.constructor !== o &&
            (h?._$AO?.(!1),
            void 0 === o ? (h = void 0) : ((h = new o(t)), h._$AT(t, s, e)),
            void 0 !== e ? ((s._$Co ??= [])[e] = h) : (s._$Cl = h)),
        void 0 !== h && (i = N(t, h._$AS(t, i.values), h, e)),
        i
    );
}
class S {
    constructor(t, i) {
        (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i);
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    u(t) {
        const {
                el: { content: i },
                parts: s,
            } = this._$AD,
            e = (t?.creationScope ?? r$1).importNode(i, !0);
        E.currentNode = e;
        let h = E.nextNode(),
            o = 0,
            n = 0,
            l = s[0];
        for (; void 0 !== l; ) {
            if (o === l.index) {
                let i;
                2 === l.type
                    ? (i = new M(h, h.nextSibling, this, t))
                    : 1 === l.type
                    ? (i = new l.ctor(h, l.name, l.strings, this, t))
                    : 6 === l.type && (i = new L(h, this, t)),
                    this._$AV.push(i),
                    (l = s[++n]);
            }
            o !== l?.index && ((h = E.nextNode()), o++);
        }
        return (E.currentNode = r$1), e;
    }
    p(t) {
        let i = 0;
        for (const s of this._$AV)
            void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), (i += s.strings.length - 2)) : s._$AI(t[i])), i++;
    }
}
class M {
    get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, i, s, e) {
        (this.type = 2),
            (this._$AH = T),
            (this._$AN = void 0),
            (this._$AA = t),
            (this._$AB = i),
            (this._$AM = s),
            (this.options = e),
            (this._$Cv = e?.isConnected ?? !0);
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, i = this) {
        (t = N(this, t, i)),
            c(t)
                ? t === T || null == t || "" === t
                    ? (this._$AH !== T && this._$AR(), (this._$AH = T))
                    : t !== this._$AH && t !== w && this._(t)
                : void 0 !== t._$litType$
                ? this.$(t)
                : void 0 !== t.nodeType
                ? this.T(t)
                : u(t)
                ? this.k(t)
                : this._(t);
    }
    S(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    T(t) {
        this._$AH !== t && (this._$AR(), (this._$AH = this.S(t)));
    }
    _(t) {
        this._$AH !== T && c(this._$AH) ? (this._$AA.nextSibling.data = t) : this.T(r$1.createTextNode(t)),
            (this._$AH = t);
    }
    $(t) {
        const { values: i, _$litType$: s } = t,
            e =
                "number" == typeof s
                    ? this._$AC(t)
                    : (void 0 === s.el && (s.el = V.createElement(C(s.h, s.h[0]), this.options)), s);
        if (this._$AH?._$AD === e) this._$AH.p(i);
        else {
            const t = new S(e, this),
                s = t.u(this.options);
            t.p(i), this.T(s), (this._$AH = t);
        }
    }
    _$AC(t) {
        let i = A.get(t.strings);
        return void 0 === i && A.set(t.strings, (i = new V(t))), i;
    }
    k(t) {
        a(this._$AH) || ((this._$AH = []), this._$AR());
        const i = this._$AH;
        let s,
            e = 0;
        for (const h of t)
            e === i.length ? i.push((s = new M(this.S(l()), this.S(l()), this, this.options))) : (s = i[e]),
                s._$AI(h),
                e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e));
    }
    _$AR(t = this._$AA.nextSibling, i) {
        for (this._$AP?.(!1, !0, i); t && t !== this._$AB; ) {
            const i = t.nextSibling;
            t.remove(), (t = i);
        }
    }
    setConnected(t) {
        void 0 === this._$AM && ((this._$Cv = t), this._$AP?.(t));
    }
}
class R {
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    constructor(t, i, s, e, h) {
        (this.type = 1),
            (this._$AH = T),
            (this._$AN = void 0),
            (this.element = t),
            (this.name = i),
            (this._$AM = e),
            (this.options = h),
            s.length > 2 || "" !== s[0] || "" !== s[1]
                ? ((this._$AH = Array(s.length - 1).fill(new String())), (this.strings = s))
                : (this._$AH = T);
    }
    _$AI(t, i = this, s, e) {
        const h = this.strings;
        let o = !1;
        if (void 0 === h) (t = N(this, t, i, 0)), (o = !c(t) || (t !== this._$AH && t !== w)), o && (this._$AH = t);
        else {
            const e = t;
            let n, r;
            for (t = h[0], n = 0; n < h.length - 1; n++)
                (r = N(this, e[s + n], i, n)),
                    r === w && (r = this._$AH[n]),
                    (o ||= !c(r) || r !== this._$AH[n]),
                    r === T ? (t = T) : t !== T && (t += (r ?? "") + h[n + 1]),
                    (this._$AH[n] = r);
        }
        o && !e && this.j(t);
    }
    j(t) {
        t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
    }
}
class k extends R {
    constructor() {
        super(...arguments), (this.type = 3);
    }
    j(t) {
        this.element[this.name] = t === T ? void 0 : t;
    }
}
class H extends R {
    constructor() {
        super(...arguments), (this.type = 4);
    }
    j(t) {
        this.element.toggleAttribute(this.name, !!t && t !== T);
    }
}
class I extends R {
    constructor(t, i, s, e, h) {
        super(t, i, s, e, h), (this.type = 5);
    }
    _$AI(t, i = this) {
        if ((t = N(this, t, i, 0) ?? T) === w) return;
        const s = this._$AH,
            e = (t === T && s !== T) || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive,
            h = t !== T && (s === T || e);
        e && this.element.removeEventListener(this.name, this, s),
            h && this.element.addEventListener(this.name, this, t),
            (this._$AH = t);
    }
    handleEvent(t) {
        "function" == typeof this._$AH
            ? this._$AH.call(this.options?.host ?? this.element, t)
            : this._$AH.handleEvent(t);
    }
}
class L {
    constructor(t, i, s) {
        (this.element = t), (this.type = 6), (this._$AN = void 0), (this._$AM = i), (this.options = s);
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        N(this, t);
    }
}
const Z = t.litHtmlPolyfillSupport;
Z?.(V, M), (t.litHtmlVersions ??= []).push("3.1.4");
const j = (t, i, s) => {
    const e = s?.renderBefore ?? i;
    let h = e._$litPart$;
    if (void 0 === h) {
        const t = s?.renderBefore ?? null;
        e._$litPart$ = h = new M(i.insertBefore(l(), t), t, void 0, s ?? {});
    }
    return h._$AI(t), h;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class s extends b {
    constructor() {
        super(...arguments), (this.renderOptions = { host: this }), (this._$Do = void 0);
    }
    createRenderRoot() {
        const t = super.createRenderRoot();
        return (this.renderOptions.renderBefore ??= t.firstChild), t;
    }
    update(t) {
        const i = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
            super.update(t),
            (this._$Do = j(i, this.renderRoot, this.renderOptions));
    }
    connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
        return w;
    }
}
(s._$litElement$ = !0), (s["finalized"] = !0), globalThis.litElementHydrateSupport?.({ LitElement: s });
const r = globalThis.litElementPolyfillSupport;
r?.({ LitElement: s });
(globalThis.litElementVersions ??= []).push("4.0.6");

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function n(n, r, t) {
    return n ? r(n) : t?.(n);
}

class AsyncRequestController {
    // Internal State
    #controller = new AbortController();
    // Values from Constructor
    #host;
    #fetch;
    #handleResponse;
    #handleError;
    #startLoading;
    // DEFERRED: This can probably be made more idiomatic for Lit
    constructor(host, fetch, handleResponse, handleError, startLoading = true) {
        (this.#host = host).addController(this);
        this.#fetch = fetch;
        this.#handleResponse = handleResponse;
        this.#handleError = handleError;
        this.#startLoading = startLoading;
    }
    async hostConnected() {
        // DEFERRED: Do we _need_ to await `updateComplete` to make sure all props are properly assigned to the component?
        await this.#host.updateComplete;
        if (!this.#startLoading) {
            return this.#host.removeController(this);
        }
        let resp;
        try {
            resp = await this.#fetch();
            if (this.#controller.signal.aborted) {
                return;
            }
            void this.#handleResponse(resp);
        } catch (err) {
            if (this.#controller.signal.aborted) {
                return;
            }
            if (!this.#handleError) {
                throw err;
            }
            try {
                await this.#handleError(err, resp);
            } catch (err) {
                throw err;
            }
        } finally {
            this.#host.removeController(this);
        }
    }
    hostDisconnected() {
        this.#controller.abort();
    }
}

class LitSendVerifyEmail extends s {
    static properties = {
        // Props
        t: { attribute: false },
        userContext: { attribute: false },
        recipeImplementation: { attribute: false },
        redirectToAuth: { attribute: false },
        signOut: { attribute: false },
        // State
        _status: { type: String, state: true },
        _errorMessage: { type: String, state: true },
    };
    constructor() {
        super();
        this._status = "READY";
        new AsyncRequestController(this, this.#sendVerificationEmail, this.#handleResponse, this.#handleSendError);
    }
    connectedCallback() {
        super.connectedCallback();
        const wrapper = document.getElementById("supertokens-root");
        const superTokensRoot = wrapper.shadowRoot ?? wrapper;
        const stylesObserver = new MutationObserver((mutationList) => {
            mutationList.forEach((mutation) => {
                const newStyles = Array.from(mutation.addedNodes).filter(
                    (node) => node instanceof HTMLStyleElement || node instanceof HTMLLinkElement
                );
                const clonedStyles = newStyles.map((n) => n.cloneNode(true));
                this.renderRoot.append(...clonedStyles);
            });
        });
        stylesObserver.observe(superTokensRoot, { childList: true });
    }
    async #resendEmail() {
        try {
            const response = await this.recipeImplementation.sendVerificationEmail({
                userContext: this.userContext,
            });
            if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                this.dispatchEvent(new CustomEvent("emailverificationsuccess", { bubbles: true, composed: true }));
            } else if (response.status === "OK") {
                this._status = "EMAIL_PRESENT";
            }
        } catch (e) {
            if (STGeneralError__default.default.isThisError(e)) {
                this._errorMessage = e.message;
            }
            this._status = "ERROR";
            return this.#handleSendError();
        }
    }
    async #logout() {
        try {
            await this.signOut();
        } catch (e) {
            if (STGeneralError__default.default.isThisError(e)) {
                this._errorMessage = e.message;
            }
            this._status = "ERROR";
        }
    }
    // AsyncRequestController Functions
    #sendVerificationEmail = () => {
        return this.recipeImplementation.sendVerificationEmail({ userContext: this.userContext });
    };
    #handleResponse = async (response) => {
        if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
            this.dispatchEvent(new CustomEvent("emailverificationsuccess", { bubbles: true, composed: true }));
        }
    };
    #handleSendError = async () => {
        // TODO: we will not need this after restructuring the emailverification components, since it should be
        // handled by SessionAuth. If the error cleared the session we should redirect to auth.
        if ((await types.Session.getInstanceOrThrow().doesSessionExist({ userContext: this.userContext })) !== true) {
            await this.redirectToAuth();
        }
        // We intentionally ignore the error here, because we don't want to show an error without the user taking action
    };
    render() {
        return x`
            <slot name="full-content">
                <div data-supertokens="container">
                    <div data-supertokens="row">
                        <slot name="header">
                            ${n(
                                this._status === "ERROR",
                                () => x`<lit-general-error
                                        error=${this._errorMessage ?? "SOMETHING_WENT_WRONG_ERROR"}
                                        .t=${this.t}
                                    ></lit-general-error>`
                            )}
                            ${n(
                                this._status === "EMAIL_PRESENT",
                                () => x`
                                    <div data-supertokens="generalSuccess">
                                        ${this.t("EMAIL_VERIFICATION_RESEND_SUCCESS")}
                                    </div>
                                `
                            )}

                            <div data-supertokens="sendVerifyEmailIcon">
                                <email-large-icon></email-large-icon>
                            </div>
                        </slot>

                        <slot name="body">
                            <div data-supertokens="headerTitle headerTinyTitle">
                                ${this.t("EMAIL_VERIFICATION_SEND_TITLE")}
                            </div>

                            <div data-supertokens="primaryText sendVerifyEmailText">
                                ${this.t("EMAIL_VERIFICATION_SEND_DESC_START")}
                                <strong>${this.t("EMAIL_VERIFICATION_SEND_DESC_STRONG")}</strong>
                                ${this.t("EMAIL_VERIFICATION_SEND_DESC_END")}
                            </div>
                        </slot>

                        <slot name="actions">
                            ${n(
                                this._status !== "EMAIL_PRESENT",
                                () => x`
                                    <div data-supertokens="link sendVerifyEmailResend" @click="${this.#resendEmail}">
                                        ${this.t("EMAIL_VERIFICATION_RESEND_BTN")}
                                    </div>
                                `
                            )}

                            <div data-supertokens="secondaryText secondaryLinkWithArrow" @click=${this.#logout}>
                                ${this.t("EMAIL_VERIFICATION_LOGOUT")}
                                <arrow-right-icon color="rgb(var(--palette-textPrimary))" />
                            </div>
                        </slot>
                    </div>
                </div>
            </slot>
        `;
    }
}
class LitGeneralError extends s {
    static properties = { t: { attribute: false }, error: { type: String } };
    render() {
        return x`<div data-supertokens="generalError">${this.t(this.error)}</div>`;
    }
}
// DEFERRED: Custom element definition would be best delegated to callers (one time only)
customElements.define("lit-send-verify-email", LitSendVerifyEmail);
customElements.define("lit-general-error", LitGeneralError);

o$3({
    tagName: "lit-send-verify-email",
    elementClass: LitSendVerifyEmail,
    react: React__namespace.default,
});
const EmailVerificationSendVerifyEmail = (props) => {
    const t = translationContext.useTranslation();
    const userContext = uiEntry.useUserContext();
    console.log("User Context from Regular Component: ", userContext);
    // Register Data for Web Component (Icky Approach)
    React.useMemo(() => {
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
    const providerDiv = React.useRef();
    React.useLayoutEffect(() => {
        const element = providerDiv.current;
        Object.assign(element, {
            _provider: new i$2(element, { context: TestContext, initialValue: props }),
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
    return jsxRuntime.jsx("div", {
        ref: providerDiv,
        children: jsxRuntime.jsx("solid-send-verify-email", { ...props }),
    });
};
const SendVerifyEmail = uiEntry.withOverride("EmailVerificationSendVerifyEmail", EmailVerificationSendVerifyEmail);

// DEFERRED: For now, converting `Button` to a Web Component has been forgone since the component is so simple.
// (Plus, the complications of moving the translater function around are undesirable.)
function registerSolidVerifyEmailLinkClicked(data) {
    customElement("solid-verify-email-link-clicked", {}, (props, { element }) => {
        noShadowDOM();
        Object.assign(element, data);
        const [status, setStatus] = translationContext.createSignal("LOADING");
        const [errorMessage, setErrorMessage] = translationContext.createSignal(undefined);
        const [verifyLoading, setVerifyLoading] = translationContext.createSignal(false);
        useOnMountAPICall(
            async function verifyEmailOnMount() {
                if (element.sessionContext.loading === true) {
                    // This callback should only be called if the session is already loaded
                    throw new Error("Should never come here");
                }
                // If there is no active session we know that the verification was started elsewhere, since it requires a session.
                // Otherwise, we assume it's the same session. The main purpose of this is to prevent mail scanners
                // from accidentally validating an email address.
                if (!element.sessionContext.doesSessionExist) {
                    return "INTERACTION_REQUIRED";
                }
                return element.recipeImplementation.verifyEmail({ userContext: element.userContext });
            },
            handleVerifyResp,
            handleError,
            element.sessionContext.loading === false
        );
        async function handleVerifyResp(response) {
            if (response === "INTERACTION_REQUIRED") {
                setStatus("INTERACTION_REQUIRED");
            } else if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
                setStatus("INVALID");
            } else {
                setStatus("SUCCESSFUL");
            }
        }
        function handleError(err) {
            if (STGeneralError__default.default.isThisError(err)) {
                setErrorMessage(err.message);
            }
            setStatus("GENERAL_ERROR");
        }
        const { t } = element;
        return () => {
            if (status() === "LOADING") {
                return jsx("div", {
                    "data-supertokens": "container",
                    children: jsx("div", {
                        "data-supertokens": "row",
                        children: jsx("div", { "data-supertokens": "spinner", children: jsx("spinner-icon", {}) }),
                    }),
                });
            }
            if (status() === "INTERACTION_REQUIRED") {
                return jsx("div", {
                    "data-supertokens": "container",
                    children: jsx("div", {
                        "data-supertokens": "row noFormRow",
                        children: [
                            jsx("div", {
                                "data-supertokens": "headerTitle",
                                children: t("EMAIL_VERIFICATION_LINK_CLICKED_HEADER"),
                            }),
                            jsx("div", {
                                "data-supertokens": "headerSubtitle secondaryText",
                                children: t("EMAIL_VERIFICATION_LINK_CLICKED_DESC"),
                            }),
                            jsx("button", {
                                type: "button",
                                "data-supertokens": "button",
                                onClick: async () => {
                                    setVerifyLoading(true);
                                    try {
                                        const resp = await props.recipeImplementation.verifyEmail({
                                            userContext: element.userContext,
                                        });
                                        await handleVerifyResp(resp);
                                    } catch (err) {
                                        void handleError(err);
                                    }
                                },
                                children: [
                                    t("EMAIL_VERIFICATION_LINK_CLICKED_CONTINUE_BUTTON"),
                                    verifyLoading() && "...",
                                ],
                            }),
                        ],
                    }),
                });
            }
            if (status() === "SUCCESSFUL") {
                return jsx("div", {
                    "data-supertokens": "container",
                    children: jsx("div", {
                        "data-supertokens": "row noFormRow",
                        children: [
                            jsx("checked-round-icon", {}),
                            jsx("div", {
                                "data-supertokens": "headerTitle headerTinyTitle",
                                children: t("EMAIL_VERIFICATION_SUCCESS"),
                            }),
                            jsx("div", {
                                "data-supertokens": "emailVerificationButtonWrapper",
                                children: jsx("button", {
                                    type: "button",
                                    "data-supertokens": "button",
                                    onClick: () =>
                                        element.dispatchEvent(
                                            new CustomEvent("emailverificationsuccess", {
                                                bubbles: true,
                                                composed: true,
                                            })
                                        ),
                                    children: t("EMAIL_VERIFICATION_CONTINUE_BTN"),
                                }),
                            }),
                        ],
                    }),
                });
            }
            if (status() === "INVALID") {
                return jsx("div", {
                    "data-supertokens": "container",
                    children: jsx("div", {
                        "data-supertokens": "row noFormRow",
                        children: [
                            jsx("div", {
                                "data-supertokens": "headerTitle headerTinyTitle",
                                children: t("EMAIL_VERIFICATION_EXPIRED"),
                            }),
                            jsx("div", {
                                onClick: element.onTokenInvalidRedirect,
                                "data-supertokens": "secondaryText secondaryLinkWithArrow",
                                children: [
                                    t("EMAIL_VERIFICATION_CONTINUE_LINK"),
                                    jsx("arrow-right-icon", { color: "rgb(var(--palette-textPrimary))" }),
                                ],
                            }),
                        ],
                    }),
                });
            }
            return jsx("div", {
                "data-supertokens": "container",
                children: jsx("div", {
                    "data-supertokens": "row noFormRow",
                    children: [
                        jsx("div", {
                            "data-supertokens": "headerTitle error",
                            children: [jsx("error-large-icon", {}), t("EMAIL_VERIFICATION_ERROR_TITLE")],
                        }),
                        jsx("div", {
                            "data-supertokens": "primaryText",
                            children: t(errorMessage() ?? "EMAIL_VERIFICATION_ERROR_DESC"),
                        }),
                    ],
                }),
            });
        };
    });
}

const EmailVerificationVerifyEmailLinkClicked = (props) => {
    const t = translationContext.useTranslation();
    const sessionContext = uiEntry.useSessionContext();
    const userContext = uiEntry.useUserContext();
    React.useMemo(() => {
        registerSolidVerifyEmailLinkClicked({
            recipeImplementation: props.recipeImplementation,
            onTokenInvalidRedirect: props.onTokenInvalidRedirect,
            sessionContext,
            userContext,
            t,
        });
    }, []);
    return jsxRuntime.jsx("solid-verify-email-link-clicked", { ...props });
};
const VerifyEmailLinkClicked = uiEntry.withOverride(
    "EmailVerificationVerifyEmailLinkClicked",
    EmailVerificationVerifyEmailLinkClicked
);

/*
 * NOTE: This doesn't necessarily yield the desired outcome... We don't hvae real "fragments" when it comes to
 * Web Components. Everything rendered inside a Web Component is rendered inside the Host Element. This is technically
 * a valid "conversion", but it breaks some assumptions about styling that were made earlier to Demo Slotting.
 *
 * We'll need to figure out what a good global styling solution looks like for Web Components.
 */
customElement("solid-theme-base", { loaddefaultfont: false }, (props) => {
    console.log("Solid Theme Base Props: ", props);
    noShadowDOM();
    return () =>
        jsx(Fragment, {
            children: [
                jsx(translationContext.Show, {
                    when: props.loaddefaultfont,
                    children: jsx("link", {
                        href: "//fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700",
                        rel: "stylesheet",
                        type: "text/css",
                    }),
                }),
                jsx("style", { children: [translations.styles, props.userStyles] }),
            ],
        });
});

function EmailVerificationTheme(props) {
    const sessionContext = session.useSessionContext();
    // If we have a token, return VerifyEmailLinkClicked.
    if (props.verifyEmailLinkClickedScreen !== undefined) {
        return jsxRuntime.jsx(VerifyEmailLinkClicked, { ...props.verifyEmailLinkClickedScreen });
    }
    // If we have an active session, we want to send the verification email
    if (sessionContext.loading === false && sessionContext.doesSessionExist === true) {
        return jsxRuntime.jsx(SendVerifyEmail, { ...props.sendVerifyEmailScreen });
    }
    // Otherwise, return an empty screen, waiting for the feature component to redirection to complete.
    return jsxRuntime.jsx(jsxRuntime.Fragment, {});
}
function EmailVerificationThemeWrapper(props) {
    const rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    const hasFont = uiEntry.hasFontDefined(rootStyle) || uiEntry.hasFontDefined(props.config.recipeRootStyle);
    return jsxRuntime.jsx(uiEntry.UserContextWrapper, {
        userContext: props.userContext,
        children: jsxRuntime.jsx("solid-theme-base", {
            loaddefaultfont: !hasFont,
            userStyles: [
                rootStyle,
                props.config.recipeRootStyle,
                props.verifyEmailLinkClickedScreen === undefined
                    ? props.config.sendVerifyEmailScreen.style
                    : props.config.verifyEmailLinkClickedScreen.style,
            ].join("\n"),
            children: jsxRuntime.jsx(EmailVerificationTheme, { ...props }),
        }),
    });
}

const EmailVerification$1 = (props) => {
    const sessionContext = React.useContext(uiEntry.SessionContext);
    const [status, setStatus] = React.useState("LOADING");
    const rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    const recipeComponentOverrides = props.useComponentOverrides();
    let userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const redirectToAuthWithHistory = React.useCallback(async () => {
        await uiEntry.redirectToAuth({ redirectBack: false, navigate: props.navigate });
    }, [props.navigate]);
    const modifiedRecipeImplementation = React.useMemo(
        () => ({
            ...props.recipe.webJSRecipe,
            sendVerificationEmail: async (input) => {
                const response = await props.recipe.webJSRecipe.sendVerificationEmail(input);
                genericComponentOverrideContext.clearQueryParams(["token"]);
                return response;
            },
        }),
        [props.recipe]
    );
    const onSuccess = React.useCallback(async () => {
        return types.Session.getInstanceOrThrow()
            .validateGlobalClaimsAndHandleSuccessRedirection(
                undefined,
                props.recipe.recipeID,
                undefined,
                userContext,
                props.navigate
            )
            .catch(rethrowInRender);
    }, [props.recipe, props.navigate, userContext]);
    React.useEffect(() => {
        document.addEventListener("emailverificationsuccess", onSuccess);
        return () => document.removeEventListener("emailverificationsuccess", onSuccess);
    }, [onSuccess]);
    const fetchIsEmailVerified = React.useCallback(async () => {
        if (sessionContext.loading === true) {
            // This callback should only be called if the session is already loaded
            throw new Error("Should never come here");
        }
        const token = genericComponentOverrideContext.getQueryParams("token") ?? undefined;
        if (token === undefined) {
            if (!sessionContext.doesSessionExist) {
                await redirectToAuthWithHistory();
            } else {
                // we check if the email is already verified, and if it is, then we redirect the user
                return (await props.recipe.webJSRecipe.isEmailVerified({ userContext })).isVerified;
            }
        }
        return false;
    }, [props.recipe, sessionContext, redirectToAuthWithHistory]);
    const checkIsEmailVerified = React.useCallback(
        async (isVerified) => {
            if (isVerified) {
                return onSuccess();
            }
            setStatus("READY");
        },
        [props.recipe, setStatus, onSuccess]
    );
    const handleError = React.useCallback(
        async (err) => {
            // TODO: we will not need this after restructuring the emailverification components, since it should be handled by SessionAuth
            // If the error cleared the session we redirect away, otherwise we have no way of handling it.
            if (await types.Session.getInstanceOrThrow().doesSessionExist({ userContext })) {
                throw err;
            } else {
                await redirectToAuthWithHistory();
            }
        },
        [redirectToAuthWithHistory]
    );
    genericComponentOverrideContext.useOnMountAPICall(
        fetchIsEmailVerified,
        checkIsEmailVerified,
        handleError,
        sessionContext.loading === false
    );
    const signOut = React.useCallback(async () => {
        const session = types.Session.getInstanceOrThrow();
        await session.signOut({ userContext });
        return redirectToAuthWithHistory();
    }, [redirectToAuthWithHistory, userContext]);
    if (status === "LOADING") {
        return jsxRuntime.jsx(React.Fragment, {});
    }
    const sendVerifyEmailScreenFeature = props.recipe.config.sendVerifyEmailScreen;
    const sendVerifyEmailScreen = {
        styleFromInit: sendVerifyEmailScreenFeature.style,
        recipeImplementation: modifiedRecipeImplementation,
        config: props.recipe.config,
        signOut: signOut,
        redirectToAuth: redirectToAuthWithHistory,
    };
    const verifyEmailLinkClickedScreenFeature = props.recipe.config.verifyEmailLinkClickedScreen;
    const token = genericComponentOverrideContext.getQueryParams("token") ?? undefined;
    const verifyEmailLinkClickedScreen =
        token === undefined
            ? undefined
            : {
                  styleFromInit: verifyEmailLinkClickedScreenFeature.style,
                  onTokenInvalidRedirect: redirectToAuthWithHistory,
                  recipeImplementation: modifiedRecipeImplementation,
                  config: props.recipe.config,
                  token,
              };
    const childProps = {
        config: props.recipe.config,
        sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen,
        hasToken: token !== undefined,
    };
    return jsxRuntime.jsx(uiEntry.ComponentOverrideContext.Provider, {
        value: recipeComponentOverrides,
        children: jsxRuntime.jsx(uiEntry.FeatureWrapper, {
            useShadowDom: genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().useShadowDom,
            defaultStore: translations.defaultTranslationsEmailVerification,
            children: jsxRuntime.jsxs(React.Fragment, {
                children: [
                    props.children === undefined && jsxRuntime.jsx(EmailVerificationThemeWrapper, { ...childProps }),
                    props.children &&
                        React__namespace.Children.map(props.children, (child) => {
                            if (React__namespace.isValidElement(child)) {
                                return React__namespace.cloneElement(child, childProps);
                            }
                            return child;
                        }),
                ],
            }),
        }),
    });
};

class EmailVerificationPreBuiltUI extends uiEntry.RecipeRouter {
    recipeInstance;
    static instance;
    languageTranslations = translations.defaultTranslationsEmailVerification;
    constructor(recipeInstance) {
        super();
        this.recipeInstance = recipeInstance;
    }
    // Static methods
    static getInstanceOrInitAndGetInstance() {
        if (EmailVerificationPreBuiltUI.instance === undefined) {
            const recipeInstance = recipe.EmailVerification.getInstanceOrThrow();
            EmailVerificationPreBuiltUI.instance = new EmailVerificationPreBuiltUI(recipeInstance);
        }
        return EmailVerificationPreBuiltUI.instance;
    }
    static getFeatures(useComponentOverrides = recipe.useContext) {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(componentName, props, useComponentOverrides = recipe.useContext) {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    }
    // Instance methods
    getFeatures = (useComponentOverrides = recipe.useContext) => {
        const features = {};
        if (this.recipeInstance.config.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath__default.default(recipe.DEFAULT_VERIFY_EMAIL_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                    this.recipeInstance.config.recipeId
                ),
                component: (props) => this.getFeatureComponent("emailverification", props, useComponentOverrides),
                recipeID: recipe.EmailVerification.RECIPE_ID,
            };
        }
        return features;
    };
    getFeatureComponent = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        props,
        useComponentOverrides = recipe.useContext
    ) => {
        return jsxRuntime.jsx(uiEntry.UserContextWrapper, {
            userContext: props.userContext,
            children: jsxRuntime.jsx(session.SessionAuth, {
                requireAuth: false,
                overrideGlobalClaimValidators: () => [],
                children: jsxRuntime.jsx(uiEntry.UserContextContext.Consumer, {
                    children: (value) => {
                        return jsxRuntime.jsx(EmailVerification$1, {
                            recipe: this.recipeInstance,
                            useComponentOverrides: useComponentOverrides,
                            ...props,
                            // We do this to make sure it does not add another provider
                            userContext: value,
                        });
                    },
                }),
            }),
        });
    };
    getAuthComponents() {
        return [];
    }
    // For tests
    static reset() {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        EmailVerificationPreBuiltUI.instance = undefined;
        return;
    }
    static EmailVerification = (props) =>
        EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("emailverification", props);
    static EmailVerificationTheme = EmailVerificationTheme;
}
const EmailVerification = EmailVerificationPreBuiltUI.EmailVerification;

exports.EmailVerification = EmailVerification;
exports.EmailVerificationPreBuiltUI = EmailVerificationPreBuiltUI;
exports.EmailVerificationTheme = EmailVerificationTheme;
