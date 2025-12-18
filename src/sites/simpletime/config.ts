import type { SiteConfig } from "@/site/config";

export const simpletimeConfig: SiteConfig = {
  key: "simpletime",
  name: "SimpleTime",
  logoType: "image",
  logoSrc: "/simpletime/logo.svg",
  nav: { showApps: false, showAnnouncements: true },
  defaults: { appSlug: "simpletime" },
};