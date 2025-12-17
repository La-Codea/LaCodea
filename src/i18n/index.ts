// src/i18n/index.ts  (client-safe)
export type { Locale } from "./shared";
export { SUPPORTED_LOCALES, MESSAGES, normalizeLocale, t } from "./shared";

export { getLocaleFromPath, switchLocale } from "./client";