import type { ReactiveController, ReactiveControllerHost } from "lit";
export default class AsyncRequestController<T> implements ReactiveController {
    #private;
    constructor(
        host: ReactiveControllerHost,
        fetch: () => Promise<T>,
        handleResponse: (response: T) => void | Promise<void>,
        handleError?: (err: unknown, response: T | undefined) => void | Promise<void>,
        startLoading?: boolean
    );
    hostConnected(): Promise<void>;
    hostDisconnected(): void;
}
