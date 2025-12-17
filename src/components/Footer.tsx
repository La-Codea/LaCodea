import { getRequestLocale, type Locale } from "@/lib/locale";
import FooterClient from "@/components/FooterClient";

function strings(locale: Locale) {
  const S: Record<Locale, any> = {
    en: {
      tagline: "Simple, useful iOS apps — built by LaCodea.",
      apps: "Apps",
      announcements: "Announcements",
      support: "Support",
      feedback: "Feedback",
      contact: "Contact",
      privacy: "Privacy",
      imprint: "Imprint",
    },
    de: {
      tagline: "Einfache, nützliche iOS Apps — gebaut von LaCodea.",
      apps: "Apps",
      announcements: "Mitteilungen",
      support: "Support",
      feedback: "Feedback",
      contact: "Kontakt",
      privacy: "Datenschutz",
      imprint: "Impressum",
    },
    fr: {
      tagline: "Des apps iOS simples et utiles — créées par LaCodea.",
      apps: "Apps",
      announcements: "Annonces",
      support: "Support",
      feedback: "Avis",
      contact: "Contact",
      privacy: "Confidentialité",
      imprint: "Mentions légales",
    },
  };
  return S[locale] ?? S.en;
}

export default async function Footer() {
  const locale = await getRequestLocale();
  const t = strings(locale);

  return <FooterClient locale={locale} t={t} />;
}