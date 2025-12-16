import { SUPPORTED_LOCALES } from "@/lib/i18n/shared";

export async function getSupportedLocaleCount(): Promise<number> {
  return SUPPORTED_LOCALES.length;
}
