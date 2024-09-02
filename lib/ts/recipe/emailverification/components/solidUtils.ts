import { onMount, onCleanup, createSignal, createEffect } from "solid-js";

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
export function useOnMountAPICall<T>(
    fetch: () => Promise<T>,
    handleResponse: (response: T) => void | Promise<void>,
    handleError?: (err: unknown, response: T | undefined) => void | Promise<void>,
    startLoading = true
): void {
    if (!startLoading) {
        return;
    }

    const [error, setError] = createSignal<unknown>(undefined);
    const controller = new AbortController();

    onMount(async (): Promise<void> => {
        let resp: T | undefined;

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

    onCleanup(() => controller.abort());

    createEffect(() => {
        if (error()) {
            throw error();
        }
    });
}

export function useRethrowInRender() {
    const [error, setError] = createSignal<string | undefined>();

    createEffect(() => {
        if (error()) {
            throw error();
        }
    });

    return setError;
}
