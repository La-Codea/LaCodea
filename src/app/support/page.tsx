import { getT } from "@/i18n/server";
import SupportForm from "@/components/SupportForm";
import FaqList from "@/components/FaqList";

export default async function SupportPage() {
  const t = await getT();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold">{t("pages.support.title")}</h1>
      <p className="muted mt-2">{t("pages.support.subtitle")}</p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-semibold">FAQ</h2>
          <div className="mt-4">
            <FaqList />
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold">Form</h2>
          <div className="mt-4">
            <SupportForm />
          </div>
        </div>
      </div>
    </main>
  );
}
