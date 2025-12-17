import en from "@/i18n/messages/en";
import de from "@/i18n/messages/de";
import fr from "@/i18n/messages/fr";

export type Locale = "en" | "de" | "fr";
export const SUPPORTED_LOCALES: Locale[] = ["en", "de", "fr"];

export const MESSAGES: Record<Locale, Record<string, string>> = {
  en,
  de,
  fr,
};

export function normalizeLocale(v: unknown): Locale {
  return v === "de" || v === "fr" || v === "en" ? v : "en";
}

/** Flat-key translate. Fallback: EN -> key */
export function t(locale: Locale, key: string): string {
  return MESSAGES[locale]?.[key] ?? MESSAGES.en?.[key] ?? key;
}
