import { sanityClient } from "@/lib/sanityClient";

export type AppItem = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  websiteUrl?: string;
  appStoreUrl?: string;
};

const APPS_QUERY = `*[_type == "app"] | order(name asc){
  _id,
  name,
  "slug": slug.current,
  tagline,
  websiteUrl,
  appStoreUrl
}`;

export async function getApps(): Promise<AppItem[]> {
  return await sanityClient.fetch<AppItem[]>(APPS_QUERY);
}
