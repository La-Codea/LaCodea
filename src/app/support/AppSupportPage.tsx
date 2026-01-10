import SupportForm from "@/components/SupportForm";
import { sanityClient } from "@/lib/sanity";
import { faqsForAppQuery } from "@/lib/queries";
import { getRequestLocale, type Locale } from "@/lib/locale";

type I18nText = Partial<Record<Locale, string>>;
type MaybeI18n = string | I18nText;

type FAQ = {
  _id: string;
  question?: MaybeI18n;
  answerText?: MaybeI18n;
};

function pickI18nText(v: MaybeI18n | undefined, locale: Locale) {
  if (!v) return "";
  if (typeof v === "string") return v;

  // Prefer current locale, then fall back to common ones.
  return (
    v[locale] ||
    v.en ||
    v.de ||
    v.fr ||
    v.es ||
    v.it ||
    v.ru ||
    v.hy ||
    ""
  );
}

export default async function AppSupportPage({
  appSlug,
}: {
  appSlug: string;
}) {
  const slug = String(appSlug ?? "").trim();
  const locale = await getRequestLocale();

  if (!slug) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold">Support</h1>
        <p className="mt-2 opacity-80">ERROR: appSlug prop is empty.</p>
      </div>
    );
  }

  const faqs: FAQ[] = await sanityClient.fetch(faqsForAppQuery, {
    appSlug: slug,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="mt-2 opacity-80">
        Support for: <b>{slug}</b>
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-4 space-y-4">
          {faqs.map((f) => (
            <details key={f._id} className="rounded-2xl border p-4">
              <summary className="cursor-pointer font-medium">
                {pickI18nText(f.question, locale)}
              </summary>

              {pickI18nText(f.answerText, locale) ? (
                <p className="mt-2 opacity-80 whitespace-pre-wrap">
                  {pickI18nText(f.answerText, locale)}
                </p>
              ) : null}
            </details>
          ))}

          {faqs.length === 0 && (
            <p className="opacity-70">
              No FAQ entries yet. (Add them in Sanity Studio under <b>FAQ</b>.)
            </p>
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Contact support</h2>
        <div className="mt-6">
          <SupportForm defaultApp={slug} locale={locale} />
        </div>
      </section>
    </div>
  );
}
