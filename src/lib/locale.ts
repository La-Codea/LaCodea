import { headers } from "next/headers";

export const SUPPORTED_LOCALES = ["en", "de", "fr"] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export async function getRequestLocale(): Promise<Locale> {
  const h = await headers();
  const v = (h.get("x-locale") || "en").toLowerCase();

  if ((SUPPORTED_LOCALES as readonly string[]).includes(v)) {
    return v as Locale;
  }
  return "en";
}
