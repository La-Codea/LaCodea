import en from "./en";
import de from "./de";
import fr from "./fr";

export type Locale = "en" | "de" | "fr";

export const MESSAGES: Record<Locale, Record<string, string>> = {
  en,
  de,
  fr,
};
