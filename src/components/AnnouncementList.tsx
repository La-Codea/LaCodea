// src/components/AnnouncementList.tsx
import { sanityClient } from "@/lib/sanityClient";
import { announcementsQuery, announcementsForAppQuery } from "@/lib/queries";
import type { Locale } from "@/i18n";

type LocalizedString = Partial<Record<Locale, string>>;

type Announcement = {
  _id: string;
  title: LocalizedString;
  body?: LocalizedString;
  publishedAt?: string;
  category?: {
    type: "general" | "app";
    app?: { slug?: string; name: string };
  };
};

function formatDate(iso?: string, locale: Locale = "en") {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(
      locale === "de" ? "de-DE" : locale === "fr" ? "fr-FR" : "en-US",
      { year: "numeric", month: "short", day: "2-digit" }
    );
  } catch {
    return "";
  }
}

function pickLocale(v: LocalizedString | undefined, locale: Locale): string | undefined {
  return v?.[locale] ?? v?.en ?? v?.de ?? v?.fr;
}

export default async function AnnouncementList({
  appSlug,
  locale = "en",
}: {
  appSlug?: string;
  locale?: Locale;
}) {
  const query = appSlug ? announcementsForAppQuery : announcementsQuery;

  const announcements: Announcement[] = await sanityClient.fetch(query, {
    appSlug: appSlug ?? null,
  });

  return (
    <div className="grid gap-4">
      {announcements.map((a) => (
        <article key={a._id} className="card p-6">
          <div className="muted text-sm flex flex-wrap items-center gap-2">
            {a.publishedAt ? <span>{formatDate(a.publishedAt, locale)}</span> : null}

            {a.category?.type === "app" && a.category.app ? (
              <>
                <span>•</span>
                <span>{a.category.app.name}</span>
              </>
            ) : null}

            {a.category?.type === "general" ? (
              <>
                <span>•</span>
                <span>{locale === "de" ? "Allgemein" : locale === "fr" ? "Général" : "General"}</span>
              </>
            ) : null}
          </div>

          <h2 className="mt-2 text-xl font-semibold">
            {pickLocale(a.title, locale) ?? ""}
          </h2>

          {pickLocale(a.body, locale) ? (
            <p className="mt-2 opacity-80 whitespace-pre-wrap">
              {pickLocale(a.body, locale)}
            </p>
          ) : null}
        </article>
      ))}

      {announcements.length === 0 ? (
        <p className="muted">
          {locale === "de"
            ? "Noch keine Mitteilungen."
            : locale === "fr"
            ? "Aucune annonce pour le moment."
            : "No announcements yet."}
        </p>
      ) : null}
    </div>
  );
}