import en from "@/i18n/messages/en";
import de from "@/i18n/messages/de";
import fr from "@/i18n/messages/fr";

export type Locale = "en" | "de" | "fr";
export const SUPPORTED_LOCALES: Locale[] = ["en", "de", "fr"];

export type MessageValue = string | string[];

export const MESSAGES: Record<Locale, Record<string, MessageValue>> = {
  en,
  de,
  fr,
};

export function normalizeLocale(v: unknown): Locale {
  return v === "de" || v === "fr" || v === "en" ? v : "en";
}

/** Raw getter: can return string OR string[] */
export function v(locale: Locale, key: string): MessageValue | undefined {
  return MESSAGES[locale]?.[key] ?? MESSAGES.en?.[key];
}

/** Flat-key translate for strings. Fallback: EN -> key */
export function t(locale: Locale, key: string): string {
  const val = v(locale, key);
  return typeof val === "string" ? val : key;
}