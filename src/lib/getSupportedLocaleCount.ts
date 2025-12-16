import { SUPPORTED_LOCALES } from "@/lib/locale";

export async function getSupportedLocaleCount(): Promise<number> {
  return SUPPORTED_LOCALES.length;
}
