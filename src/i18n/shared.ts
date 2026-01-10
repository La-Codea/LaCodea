import en from "@/i18n/messages/en";
import de from "@/i18n/messages/de";
import fr from "@/i18n/messages/fr";
import es from "@/i18n/messages/es";
import it from "@/i18n/messages/it";
import ru from "@/i18n/messages/ru";
import hy from "@/i18n/messages/hy";

export type Locale = "en" | "de" | "fr" | "es" | "it" | "ru" | "hy";
export const SUPPORTED_LOCALES: Locale[] = ["en", "de", "fr", "es", "it", "ru", "hy"];

// ✅ wichtig: readonly string[] erlauben
export type MessageValue = string | readonly string[];

export const MESSAGES: Record<Locale, Record<string, MessageValue>> = {
  en,
  de,
  fr,
  es,
  it,
  ru,
  hy,
};

export function normalizeLocale(v: unknown): Locale {
  return v === "de" || v === "fr" || v === "es" || v === "it" || v === "ru" || v === "hy" || v === "en"
    ? v
    : "en";
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