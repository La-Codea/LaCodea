// src/sites/hub/pages/privacyApp.tsx
import { t, type Locale } from "@/i18n";

export default function HubPrivacyPolicy({ locale }: { locale: Locale }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <h2 className="text-xl font-semibold">{t(locale, "privacy.hub.title")}</h2>
      <p className="muted mt-2">{t(locale, "privacy.hub.intro")}</p>

      <div className="mt-8 space-y-6">
        <div>
          <div className="font-semibold">{t(locale, "privacy.hub.section1.title")}</div>
          <p className="muted mt-2">{t(locale, "privacy.hub.section1.body")}</p>
        </div>

        <div>
          <div className="font-semibold">{t(locale, "privacy.hub.section2.title")}</div>
          <p className="muted mt-2">{t(locale, "privacy.hub.section2.body")}</p>
        </div>

        <div>
          <div className="font-semibold">{t(locale, "privacy.hub.section3.title")}</div>
          <p className="muted mt-2">
            {t(locale, "privacy.hub.section3.body")}{" "}
            <a className="underline" href="mailto:contact@lacodea.com">
              contact@lacodea.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}