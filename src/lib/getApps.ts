// src/lib/getApps.ts
import { sanityClient } from "@/lib/sanityClient";
import type { Locale } from "@/i18n/client";
import { appsQuery } from "@/lib/queries";

export type AppItem = {
  _id: string;
  name: string;
  slug: string;
  sortOrder?: number;
  description?: { en?: string; de?: string; fr?: string };
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
    (d && (d[locale] || d.en || d.de || d.fr)) ||
    app.shortDescription ||
    "";
  return localized;
}