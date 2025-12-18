// src/app/apps/page.tsx
import Image from "next/image";
import { getT } from "@/i18n/server";
import { getApps, getAppDescription } from "@/lib/getApps";
import { urlFor } from "@/lib/sanityImage";

function getAppHref(slug: string) {
  if (process.env.NODE_ENV !== "production") return `http://${slug}.localhost:3000`;
  const domain = process.env.ROOT_DOMAIN ?? "lacodea.com";
  return `https://${slug}.${domain}`;
}

function getAppSupportHref(slug: string) {
  if (process.env.NODE_ENV !== "production") {
    return `http://${slug}.localhost:3000/support`;
  }
  const domain = process.env.ROOT_DOMAIN ?? "lacodea.com";
  return `https://${slug}.${domain}/support`;
}

export default async function AppsPage() {
  const { t, locale } = await getT();
  const apps = await getApps();

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold">{t("pages.apps.title")}</h1>
      <p className="muted mt-2">{t("pages.apps.subtitle")}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => {
          const desc = getAppDescription(app, locale);
          const appHref = getAppHref(app.slug);
          const supportHref = getAppSupportHref(app.slug);

          return (
            <article
              key={app._id}
              className="card p-5 h-full flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                {app.icon ? (
                  <Image
                    src={urlFor(app.icon).width(64).height(64).fit("crop").url()}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-xl border border-[rgb(var(--card-border))]"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))]" />
                )}

                <div className="text-base font-semibold leading-tight">{app.name}</div>
              </div>

              {/* Body (nimmt Platz ein, damit Buttons unten bleiben) */}
              <div className="mt-3 flex-1">
                {desc ? (
                  <p className="muted text-sm leading-relaxed">{desc}</p>
                ) : (
                  <p className="muted text-sm leading-relaxed">&nbsp;</p>
                )}
              </div>

              {/* Buttons (immer unten) */}
              <div className="mt-4 flex flex-wrap gap-2">
                <a className="btn btn-primary" href={appHref}>
                  {t("pages.apps.appWebsite")}
                </a>

                {app.appStoreUrl && (
                  <a className="btn" href={app.appStoreUrl} target="_blank" rel="noreferrer">
                    {t("pages.apps.appStore")}
                  </a>
                )}

                <a className="btn" href={supportHref}>
                  {t("pages.apps.support")}
                </a>
              </div>
            </article>
          );
        })}

        {apps.length === 0 && <p className="muted">{t("pages.apps.empty")}</p>}
      </div>
    </main>
  );
}