import { t, type Locale } from "@/i18n";
import ContactForm from "@/components/ContactForm";

export default function ContactPage({ locale }: { locale: Locale }) {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold tracking-tight">{t(locale, "pages.contact.title")}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t(locale, "pages.contact.subtitle")}</p>

      <section className="mt-10 rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">{t(locale, "pages.contact.formTitle")}</h2>
        <div className="mt-4">
          <ContactForm locale={locale} />
        </div>
      </section>
    </main>
  );
}
