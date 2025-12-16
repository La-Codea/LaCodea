export type Locale = "en" | "de" | "fr";

export const translations: Record<Locale, any> = {
  en: {
    nav: {
      home: "Home",
      apps: "Apps",
      announcements: "Announcements",
      support: "Support",
      feedback: "Feedback",
      contact: "Contact",
    },
  footer: {
    tagline: "Simple, useful iOS apps — built by LaCodea.",
    apps: "Apps",
    announcements: "Announcements",
    support: "Support",
    feedback: "Feedback",
    contact: "Contact",
    privacy: "Privacy",
    imprint: "Imprint",
  },
  },
  de: {
    nav: {
      home: "Start",
      apps: "Apps",
      announcements: "Mitteilungen",
      support: "Support",
      feedback: "Feedback",
      contact: "Kontakt",
    },
  footer: {
    tagline: "Einfache, nützliche iOS Apps — gebaut von LaCodea.",
    apps: "Apps",
    announcements: "Mitteilungen",
    support: "Support",
    feedback: "Feedback",
    contact: "Kontakt",
    privacy: "Datenschutz",
    imprint: "Impressum",
  },
  },
  fr: {
    nav: {
      home: "Accueil",
      apps: "Apps",
      announcements: "Annonces",
      support: "Support",
      feedback: "Avis",
      contact: "Contact",
    },
  footer: {
    tagline: "Des apps iOS simples et utiles — créées par LaCodea.",
    apps: "Apps",
    announcements: "Annonces",
    support: "Support",
    feedback: "Avis",
    contact: "Contact",
    privacy: "Confidentialité",
    imprint: "Mentions légales",
  },
  },
};

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  return "en";
}

export function t(locale: Locale, key: string): string {
  const parts = key.split(".");
  let cur: any = translations[locale];
  for (const p of parts) cur = cur?.[p];
  return typeof cur === "string" ? cur : key;
}
