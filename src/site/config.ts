export type SiteKey = "hub" | "simpletime" | "orgaone";

export type SiteConfig = {
  key: SiteKey;
  name: string;                 // "LaCodea" | "SimpleTime"
  logoType: "text" | "image";
  logoSrc?: string;             // z.B. /simpletime/logo.svg
  nav: {
    showApps: boolean;
    showAnnouncements: boolean;
  };
  defaults: {
    appSlug?: string;           // "simpletime"
  };

  // ✅ SEO
  seo: {
    title: string;
    description: string;
    ogImagePath: string; // z.B. "/og/hub.png"
    appStoreId?: string;   // e.g. "1234567890"
    appStoreUrl?: string;  // full App Store URL
  };
};

export const HUB: SiteConfig = {
  key: "hub",
  name: "LaCodea",
  logoType: "image",
  logoSrc: "/lacodea/lacodealogo.png",
  nav: { showApps: true, showAnnouncements: true },
  defaults: {},
  seo: {
    title: "LaCodea",
    description:
      "Simple, useful iOS apps — built by LaCodea. Privacy-first by default. No accounts needed.",
    ogImagePath: "/og/hub.png",
  },
};

export const SIMPLETIME: SiteConfig = {
  key: "simpletime",
  name: "SimpleTime",
  logoType: "image",
  logoSrc: "/simpletime/simpletimelogo.png",
  nav: { showApps: false, showAnnouncements: true },
  defaults: { appSlug: "simpletime" },
  seo: {
    title: "SimpleTime",
    description:
      "SimpleTime helps you track time and stay focused — fast, private, and offline-friendly.",
    ogImagePath: "/og/simpletime.png",
    appStoreId: "6755532037",
    appStoreUrl: "https://apps.apple.com/app/id6755532037",
  },
};

export const ORGAONE: SiteConfig = {
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

export function getSiteConfig(appSlug?: string | null): SiteConfig {
  if (appSlug === "simpletime") return SIMPLETIME;
  if (appSlug === "orgaone") return ORGAONE;
  return HUB;
}