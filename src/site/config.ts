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
  logoType: "image",
  logoSrc: "/lacodea/lacodealogo.png",
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

export const ORGAONE: SiteConfig = {
  key: "orgaone",
  name: "OrgaOne",
  logoType: "image",
  logoSrc: "/orgaone/orgaonelogo.png",
  nav: { showApps: false, showAnnouncements: true },
  defaults: { appSlug: "orgaone" },
};

export function getSiteConfig(appSlug?: string | null): SiteConfig {
  if (appSlug === "simpletime") return SIMPLETIME;
  if (appSlug === "orgaone") return ORGAONE;
  return HUB;
}