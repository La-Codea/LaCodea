// src/site/resolve.ts
import { headers } from "next/headers";
import { getSiteConfig, type SiteConfig } from "@/site/config";

/**
 * Resolves which "site" is currently being requested (hub vs simpletime, etc.)
 * via middleware-injected headers.
 */
export async function resolveSite(): Promise<SiteConfig> {
  const h = await headers();

  // we use x-site if set, otherwise fall back to x-app-slug (your existing convention)
  const siteKey = h.get("x-site") ?? h.get("x-app-slug");
  return getSiteConfig(siteKey);
}