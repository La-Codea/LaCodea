// src/sites/hub/pages/privacyIndex.tsx
import { t, type Locale } from "@/i18n";
import { getApps } from "@/lib/getApps";
import HubPrivacyPolicy from "@/sites/hub/pages/privacyApp";

function getLocalePrefix(locale: Locale) {
  return locale === "en" ? "" : `/${locale}`;
}

function getAppBase(slug: string) {
  if (process.env.NODE_ENV !== "production") {
    return `http://${slug}.localhost:3000`;
  }
  const domain = process.env.ROOT_DOMAIN ?? "lacodea.com";
  return `https://${slug}.${domain}`;
}

export default async function PrivacyIndexPage({ locale }: { locale: Locale }) {
  const prefix = getLocalePrefix(locale);
  const apps = await getApps();

  const updated = new Date().toISOString().slice(0, 10);

  return (
    <>
      {/* oben: App Buttons */}
      <section className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="font-semibold">{t(locale, "pages.privacy.chooseApp")}</div>

        <div className="mt-4 flex flex-wrap gap-2">
          {apps.map((a) => (
            <a
              key={a._id}
              className="btn"
              href={`${getAppBase(a.slug)}${prefix}/privacy`}
            >
              {a.name}
            </a>
          ))}

          {apps.length === 0 ? (
            <div className="muted">{t(locale, "pages.apps.empty")}</div>
          ) : null}
        </div>

        <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          {t(locale, "pages.privacy.updated")} {updated}
        </div>
      </section>

      {/* darunter: LaCodea (Hub) Privacy */}
      <div className="mt-10">
        <HubPrivacyPolicy locale={locale} />
      </div>
    </>
  );
}