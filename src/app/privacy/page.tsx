import Link from "next/link";
import { getT } from "@/i18n/server";

export default async function PrivacyPage() {
    const __i18n = await getT();
  const t = typeof __i18n === "function" ? __i18n : __i18n.t;
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold">{t("pages.privacy.title")}</h1>
      <p className="muted mt-2">{t("pages.privacy.subtitle")}</p>

      <div className="mt-8 card p-6">
        <p className="muted">{t("pages.privacy.chooseApp")}:</p>
        <div className="mt-4 flex flex-col gap-2">
          <Link className="btn w-fit" href="/privacy/simpletime">SimpleTime</Link>
        </div>
      </div>
    </main>
  );
}
