import Link from "next/link";
import { getRequestLocale, type Locale } from "@/lib/locale";

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

  const path = (p: string) => (locale === "en" ? p : `/${locale}${p}`);

  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="container py-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-3 md:items-start">
          <div>
            <div className="text-lg font-semibold">LaCodea</div>
            <p className="muted mt-2">{t.tagline}</p>

            <div className="mt-6 flex gap-3">
              <a className="btn-icon" href="https://whatsapp.com" aria-label="WhatsApp">
                <span aria-hidden>🟢</span>
              </a>
              <a className="btn-icon" href="https://x.com" aria-label="X">
                <span aria-hidden>𝕏</span>
              </a>
              <a className="btn-icon" href="https://github.com" aria-label="GitHub">
                <span aria-hidden>⌂</span>
              </a>
              <a className="btn-icon" href="mailto:contact@lacodea.com" aria-label="Email">
                <span aria-hidden>✉</span>
              </a>
            </div>
          </div>

          <div className="grid gap-2 md:justify-self-center">
            <Link className="navlink" href={path("/apps")}>{t.apps}</Link>
            <Link className="navlink" href={path("/announcements")}>{t.announcements}</Link>
            <Link className="navlink" href={path("/support")}>{t.support}</Link>
            <Link className="navlink" href={path("/feedback")}>{t.feedback}</Link>
            <Link className="navlink" href={path("/contact")}>{t.contact}</Link>
          </div>

          <div className="grid gap-2 md:justify-self-end">
            <Link className="navlink" href={path("/privacy")}>{t.privacy}</Link>
            <Link className="navlink" href={path("/imprint")}>{t.imprint}</Link>
          </div>
        </div>

        <div className="hr my-8" />
        <div className="muted text-sm">
          © {new Date().getFullYear()} LaCodea
        </div>
      </div>
    </footer>
  );
}
