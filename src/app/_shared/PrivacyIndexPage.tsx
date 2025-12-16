import Link from "next/link";
import { t, type Locale } from "@/i18n";

export default function PrivacyIndexPage({ locale }: { locale: Locale }) {
  const base = locale === "en" ? "" : `/${locale}`;
  const updated = new Date().toISOString().slice(0, 10);

  const apps = [{ name: "SimpleTime", slug: "simpletime" }];

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold tracking-tight">{t(locale, "pages.privacy.title")}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t(locale, "pages.privacy.subtitle")}</p>

      <div className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
        {t(locale, "pages.privacy.updated")} {updated}
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="font-semibold">{t(locale, "pages.privacy.chooseApp")}</div>
        <div className="mt-4 flex flex-col gap-2">
          {apps.map((a) => (
            <Link key={a.slug} className="btn w-fit" href={`${base}/privacy/${a.slug}`}>
              {a.name}
            </Link>
          ))}
        </div>

        <div className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
          {t(locale, "pages.privacy.rights")}{" "}
          <a className="underline" href="mailto:contact@lacodea.com">
            contact@lacodea.com
          </a>
        </div>
      </div>
    </main>
  );
}
