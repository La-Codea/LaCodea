// src/app/simpletime/page.tsx
import Link from "next/link";
import { getRequestLocale } from "@/lib/locale";
import { t, type Locale } from "@/i18n/shared";
import { sanityClient } from "@/lib/sanityClient";

type SimpleTimeApp = {
  appStoreUrl?: string;
};

const SIMPLETIME_QUERY = `*[_type == "app" && slug.current == $slug][0]{ appStoreUrl }`;

function Feature({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] shadow-sm">
          <span className="text-lg" aria-hidden>
            {icon}
          </span>
        </div>
        <div>
          <div className="font-semibold">{title}</div>
          <p className="muted mt-1 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] px-3 py-1 text-xs font-semibold">
      {children}
    </span>
  );
}

export default async function SimpletimeLanding() {
  const locale = (await getRequestLocale()) as Locale;
  const base = locale === "en" ? "" : `/${locale}`;

  const app = await sanityClient.fetch<SimpleTimeApp>(SIMPLETIME_QUERY, {
    slug: "simpletime",
  });

  const appStoreUrl = app?.appStoreUrl || "https://apps.apple.com/";

  const whyRows = [
    { k: t(locale, "simpletime.home.why.row1.k"), v: t(locale, "simpletime.home.why.row1.v") },
    { k: t(locale, "simpletime.home.why.row2.k"), v: t(locale, "simpletime.home.why.row2.v") },
    { k: t(locale, "simpletime.home.why.row3.k"), v: t(locale, "simpletime.home.why.row3.v") },
  ];

  return (
    <main className="container py-12 md:py-16">
      {/* Hero */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Pill>⏱️ {t(locale, "simpletime.home.pills.timeTracking")}</Pill>
            <Pill>🧠 {t(locale, "simpletime.home.pills.focus")}</Pill>
            <Pill>🔒 {t(locale, "simpletime.home.pills.privacy")}</Pill>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            {t(locale, "simpletime.home.hero.title")}
            <span className="block text-[15px] font-semibold tracking-normal opacity-70 md:text-base">
              {t(locale, "simpletime.home.hero.subtitle")}
            </span>
          </h1>

          <p className="muted mt-4 max-w-xl text-lg leading-relaxed">
            {t(locale, "simpletime.home.hero.lead")}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-primary" href="#download">
              {t(locale, "simpletime.home.hero.ctaPrimary")}
            </a>
            <Link className="btn" href={`${base}/privacy`}>
              {t(locale, "simpletime.home.hero.ctaPrivacy")}
            </Link>
            <Link className="btn" href={`${base}/support`}>
              {t(locale, "simpletime.home.hero.ctaSupport")}
            </Link>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="card p-4">
              <div className="text-2xl font-semibold">
                {t(locale, "simpletime.home.stats.offline.title")}
              </div>
              <div className="muted text-sm">
                {t(locale, "simpletime.home.stats.offline.desc")}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-2xl font-semibold">
                {t(locale, "simpletime.home.stats.icloud.title")}
              </div>
              <div className="muted text-sm">
                {t(locale, "simpletime.home.stats.icloud.desc")}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-2xl font-semibold">
                {t(locale, "simpletime.home.stats.fast.title")}
              </div>
              <div className="muted text-sm">
                {t(locale, "simpletime.home.stats.fast.desc")}
              </div>
            </div>
          </div>
        </div>

        {/* Hero card */}
        <div className="card p-6 md:p-7">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">
              {t(locale, "simpletime.home.preview.headerLeft")}
            </div>
            <div className="muted text-sm">
              {t(locale, "simpletime.home.preview.headerRight")}
            </div>
          </div>

          <div className="hr my-5" />

          <div className="grid gap-3">
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {t(locale, "simpletime.home.preview.item1.title")}
                </div>
                <span className="muted text-sm">
                  {t(locale, "simpletime.home.preview.item1.time")}
                </span>
              </div>
              <p className="muted mt-1 text-sm">
                {t(locale, "simpletime.home.preview.item1.desc")}
              </p>
            </div>

            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {t(locale, "simpletime.home.preview.item2.title")}
                </div>
                <span className="muted text-sm">
                  {t(locale, "simpletime.home.preview.item2.time")}
                </span>
              </div>
              <p className="muted mt-1 text-sm">
                {t(locale, "simpletime.home.preview.item2.desc")}
              </p>
            </div>

            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {t(locale, "simpletime.home.preview.item3.title")}
                </div>
                <span className="muted text-sm">
                  {t(locale, "simpletime.home.preview.item3.time")}
                </span>
              </div>
              <p className="muted mt-1 text-sm">
                {t(locale, "simpletime.home.preview.item3.desc")}
              </p>
            </div>
          </div>

          <div className="hr my-6" />

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-[rgb(var(--card))] px-3 py-1 text-xs font-semibold">
              ✓ {t(locale, "simpletime.home.preview.check1")}
            </span>
            <span className="inline-flex items-center rounded-full bg-[rgb(var(--card))] px-3 py-1 text-xs font-semibold">
              ✓ {t(locale, "simpletime.home.preview.check2")}
            </span>
            <span className="inline-flex items-center rounded-full bg-[rgb(var(--card))] px-3 py-1 text-xs font-semibold">
              ✓ {t(locale, "simpletime.home.preview.check3")}
            </span>
            <span className="inline-flex items-center rounded-full bg-[rgb(var(--card))] px-3 py-1 text-xs font-semibold">
              ✓ {t(locale, "simpletime.home.preview.check4")}
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mt-12 md:mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t(locale, "simpletime.home.features.title")}
        </h2>
        <p className="muted mt-2 max-w-2xl">
          {t(locale, "simpletime.home.features.subtitle")}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon="🗂️"
            title={t(locale, "simpletime.home.features.f1.title")}
            desc={t(locale, "simpletime.home.features.f1.desc")}
          />
          <Feature
            icon="📝"
            title={t(locale, "simpletime.home.features.f2.title")}
            desc={t(locale, "simpletime.home.features.f2.desc")}
          />
          <Feature
            icon="🔐"
            title={t(locale, "simpletime.home.features.f3.title")}
            desc={t(locale, "simpletime.home.features.f3.desc")}
          />
        </div>
      </section>

      {/* Why */}
      <section className="mt-12 md:mt-16 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="card p-6">
          <h3 className="text-xl font-semibold">{t(locale, "simpletime.home.why.title")}</h3>
          <p className="muted mt-2 leading-relaxed">{t(locale, "simpletime.home.why.body")}</p>

          <div className="mt-5 grid gap-3">
            {whyRows.map((row) => (
              <div key={row.k} className="card p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{row.k}</div>
                  <div className="muted text-sm">{row.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-semibold">{t(locale, "simpletime.home.faq.title")}</h3>
          <div className="mt-4 space-y-3">
            <details className="card p-4">
              <summary className="cursor-pointer font-medium">
                {t(locale, "simpletime.home.faq.q1.q")}
              </summary>
              <p className="muted mt-2 text-sm leading-relaxed">
                {t(locale, "simpletime.home.faq.q1.a")}
              </p>
            </details>

            <details className="card p-4">
              <summary className="cursor-pointer font-medium">
                {t(locale, "simpletime.home.faq.q2.q")}
              </summary>
              <p className="muted mt-2 text-sm leading-relaxed">
                {t(locale, "simpletime.home.faq.q2.a")}
              </p>
            </details>

            <details className="card p-4">
              <summary className="cursor-pointer font-medium">
                {t(locale, "simpletime.home.faq.q3.q")}
              </summary>
              <p className="muted mt-2 text-sm leading-relaxed">
                {t(locale, "simpletime.home.faq.q3.a")}
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="download" className="mt-12 md:mt-16">
        <div className="card p-7 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                {t(locale, "simpletime.home.cta.title")}
              </h3>
              <p className="muted mt-2 max-w-2xl">
                {t(locale, "simpletime.home.cta.body")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a className="btn btn-primary" href={appStoreUrl} target="_blank" rel="noreferrer">
                {t(locale, "simpletime.home.cta.appStore")}
              </a>
              <Link className="btn" href={`${base}/support`}>
                {t(locale, "simpletime.home.cta.support")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}