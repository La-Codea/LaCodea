import { getT } from "@/i18n/server";
import FeedbackForm from "@/components/FeedbackForm";

export default async function FeedbackPage() {
  const t = await getT();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold">{t("pages.feedback.title")}</h1>
      <p className="muted mt-2">{t("pages.feedback.subtitle")}</p>

      <div className="mt-8 card p-6">
        <FeedbackForm />
      </div>
    </main>
  );
}
