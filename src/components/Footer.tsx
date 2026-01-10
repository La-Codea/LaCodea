import type { Locale } from "@/i18n";
import type { SiteConfig } from "@/site/config";

export function getHubHomeHref(locale: Locale) {
  return `/${locale}/hub`;
}

type FooterClientProps = {
  locale: Locale;
  strings: Record<string, string>;
  site: SiteConfig;
};

export default function FooterClient({ locale, strings, site }: FooterClientProps) {
  // component implementation
}