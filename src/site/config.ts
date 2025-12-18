export type SiteKey = "hub" | "simpletime";

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
};

export const HUB: SiteConfig = {
  key: "hub",
  name: "LaCodea",
  logoType: "text",
  nav: { showApps: true, showAnnouncements: true },
  defaults: {},
};

export const SIMPLETIME: SiteConfig = {
  key: "simpletime",
  name: "SimpleTime",
  logoType: "image",
  logoSrc: "/simpletime/simpletimelogo.png",
  nav: { showApps: false, showAnnouncements: true },
  defaults: { appSlug: "simpletime" },
};

export function getSiteConfig(appSlug?: string | null): SiteConfig {
  if (appSlug === "simpletime") return SIMPLETIME;
  return HUB;
}