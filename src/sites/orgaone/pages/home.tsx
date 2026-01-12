import Link from "next/link";
import { getRequestLocale } from "@/lib/locale";
import { t } from "@/i18n/shared";

export default async function OrgaOneHome() {
  const locale = await getRequestLocale();
  const base = locale === "en" ? "" : `/${locale}`;

  return (
    <main className="container py-12">
      <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] px-3 py-1 text-xs font-semibold opacity-80">
        OrgaOne
      </div>

      <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
        {t(locale, "orgaone.home.title")}
      </h1>

      <p className="muted mt-3 max-w-2xl text-base md:text-lg leading-relaxed">
        {t(locale, "orgaone.home.subtitle")}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="btn btn-primary" href={`${base}/support`}>
          {t(locale, "nav.support")}
        </Link>
        <Link className="btn" href={`${base}/contact`}>
          {t(locale, "nav.contact")}
        </Link>
      </div>
    </main>
  );
}