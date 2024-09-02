export type TranslationStore = Record<string, Record<string, string | undefined>>;
export type TranslationFunc = (key: string) => string;
export type TranslationContextType = {
    translate: TranslationFunc;
};
export type TranslationEventMap = {
    LanguageChange: string;
    TranslationLoaded: TranslationStore;
};
export type TranslationEventHandler<K extends keyof TranslationEventMap> = (
    event: K,
    detail: TranslationEventMap[K]
) => void;
export type TranslationControlEventSource = {
    on: <K extends keyof TranslationEventMap>(event: K, handler: TranslationEventHandler<K>) => void;
    off: <K extends keyof TranslationEventMap>(event: K, handler: TranslationEventHandler<K>) => void;
};
export declare class TranslationController implements TranslationControlEventSource {
    handlers: Map<keyof TranslationEventMap, TranslationEventHandler<any>[]>;
    emit<K extends keyof TranslationEventMap>(event: K, detail: TranslationEventMap[K]): void;
    on<K extends keyof TranslationEventMap>(event: K, handler: TranslationEventHandler<K>): void;
    off<K extends keyof TranslationEventMap>(event: K, handler: TranslationEventHandler<K>): void;
}
export declare function saveCurrentLanguage(language: string, cookieDomain: string | undefined): Promise<void>;
/** Gets the current language (if one is available) from the browser's cookie store */
export declare function getCurrentLanguageFromCookie(): Promise<string | null>;
