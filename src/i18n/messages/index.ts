import en from "./en";
import de from "./de";
import fr from "./fr";
import es from "./es";
import it from "./it";
import ru from "./ru";
import hy from "./hy";

export type Locale = "en" | "de" | "fr" | "es" | "it" | "ru" | "hy";

/**
 * Messages are nested objects (dot-keys resolved in src/i18n/shared.ts).
 * Therefore we type them as unknown to avoid forcing a flat Record<string,string>.
 */
export const MESSAGES: Record<Locale, unknown> = {
  en,
  de,
  fr,
  es,
  it,
  ru,
  hy,
};

export { en, de, fr, es, it, ru, hy };