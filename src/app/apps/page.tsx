import Link from "next/link";
import { getT } from "@/i18n/server";
import { getApps } from "@/lib/getApps";

export default async function AppsPage() {
  const t = await getT();
  const apps = await getApps();

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold">{t("pages.apps.title")}</h1>
      <p className="muted mt-2">{t("pages.apps.subtitle")}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {apps.map((app) => (
          <article key={app._id} className="card p-6">
            <div className="text-sm font-semibold">{app.name}</div>
            {app.tagline && <p className="muted mt-2">{app.tagline}</p>}

            <div className="mt-4 flex flex-wrap gap-2">
              {app.websiteUrl ? (
                <a className="btn btn-primary" href={app.websiteUrl}>
                  {t("pages.apps.appWebsite")}
                </a>
              ) : (
                <Link className="btn btn-primary" href={`http://${app.slug}.localhost:3000`}>
                  {t("pages.apps.appWebsite")}
                </Link>
              )}

              {app.appStoreUrl && (
                <a className="btn" href={app.appStoreUrl}>
                  {t("pages.apps.appStore")}
                </a>
              )}

              <Link className="btn" href={`/support/${app.slug}`}>
                {t("pages.apps.support")}
              </Link>
            </div>
          </article>
        ))}

        {apps.length === 0 && <p className="muted">{t("pages.apps.empty")}</p>}
      </div>
    </main>
  );
}
