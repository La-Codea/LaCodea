import { cookies, headers } from "next/headers";
import type { Locale } from "./shared";
import { normalizeLocale } from "./shared";

export async function getRequestLocale(): Promise<Locale> {
  // Next 16: cookies()/headers() may be Promise-like depending on runtime
  const h: any = await headers();
  const c: any = await cookies();

  const headerLocale = h?.get?.("x-locale");
  const cookieLocale = c?.get?.("lacodea_locale")?.value;

  return normalizeLocale(headerLocale ?? cookieLocale ?? "en");
}
