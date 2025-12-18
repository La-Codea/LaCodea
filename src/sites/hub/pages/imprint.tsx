import { t, type Locale } from "@/i18n";

export default function ImprintPage({ locale }: { locale: Locale }) {
  const updated = new Date().toISOString().slice(0, 10);

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold tracking-tight">{t(locale, "pages.imprint.title")}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t(locale, "pages.imprint.subtitle")}</p>

      <div className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
        {t(locale, "pages.imprint.updated")} {updated}
      </div>

      <div className="mt-10 space-y-4 rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          <div className="font-semibold text-zinc-900 dark:text-zinc-100">LaCodea</div>
          <div>Berlin, Germany</div>
          <div>
            Email:{" "}
            <a className="underline" href="mailto:contact@lacodea.com">
              contact@lacodea.com
            </a>
          </div>
        </div>

        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          This is a template. Replace address/legal details with your real information.
        </div>
      </div>
    </main>
  );
}
