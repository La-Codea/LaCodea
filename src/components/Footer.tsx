import FooterClient from "@/components/FooterClient";
import type { SiteConfig } from "@/site/config";
import { getT } from "@/i18n/server";

type FooterStrings = {
  tagline: string;
  sectionNavigation: string;
  sectionLegal: string;
  bottomline: string;

  // nav labels
  apps: string;
  announcements: string;
  support: string;
  feedback: string;
  contact: string;
  privacy: string;
  imprint: string;

  // socials
  socialWhatsapp: string;
  socialX: string;
};

export default async function Footer({ site }: { site: SiteConfig }) {
  const __i18n = await getT();
  const locale =
    typeof __i18n === "function" ? ("en" as const) : (__i18n.locale ?? "en");
  const tt = typeof __i18n === "function" ? __i18n : __i18n.t;

  const strings: FooterStrings = {
    tagline: tt("footer.tagline"),
    sectionNavigation: tt("footer.section.navigation"),
    sectionLegal: tt("footer.section.legal"),
    bottomline: tt("footer.bottomline"),

    apps: tt("nav.apps"),
    announcements: tt("nav.announcements"),
    support: tt("nav.support"),
    feedback: tt("nav.feedback"),
    contact: tt("nav.contact"),
    privacy: tt("nav.privacy"),
    imprint: tt("nav.imprint"),

    socialWhatsapp: tt("footer.social.whatsapp"),
    socialX: tt("footer.social.x"),
  };

  return <FooterClient locale={locale} strings={strings} site={site} />;
}