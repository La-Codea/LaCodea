import NoticeList from "@/components/NoticeList";
import { t, type Locale } from "@/i18n";

export default async function AnnouncementsPage({ locale }: { locale: Locale }) {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        {t(locale, "pages.announcements.title")}
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        {t(locale, "pages.announcements.subtitle")}
      </p>

      <div className="mt-8">
        <NoticeList locale={locale} />
      </div>
    </main>
  );
}
