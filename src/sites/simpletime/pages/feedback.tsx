// src/sites/simpletime/pages/feedback.tsx
import { getRequestLocale } from "@/lib/locale";
import { t } from "@/i18n/shared";
import FeedbackForm from "@/components/FeedbackForm";

export default async function SimpleTimeFeedback() {
  const locale = await getRequestLocale();

  return (
    <main className="container py-10 md:py-14">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] px-3 py-1 text-xs font-semibold opacity-80">
          SimpleTime · Feedback
        </div>

        <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
          {t(locale, "simpletime.feedback.title")}
        </h1>

        <p className="muted mt-3 max-w-2xl text-base md:text-lg leading-relaxed">
          {t(locale, "simpletime.feedback.subtitle")}
        </p>
      </header>

      <section className="card p-6 md:p-7 max-w-2xl">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight">
          {t(locale, "simpletime.feedback.formTitle")}
        </h2>

        <div className="mt-4">
          {/* ✅ App fix auf simpletime */}
          <FeedbackForm locale={locale} app="simpletime" />
        </div>
      </section>
    </main>
  );
}