import en from "@/i18n/messages/en";
import de from "@/i18n/messages/de";
import fr from "@/i18n/messages/fr";

export type Locale = "en" | "de" | "fr";

export const SUPPORTED_LOCALES: Locale[] = ["en", "de", "fr"];

export const MESSAGES: Record<Locale, unknown> = {
  en,
  de,
  fr,
};

export function normalizeLocale(v: unknown): Locale {
  if (v === "de" || v === "fr" || v === "en") return v;
  return "en";
}

function getByPath(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== "object") return undefined;
  return path.split(".").reduce<unknown>((acc, key) => {
    if (!acc || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
}

/**
 * Translate by dot-key. Falls back to EN, then to the key itself.
 */
export function t(locale: Locale, key: string): string {
  const fromLocale = getByPath(MESSAGES[locale], key);
  if (typeof fromLocale === "string") return fromLocale;

  const fromEn = getByPath(MESSAGES.en, key);
  if (typeof fromEn === "string") return fromEn;

  return key;
}
