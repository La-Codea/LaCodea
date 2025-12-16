import en from "@/lib/messages/en";
import de from "@/lib/messages/de";
import fr from "@/lib/messages/fr";

export type Locale = "en" | "de" | "fr";
export const SUPPORTED_LOCALES: Locale[] = ["en", "de", "fr"];

export const MESSAGES: Record<Locale, Record<string, string>> = {
  en: en as any,
  de: de as any,
  fr: fr as any,
};

export function normalizeLocale(v: unknown): Locale {
  const s = String(v || "").toLowerCase();
  return (s === "de" || s === "fr" || s === "en") ? (s as Locale) : "en";
}
