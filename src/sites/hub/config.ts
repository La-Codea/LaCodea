import type { SiteConfig } from "@/site/config";

export const simpletimeConfig: SiteConfig = {
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