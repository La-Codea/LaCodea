import { t, type Locale } from "@/i18n";
import FaqList from "@/components/FaqList";
import SupportForm from "@/components/SupportForm";

export default function SupportPage({ locale }: { locale: Locale }) {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold tracking-tight">{t(locale, "pages.support.title")}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t(locale, "pages.support.subtitle")}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <h2 className="text-lg font-semibold">{t(locale, "pages.support.faqTitle")}</h2>
          <div className="mt-4">
            <FaqList locale={locale} />
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <h2 className="text-lg font-semibold">{t(locale, "pages.support.formTitle")}</h2>
          <div className="mt-4">
            <SupportForm locale={locale} />
          </div>
        </section>
      </div>
    </main>
  );
}
