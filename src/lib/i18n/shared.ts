export type Locale = "en" | "de" | "fr";

export const SUPPORTED_LOCALES: Locale[] = ["en", "de", "fr"];

export function normalizeLocale(v: unknown): Locale {
  return v === "de" || v === "fr" || v === "en" ? v : "en";
}
