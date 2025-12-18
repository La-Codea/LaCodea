import { getT } from "@/i18n/server";
import { getRequestLocale } from "@/lib/locale";
import { getRequestAppSlug } from "@/site/server";
import AnnouncementList from "@/components/AnnouncementList";

export default async function AnnouncementsPage() {
  const locale = await getRequestLocale();
  const appSlug = await getRequestAppSlug(); // ✅ FIX: await
  const { t } = await getT();

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold">{t("pages.announcements.title")}</h1>
      <p className="muted mt-2">{t("pages.announcements.subtitle")}</p>

      <div className="mt-8">
        <AnnouncementList locale={locale} appSlug={appSlug ?? undefined} />
      </div>
    </main>
  );
}