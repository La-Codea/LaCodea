import { getT } from "@/i18n/server";
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

export default async function HubHome() {
  const __i18n = await getT();
  const t = typeof __i18n === "function" ? __i18n : __i18n.t;

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
            <div className="inline-block text-sm font-semibold relative group">
                <span className="relative z-10">LaCodea</span>
                <span
                    aria-hidden
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-current opacity-30 scale-x-60 origin-left transition-transform duration-300 group-hover:scale-x-100"
                />
            </div>
          <p className="muted mt-2">{t("home.pillars.tagline")}</p>
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