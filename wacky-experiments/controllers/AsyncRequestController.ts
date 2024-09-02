import type { ReactiveController, ReactiveControllerHost } from "lit";

export default class AsyncRequestController<T> implements ReactiveController {
    // Internal State
    #controller = new AbortController();

    // Values from Constructor
    #host: ReactiveControllerHost;
    #fetch: () => Promise<T>;
    #handleResponse: (response: T) => void | Promise<void>;
    #handleError?: (err: unknown, response: T | undefined) => void | Promise<void>;
    #startLoading: boolean;

    // DEFERRED: This can probably be made more idiomatic for Lit
    constructor(
        host: ReactiveControllerHost,
        fetch: () => Promise<T>,
        handleResponse: (response: T) => void | Promise<void>,
        handleError?: (err: unknown, response: T | undefined) => void | Promise<void>,
        startLoading = true
    ) {
        (this.#host = host).addController(this);
        this.#fetch = fetch;
        this.#handleResponse = handleResponse;
        this.#handleError = handleError;
        this.#startLoading = startLoading;
    }

    async hostConnected(): Promise<void> {
        // DEFERRED: Do we _need_ to await `updateComplete` to make sure all props are properly assigned to the component?
        await this.#host.updateComplete;

        if (!this.#startLoading) {
            return this.#host.removeController(this);
        }

        let resp: T | undefined;

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
