import type { SiteConfig } from "@/site/config";

export const orgaoneConfig: SiteConfig = {
  key: "orgaone",
  name: "OrgaOne",
  logoType: "image",
  logoSrc: "/orgaone/orgaonelogo.png",
  nav: { showApps: false, showAnnouncements: true },
  defaults: { appSlug: "orgaone" },

  seo: {
    title: "OrgaOne",
    description:
      "OrgaOne — a clean, focused productivity tool by LaCodea. Privacy-first and built for speed.",
    ogImagePath: "/og/orgaone.png",
    appStoreId: "0000000000",
    appStoreUrl: "https://apps.apple.com/app/id0000000000",
  },
};