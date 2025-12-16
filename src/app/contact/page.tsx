import { getT } from "@/i18n/server";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage() {
    const __i18n = await getT();
  const t = typeof __i18n === "function" ? __i18n : __i18n.t;
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold">{t("pages.contact.title")}</h1>
      <p className="muted mt-2">{t("pages.contact.subtitle")}</p>

      <div className="mt-8 card p-6">
        <ContactForm />
      </div>
    </main>
  );
}
