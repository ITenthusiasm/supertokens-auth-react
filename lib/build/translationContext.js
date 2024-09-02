"use strict";

var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);

const equalFn = (a, b) => a === b;
const signalOptions = {
    equals: equalFn,
};
let runEffects = runQueue;
const STALE = 1;
const PENDING = 2;
const UNOWNED = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null,
};
var Owner = null;
let Transition = null;
let ExternalSourceConfig = null;
let Listener = null;
let Updates = null;
let Effects = null;
let ExecCount = 0;
function createRoot(fn, detachedOwner) {
    const listener = Listener,
        owner = Owner,
        unowned = fn.length === 0,
        current = detachedOwner === undefined ? owner : detachedOwner,
        root = unowned
            ? UNOWNED
            : {
                  owned: null,
                  cleanups: null,
                  context: current ? current.context : null,
                  owner: current,
              },
        updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
    Owner = root;
    Listener = null;
    try {
        return runUpdates(updateFn, true);
    } finally {
        Listener = listener;
        Owner = owner;
    }
}
function createSignal(value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const s = {
        value,
        observers: null,
        observerSlots: null,
        comparator: options.equals || undefined,
    };
    const setter = (value) => {
        if (typeof value === "function") {
            value = value(s.value);
        }
        return writeSignal(s, value);
    };
    return [readSignal.bind(s), setter];
}
function createRenderEffect(fn, value, options) {
    const c = createComputation(fn, value, false, STALE);
    updateComputation(c);
}
function createEffect(fn, value, options) {
    runEffects = runUserEffects;
    const c = createComputation(fn, value, false, STALE);
    if (!options || !options.render) c.user = true;
    Effects ? Effects.push(c) : updateComputation(c);
}
function createMemo(fn, value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const c = createComputation(fn, value, true, 0);
    c.observers = null;
    c.observerSlots = null;
    c.comparator = options.equals || undefined;
    updateComputation(c);
    return readSignal.bind(c);
}
function untrack(fn) {
    if (Listener === null) return fn();
    const listener = Listener;
    Listener = null;
    try {
        if (ExternalSourceConfig);
        return fn();
    } finally {
        Listener = listener;
    }
}
function onMount(fn) {
    createEffect(() => untrack(fn));
}
function onCleanup(fn) {
    if (Owner === null);
    else if (Owner.cleanups === null) Owner.cleanups = [fn];
    else Owner.cleanups.push(fn);
    return fn;
}
function readSignal() {
    if (this.sources && this.state) {
        if (this.state === STALE) updateComputation(this);
        else {
            const updates = Updates;
            Updates = null;
            runUpdates(() => lookUpstream(this), false);
            Updates = updates;
        }
    }
    if (Listener) {
        const sSlot = this.observers ? this.observers.length : 0;
        if (!Listener.sources) {
            Listener.sources = [this];
            Listener.sourceSlots = [sSlot];
        } else {
            Listener.sources.push(this);
            Listener.sourceSlots.push(sSlot);
        }
        if (!this.observers) {
            this.observers = [Listener];
            this.observerSlots = [Listener.sources.length - 1];
        } else {
            this.observers.push(Listener);
            this.observerSlots.push(Listener.sources.length - 1);
        }
    }
    return this.value;
}
function writeSignal(node, value, isComp) {
    let current = node.value;
    if (!node.comparator || !node.comparator(current, value)) {
        node.value = value;
        if (node.observers && node.observers.length) {
            runUpdates(() => {
                for (let i = 0; i < node.observers.length; i += 1) {
                    const o = node.observers[i];
                    const TransitionRunning = Transition && Transition.running;
                    if (TransitionRunning && Transition.disposed.has(o));
                    if (TransitionRunning ? !o.tState : !o.state) {
                        if (o.pure) Updates.push(o);
                        else Effects.push(o);
                        if (o.observers) markDownstream(o);
                    }
                    if (!TransitionRunning) o.state = STALE;
                }
                if (Updates.length > 10e5) {
                    Updates = [];
                    if (false);
                    throw new Error();
                }
            }, false);
        }
    }
    return value;
}
function updateComputation(node) {
    if (!node.fn) return;
    cleanNode(node);
    const time = ExecCount;
    runComputation(node, node.value, time);
}
function runComputation(node, value, time) {
    let nextValue;
    const owner = Owner,
        listener = Listener;
    Listener = Owner = node;
    try {
        nextValue = node.fn(value);
    } catch (err) {
        if (node.pure) {
            {
                node.state = STALE;
                node.owned && node.owned.forEach(cleanNode);
                node.owned = null;
            }
        }
        node.updatedAt = time + 1;
        return handleError(err);
    } finally {
        Listener = listener;
        Owner = owner;
    }
    if (!node.updatedAt || node.updatedAt <= time) {
        if (node.updatedAt != null && "observers" in node) {
            writeSignal(node, nextValue);
        } else node.value = nextValue;
        node.updatedAt = time;
    }
}
function createComputation(fn, init, pure, state = STALE, options) {
    const c = {
        fn,
        state: state,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: init,
        owner: Owner,
        context: Owner ? Owner.context : null,
        pure,
    };
    if (Owner === null);
    else if (Owner !== UNOWNED) {
        {
            if (!Owner.owned) Owner.owned = [c];
            else Owner.owned.push(c);
        }
    }
    return c;
}
function runTop(node) {
    if (node.state === 0) return;
    if (node.state === PENDING) return lookUpstream(node);
    if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
    const ancestors = [node];
    while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
        if (node.state) ancestors.push(node);
    }
    for (let i = ancestors.length - 1; i >= 0; i--) {
        node = ancestors[i];
        if (node.state === STALE) {
            updateComputation(node);
        } else if (node.state === PENDING) {
            const updates = Updates;
            Updates = null;
            runUpdates(() => lookUpstream(node, ancestors[0]), false);
            Updates = updates;
        }
    }
}
function runUpdates(fn, init) {
    if (Updates) return fn();
    let wait = false;
    if (!init) Updates = [];
    if (Effects) wait = true;
    else Effects = [];
    ExecCount++;
    try {
        const res = fn();
        completeUpdates(wait);
        return res;
    } catch (err) {
        if (!wait) Effects = null;
        Updates = null;
        handleError(err);
    }
}
function completeUpdates(wait) {
    if (Updates) {
        runQueue(Updates);
        Updates = null;
    }
    if (wait) return;
    const e = Effects;
    Effects = null;
    if (e.length) runUpdates(() => runEffects(e), false);
}
function runQueue(queue) {
    for (let i = 0; i < queue.length; i++) runTop(queue[i]);
}
function runUserEffects(queue) {
    let i,
        userLength = 0;
    for (i = 0; i < queue.length; i++) {
        const e = queue[i];
        if (!e.user) runTop(e);
        else queue[userLength++] = e;
    }
    for (i = 0; i < userLength; i++) runTop(queue[i]);
}
function lookUpstream(node, ignore) {
    node.state = 0;
    for (let i = 0; i < node.sources.length; i += 1) {
        const source = node.sources[i];
        if (source.sources) {
            const state = source.state;
            if (state === STALE) {
                if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount)) runTop(source);
            } else if (state === PENDING) lookUpstream(source, ignore);
        }
    }
}
function markDownstream(node) {
    for (let i = 0; i < node.observers.length; i += 1) {
        const o = node.observers[i];
        if (!o.state) {
            o.state = PENDING;
            if (o.pure) Updates.push(o);
            else Effects.push(o);
            o.observers && markDownstream(o);
        }
    }
}
function cleanNode(node) {
    let i;
    if (node.sources) {
        while (node.sources.length) {
            const source = node.sources.pop(),
                index = node.sourceSlots.pop(),
                obs = source.observers;
            if (obs && obs.length) {
                const n = obs.pop(),
                    s = source.observerSlots.pop();
                if (index < obs.length) {
                    n.sourceSlots[s] = index;
                    obs[index] = n;
                    source.observerSlots[index] = s;
                }
            }
        }
    }
    if (node.owned) {
        for (i = node.owned.length - 1; i >= 0; i--) cleanNode(node.owned[i]);
        node.owned = null;
    }
    if (node.cleanups) {
        for (i = node.cleanups.length - 1; i >= 0; i--) node.cleanups[i]();
        node.cleanups = null;
    }
    node.state = 0;
}
function castError(err) {
    if (err instanceof Error) return err;
    return new Error(typeof err === "string" ? err : "Unknown error", {
        cause: err,
    });
}
function handleError(err, owner = Owner) {
    const error = castError(err);
    throw error;
}
function createComponent(Comp, props) {
    return untrack(() => Comp(props || {}));
}

const narrowedError = (name) => `Stale read from <${name}>.`;
function Show(props) {
    const keyed = props.keyed;
    const condition = createMemo(() => props.when, undefined, {
        equals: (a, b) => (keyed ? a === b : !a === !b),
    });
    return createMemo(
        () => {
            const c = condition();
            if (c) {
                const child = props.children;
                const fn = typeof child === "function" && child.length > 0;
                return fn
                    ? untrack(() =>
                          child(
                              keyed
                                  ? c
                                  : () => {
                                        if (!untrack(condition)) throw narrowedError("Show");
                                        return props.when;
                                    }
                          )
                      )
                    : child;
            }
            return props.fallback;
        },
        undefined,
        undefined
    );
}

const errCB = () => {
    throw new Error("Cannot use translation func outside TranslationContext provider.");
};
const TranslationContext = React__default.default.createContext({
    translate: errCB,
});
const useTranslation = () => {
    return React.useContext(TranslationContext).translate;
};
const [getTranslate, setTranslationFunction] = createSignal(() => "");
const TranslationContextProvider = ({
    children,
    defaultLanguage,
    userTranslationFunc,
    defaultStore,
    translationControlEventSource,
}) => {
    const [translationStore, setTranslationStore] = React.useState(defaultStore);
    const [currentLanguage, setCurrentLanguage] = React.useState(undefined);
    React.useEffect(() => {
        void (async function loadLanguageFromCookies() {
            const cookieLang = await genericComponentOverrideContext.getCurrentLanguageFromCookie();
            const cookieLangTemp = cookieLang ?? defaultLanguage;
            /**
             * If current is not undefined, it means that something else has set the language.
             * For example if the user calls SuperTokens.changeLanguage before this
             *
             * We want to use the language preference from cookies only if something else has
             * not set language before this
             */
            setCurrentLanguage((current) => (current !== undefined ? current : cookieLangTemp));
        })();
    }, [defaultLanguage]);
    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const changeHandler = (_eventName, detail) => {
            setCurrentLanguage(detail);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const loadHandler = (_eventName, detail) => {
            setTranslationStore((os) => genericComponentOverrideContext.mergeObjects(os, detail));
        };
        translationControlEventSource.on("LanguageChange", changeHandler);
        translationControlEventSource.on("TranslationLoaded", loadHandler);
        return () => {
            translationControlEventSource.off("LanguageChange", changeHandler);
            translationControlEventSource.off("TranslationLoaded", loadHandler);
        };
    });
    const translate = React.useCallback(
        (key) => {
            if (userTranslationFunc !== undefined) {
                return userTranslationFunc(key);
            }
            if (currentLanguage === undefined) {
                throw new Error("Should never come here");
            }
            return translationStore[currentLanguage]?.[key] ?? translationStore[defaultLanguage]?.[key] ?? key;
        },
        [translationStore, currentLanguage, defaultLanguage, userTranslationFunc]
    );
    React.useMemo(() => setTranslationFunction(() => translate), [translate]);
    const contextValue = React.useMemo(() => ({ translate }), [translate]);
    if (currentLanguage === undefined) {
        return null;
    }
    return jsxRuntime.jsx(TranslationContext.Provider, { value: contextValue, children: children });
};

exports.Show = Show;
exports.TranslationContextProvider = TranslationContextProvider;
exports.createComponent = createComponent;
exports.createEffect = createEffect;
exports.createRenderEffect = createRenderEffect;
exports.createRoot = createRoot;
exports.createSignal = createSignal;
exports.getTranslate = getTranslate;
exports.onCleanup = onCleanup;
exports.onMount = onMount;
exports.untrack = untrack;
exports.useTranslation = useTranslation;
