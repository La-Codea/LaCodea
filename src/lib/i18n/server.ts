import { cookies, headers } from "next/headers";
import { Locale, MESSAGES, normalizeLocale } from "@/lib/i18n/shared";

// Next 16: cookies()/headers() können Promises sein -> await
export async function getLocale(): Promise<Locale> {
  const c: any = await cookies();
  const h: any = await headers();

  const fromCookie = c?.get?.("lacodea_locale")?.value;
  const fromHeader = h?.get?.("x-locale");

  return normalizeLocale(fromCookie || fromHeader);
}

export async function getT() {
  const locale = await getLocale();
  const dict = MESSAGES[locale] ?? MESSAGES.en;

  return (key: string) => dict[key] ?? MESSAGES.en[key] ?? key;
}
