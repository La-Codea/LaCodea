// src/sites/simpletime/pages/support.tsx
import Link from "next/link";
import { getRequestLocale } from "@/lib/locale";
import type { Locale } from "@/lib/locale";
import { t } from "@/i18n/shared";
import { sanityClient } from "@/lib/sanityClient";
import { faqsForAppQuery } from "@/lib/queries";

type I18nText = Partial<Record<Locale, string>>;
type MaybeI18n = string | I18nText;

type FAQ = {
  _id: string;
  question: MaybeI18n;
  answerText?: MaybeI18n;
};

function pickI18n(v: MaybeI18n | undefined, locale: Locale) {
  if (!v) return "";
  if (typeof v === "string") return v;

  // `v` kommt aus Sanity und kann je nach Schema Keys enthalten/nicht enthalten.
  // Deshalb: erst den aktuellen Locale versuchen, dann in definierter Reihenfolge fallbacken.
  const r = v as Partial<Record<string, string>>;
  return (
    r[locale] ||
    r.en ||
    r.de ||
    r.fr ||
    r.es ||
    r.it ||
    r.ru ||
    r.hy ||
    ""
  );
}

export default async function SimpleTimeSupport() {
  const locale = await getRequestLocale();
  const base = locale === "en" ? "" : `/${locale}`;

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

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        {/* FAQ */}
        <section className="card p-6 md:p-7 lg:col-span-2">
          <h2 className="text-lg md:text-xl font-semibold tracking-tight">
            {t(locale, "simpletime.support.faqTitle")}
          </h2>

          <div className="mt-4 space-y-3">
            {faqs.map((f) => (
              <details key={f._id} className="card p-4">
                <summary className="cursor-pointer font-medium">
                  {pickI18n(f.question, locale)}
                </summary>
                {f.answerText && (
                  <p className="muted mt-2 text-sm leading-relaxed whitespace-pre-wrap">
                    {pickI18n(f.answerText, locale)}
                  </p>
                )}
              </details>
            ))}

            {faqs.length === 0 && (
              <p className="muted text-sm">{t(locale, "simpletime.support.noFaq")}</p>
            )}
          </div>
        </section>

        {/* Kontakt CTA */}
        <aside className="card p-6 md:p-7">
          <h2 className="text-lg md:text-xl font-semibold tracking-tight">
            {t(locale, "simpletime.support.contactTitle")}
          </h2>

          <p className="muted mt-2 text-sm leading-relaxed">
            {t(locale, "simpletime.support.contactBody")}
          </p>

          <div className="mt-4">
            <Link className="btn btn-primary w-fit" href={`${base}/contact`}>
              {t(locale, "simpletime.support.contactCta")}
            </Link>
          </div>

          <div className="hr my-5" />

          <div className="muted text-xs">
            {t(locale, "simpletime.support.contactHint")}
          </div>
        </aside>
      </div>
    </main>
  );
}