import { headers } from "next/headers";

export async function getRequestAppSlug(): Promise<string | null> {
  const h = await headers();
  return h.get("x-app-slug");
}

export async function getRequestSite(): Promise<string | null> {
  const h = await headers();
  return h.get("x-site");
}