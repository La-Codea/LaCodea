import { t, type Locale } from "@/i18n";

export type FAQ = { q: string; a: string };

type Props = {
  locale?: Locale;
  faqs?: FAQ[];
};

function defaultFaqs(locale: Locale): FAQ[] {
  // Wenn Keys fehlen, zeigt t() den Key selbst -> build bleibt trotzdem sauber.
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
          <div className="font-semibold">{it.q}</div>
          <div className="muted mt-2">{it.a}</div>
        </div>
      ))}
    </div>
  );
}
