import { getT } from "@/i18n/server";
import Link from "next/link";

export default async function SimpleTimeHome() {
  const __i18n = await getT();
  const t = typeof __i18n === "function" ? __i18n : __i18n.t;

  return (
    <main className="container py-12">
      <h1 className="text-4xl font-semibold tracking-tight">SimpleTime</h1>
      <p className="muted mt-4 text-lg">
        {t("home.pillars.tagline")}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/privacy" className="btn">
          {t("nav.support")}
        </Link>
        <Link href="/announcements" className="btn">
          {t("nav.announcements")}
        </Link>
      </div>
    </main>
  );
}