// src/lib/getApps.ts
import { sanityClient } from "@/lib/sanityClient";
import type { Locale } from "@/i18n/client";
import { appsQuery } from "@/lib/queries";

type I18nText = Partial<Record<Locale, string>> & {
  // optional legacy safety falls Sanity noch en/de/fr-only liefert
  en?: string;
  de?: string;
  fr?: string;
};

export type AppItem = {
  _id: string;
  name: string;
  slug: string;
  sortOrder?: number;
  description?: I18nText;
  shortDescription?: string; // legacy fallback
  appStoreUrl?: string;
  icon?: any;
};

export async function getApps(): Promise<AppItem[]> {
  return await sanityClient.fetch<AppItem[]>(appsQuery);
}

export function getAppDescription(app: AppItem, locale: Locale) {
  const d = app.description;
  const localized =
    (d && (d[locale] || d.en || d.de || d.fr || d.es || d.it || d.ru || d.hy)) ||
    app.shortDescription ||
    "";
  return localized;
}