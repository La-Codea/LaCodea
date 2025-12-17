import en from "./en";
import de from "./de";
import fr from "./fr";

export type Locale = "en" | "de" | "fr";

/**
 * Messages are nested objects (dot-keys resolved in src/i18n/shared.ts).
 * Therefore we type them as unknown to avoid forcing a flat Record<string,string>.
 */
export const MESSAGES: Record<Locale, unknown> = {
  en,
  de,
  fr,
};

export { en, de, fr };
