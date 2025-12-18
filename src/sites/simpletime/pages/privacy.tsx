import { getRequestLocale } from "@/lib/locale";
import { t, v } from "@/i18n/shared";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card p-6 md:p-7">
      <h2 className="text-lg md:text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 text-[15px] leading-relaxed opacity-90">{children}</div>
    </section>
  );
}

export default async function SimpleTimePrivacy() {
  const locale = await getRequestLocale();

  const listVal = v(locale, "privacy.simpletime.section1.list");
  const list = Array.isArray(listVal) ? listVal : [];

  return (
    <main className="container py-10 md:py-14">
      {/* Header */}
      <div className="mb-8 md:mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] px-3 py-1 text-xs font-semibold opacity-80">
          SimpleTime · Privacy
        </div>

        <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
          {t(locale, "privacy.simpletime.title")}
        </h1>

        <p className="muted mt-3 max-w-2xl text-base md:text-lg leading-relaxed">
          {t(locale, "privacy.simpletime.intro")}
        </p>
      </div>

      {/* Content grid */}
      <div className="grid gap-4 md:gap-5">
        <Card title={t(locale, "privacy.simpletime.section1.title")}>
          <p>{t(locale, "privacy.simpletime.section1.intro")}</p>

          <ul className="mt-4 grid gap-2">
            {list.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[rgb(var(--fg))] opacity-70"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4">{t(locale, "privacy.simpletime.section1.outro")}</p>
        </Card>

        <Card title={t(locale, "privacy.simpletime.section2.title")}>
          <p>{t(locale, "privacy.simpletime.section2.body")}</p>
        </Card>

        <Card title={t(locale, "privacy.simpletime.section3.title")}>
          <p>{t(locale, "privacy.simpletime.section3.body")}</p>
        </Card>

        <Card title={t(locale, "privacy.simpletime.section4.title")}>
          <p>{t(locale, "privacy.simpletime.section4.body")}</p>
        </Card>

        {/* Contact callout */}
        <section className="card p-6 md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-lg font-semibold tracking-tight">
                {t(locale, "privacy.simpletime.section5.title")}
              </div>
              <div className="muted mt-1 text-sm leading-relaxed">
                {t(locale, "privacy.simpletime.section5.body")}
              </div>
            </div>

            <a
              href="mailto:simpletime@lacodea.com"
              className="btn btn-primary w-fit"
            >
              simpletime@lacodea.com
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}