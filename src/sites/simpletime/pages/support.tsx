// src/sites/simpletime/pages/support.tsx
import { getRequestLocale } from "@/lib/locale";
import { t } from "@/i18n/shared";
import SupportForm from "@/components/SupportForm";
import { sanityClient } from "@/lib/sanityClient";
import { faqsForAppQuery } from "@/lib/queries";

type FAQ = {
  _id: string;
  question: string;
  answerText?: string;
};

export default async function SimpleTimeSupport() {
  const locale = await getRequestLocale();

  const faqs: FAQ[] = await sanityClient.fetch(faqsForAppQuery, {
    appSlug: "simpletime",
  });

  return (
    <main className="container py-10 md:py-14">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] px-3 py-1 text-xs font-semibold opacity-80">
          SimpleTime · Support
        </div>

        <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
          {t(locale, "simpletime.support.title")}
        </h1>

        <p className="muted mt-3 max-w-2xl text-base md:text-lg leading-relaxed">
          {t(locale, "simpletime.support.subtitle")}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        {/* FAQ */}
        <section className="card p-6 md:p-7">
          <h2 className="text-lg md:text-xl font-semibold tracking-tight">
            {t(locale, "simpletime.support.faqTitle")}
          </h2>

          <div className="mt-4 space-y-3">
            {faqs.map((f) => (
              <details key={f._id} className="card p-4">
                <summary className="cursor-pointer font-medium">{f.question}</summary>
                {f.answerText && (
                  <p className="muted mt-2 text-sm leading-relaxed whitespace-pre-wrap">
                    {f.answerText}
                  </p>
                )}
              </details>
            ))}

            {faqs.length === 0 && (
              <p className="muted text-sm">
                {t(locale, "simpletime.support.noFaq")}
              </p>
            )}
          </div>
        </section>

        {/* Form */}
        <section className="card p-6 md:p-7">
          <h2 className="text-lg md:text-xl font-semibold tracking-tight">
            {t(locale, "simpletime.support.formTitle")}
          </h2>

          <div className="mt-4">
            <SupportForm locale={locale} app="simpletime" />
          </div>
        </section>
      </div>
    </main>
  );
}