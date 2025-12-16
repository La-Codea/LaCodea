import en from "@/i18n/messages/en";
import de from "@/i18n/messages/de";
import fr from "@/i18n/messages/fr";

export type Locale = "en" | "de" | "fr";

const messages: Record<Locale, any> = { en, de, fr };

export function t(locale: Locale, key: string): string {
  const parts = key.split(".");
  let cur: any = messages[locale] ?? messages.en;

  for (const p of parts) {
    cur = cur?.[p];
    if (cur == null) return key;
  }
  return typeof cur === "string" ? cur : key;
}
