import Link from "next/link";
import { t, type Locale } from "@/i18n";
import { sanityClient } from "@/lib/sanityClient";

type SanityApp = {
  _id: string;
  name: string;
  slug?: string;
  description?: { en?: string; de?: string; fr?: string };
  appStoreUrl?: string;
};

const APPS_QUERY = `*[_type == "app"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  appStoreUrl
}`;

function pickLocalized(desc: SanityApp["description"], locale: Locale) {
  if (!desc) return "";
  return desc[locale] || desc.en || desc.de || desc.fr || "";
}

function getBase(locale: Locale) {
  return locale === "en" ? "" : `/${locale}`;
}

function getAppHref(slug: string) {
  // Dev: subdomain.localhost
  if (process.env.NODE_ENV !== "production") {
    return `http://${slug}.localhost:3000`;
  }
  const domain = process.env.ROOT_DOMAIN ?? "lacodea.com";
  return `https://${slug}.${domain}`;
}

export default async function AppsPage({ locale }: { locale: Locale }) {
  const base = getBase(locale);

  const apps = await sanityClient.fetch<SanityApp[]>(APPS_QUERY);

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold tracking-tight">{t(locale, "pages.apps.title")}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t(locale, "pages.apps.subtitle")}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => {
          const slug = app.slug || "";
          const desc = pickLocalized(app.description, locale);

          return (
            <div
              key={app._id}
              className="rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <div className="text-lg font-semibold">{app.name}</div>

              {desc ? (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{desc}</p>
              ) : (
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">&nbsp;</p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {slug && (
                  <a className="btn btn-primary" href={getAppHref(slug)}>
                    {t(locale, "pages.apps.openApp")}
                  </a>
                )}

                {slug && (
                  <Link className="btn" href={`${base}/privacy/${slug}`}>
                    {t(locale, "pages.privacy.title")}
                  </Link>
                )}

                {app.appStoreUrl && (
                  <a className="btn" href={app.appStoreUrl} target="_blank" rel="noreferrer">
                    App Store
                  </a>
                )}
              </div>
            </div>
          );
        })}

        {apps.length === 0 && (
          <div className="text-zinc-600 dark:text-zinc-400">{t(locale, "pages.apps.empty")}</div>
        )}
      </div>
    </main>
  );
}
