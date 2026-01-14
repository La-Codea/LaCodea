import type { SiteConfig } from "@/site/config";

export const hubConfig: SiteConfig = {
  key: "hub",
  name: "LaCodea",
  logoType: "text",
  nav: { showApps: true, showAnnouncements: true },
  defaults: {},
  seo: {
    title: "LaCodea",
    description:
      "Simple, useful iOS apps — built by LaCodea. Privacy-first by default. No accounts needed.",
    ogImagePath: "/og/hub.png",
  },
};