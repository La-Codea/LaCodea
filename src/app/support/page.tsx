// src/app/support/page.tsx
import Image from "next/image";
import { getT } from "@/i18n/server";
import { getApps, getAppDescription } from "@/lib/getApps";
import { urlFor } from "@/lib/sanityImage";
import { resolveSite } from "@/site/resolve";

// ✅ SimpleTime Support (FAQ + Form)
import SimpleTimeSupport from "@/sites/simpletime/pages/support";

function getAppSupportHref(slug: string, locale: string) {
  const prefix = locale === "en" ? "" : `/${locale}`;

  if (process.env.NODE_ENV !== "production") {
    return `http://${slug}.localhost:3000${prefix}/support`;
  }

  const domain = process.env.ROOT_DOMAIN ?? "lacodea.com";
  return `https://${slug}.${domain}${prefix}/support`;
}

export default async function SupportPage() {
  const site = await resolveSite();

  // ✅ Subdomain simpletime => direkt zur SimpleTime Support Seite (FAQ + Form)
  if (site.key === "simpletime") {
    return <SimpleTimeSupport />;
  }

  // ✅ Hub (lacodea.com) => Auswahlseite
  const { t, locale } = await getT();
  const apps = await getApps();

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold">{t("pages.support.title")}</h1>
      <p className="muted mt-2">
        {t("pages.support.chooseApp")}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => {
          const desc = getAppDescription(app, locale);

          return (
            <a
              key={app._id}
              href={getAppSupportHref(app.slug, locale)}
              className="card p-5 transition hover:translate-y-[-1px]"
            >
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

              {desc ? (
                <p className="muted mt-3 text-sm leading-relaxed">{desc}</p>
              ) : null}

              <div className="mt-4">
                <span className="btn btn-primary">{t("pages.support.openSupport")}</span>
              </div>
            </a>
          );
        })}
      </div>
    </main>
  );
}