import { getT } from "@/lib/i18n/server";
import Link from "next/link";
import { getAppCount } from "@/lib/getAppCount";
import { getSupportedLocaleCount } from "@/lib/getSupportedLocaleCount";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="opacity-70">{label}</div>
    </div>
  );
}

export default async function Page() {
  const t = await getT();
  const appCount = await getAppCount();
  const langCount = await getSupportedLocaleCount();

  return (
    <main className="container py-12">
      <section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {t("pages.home.title")}
          </h1>
          <p className="muted mt-4 text-lg">{t("pages.home.subtitle")}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/apps" className="btn btn-primary">
              {t("nav.apps")}
            </Link>
            <Link href="/announcements" className="btn">
              {t("nav.announcements")}
            </Link>
            <Link href="/support" className="btn">
              {t("nav.support")}
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Stat label={t("pages.home.statsApps")} value={`${appCount}+`} />
            <Stat label={t("pages.home.statsLanguages")} value={`${langCount}`} />
            <Stat label="Rating" value="★★★★★" />
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm font-semibold">LaCodea</div>
          <p className="muted mt-2">
            {t("home.pillars.tagline")}
          </p>
          <div className="hr my-6" />
          <div className="grid gap-3">
            <div className="card p-4">
              <div className="font-medium">{t("home.pillars.privacy.title")}</div>
              <p className="muted text-sm">{t("home.pillars.privacy.desc")}</p>
            </div>
            <div className="card p-4">
              <div className="font-medium">{t("home.pillars.focused.title")}</div>
              <p className="muted text-sm">{t("home.pillars.focused.desc")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
