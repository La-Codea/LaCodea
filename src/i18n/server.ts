import { cookies, headers } from "next/headers";
import { MESSAGES, Locale } from "@/i18n/messages";

export const SUPPORTED_LOCALES: Locale[] = ["en", "de", "fr"];

function normalizeLocale(v: string | null | undefined): Locale {
  if (v === "de" || v === "fr" || v === "en") return v;
  return "en";
}

export async function getRequestLocale(): Promise<Locale> {
  try {
    const c: any = await cookies();
    const fromCookie = c?.get?.("lacodea_locale")?.value;
    if (fromCookie) return normalizeLocale(fromCookie);
  } catch {}

  try {
    const h: any = await headers();
    const fromHeader = typeof h?.get === "function" ? h.get("x-locale") : null;
    if (fromHeader) return normalizeLocale(fromHeader);
  } catch {}

  return "en";
}

export function t(locale: Locale, key: string): string {
  return (MESSAGES[locale] && (MESSAGES[locale] as any)[key]) || key;
}

export async function getT() {
  const locale = await getRequestLocale();
  return {
    locale,
    t: (key: string) => t(locale, key),
  };
}
