import { getT } from "@/i18n/server";
import NoticeList from "@/components/NoticeList";

export default async function AnnouncementsPage() {
  const t = await getT();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold">{t("pages.announcements.title")}</h1>
      <p className="muted mt-2">{t("pages.announcements.subtitle")}</p>
      <div className="mt-8">
        <NoticeList />
      </div>
    </main>
  );
}
