// src/app/announcements/page.tsx
import { getT } from "@/i18n/server";
import { getRequestLocale } from "@/lib/locale";
import AnnouncementList from "@/components/AnnouncementList";

export default async function AnnouncementsPage() {
  const locale = await getRequestLocale();
  const __i18n = await getT();
  const t = typeof __i18n === "function" ? __i18n : __i18n.t;

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold">{t("pages.announcements.title")}</h1>
      <p className="muted mt-2">{t("pages.announcements.subtitle")}</p>
      <div className="mt-8">
        <AnnouncementList locale={locale} />
      </div>
    </main>
  );
}