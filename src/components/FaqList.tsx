import { t, type Locale } from "@/i18n";

type I18nText = { en?: string; de?: string; fr?: string };
type MaybeI18n = string | I18nText;

export type FAQ = { q: MaybeI18n; a: MaybeI18n };

type Props = {
  locale?: Locale;
  faqs?: FAQ[];
};

function pickI18n(v: MaybeI18n, locale: Locale) {
  if (!v) return "";
  if (typeof v === "string") return v;
  return v[locale] || v.en || v.de || v.fr || "";
}

function defaultFaqs(locale: Locale): FAQ[] {
  return [
    { q: t(locale, "pages.support.faq.q1"), a: t(locale, "pages.support.faq.a1") },
    { q: t(locale, "pages.support.faq.q2"), a: t(locale, "pages.support.faq.a2") },
    { q: t(locale, "pages.support.faq.q3"), a: t(locale, "pages.support.faq.a3") },
  ];
}

export default function FaqList({ locale = "en", faqs }: Props) {
  const items = faqs?.length ? faqs : defaultFaqs(locale);

  return (
    <div className="grid gap-3">
      {items.map((it, idx) => (
        <div key={idx} className="card p-5">
          <div className="font-semibold">{pickI18n(it.q, locale)}</div>
          <div className="muted mt-2 whitespace-pre-wrap">{pickI18n(it.a, locale)}</div>
        </div>
      ))}
    </div>
  );
}