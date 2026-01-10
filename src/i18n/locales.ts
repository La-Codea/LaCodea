export const LOCALES = ["en", "de", "fr", "es", "it", "ru", "hy"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";