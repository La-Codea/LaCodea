import { getRequestLocale } from "@/lib/locale";
import { t } from "@/i18n";

export async function getT() {
  const locale = await getRequestLocale();
  return (key: string) => t(locale, key);
}
