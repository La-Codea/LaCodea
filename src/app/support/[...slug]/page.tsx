// src/app/support/[...slug]/page.tsx
import { redirect } from "next/navigation";
import { getRequestLocale } from "@/lib/locale";

function getAppSupportHref(slug: string, locale: string) {
  const prefix = locale === "en" ? "" : `/${locale}`;

  if (process.env.NODE_ENV !== "production") {
    return `http://${slug}.localhost:3000${prefix}/support`;
  }

  const domain = process.env.ROOT_DOMAIN ?? "lacodea.com";
  return `https://${slug}.${domain}${prefix}/support`;
}

export default async function SupportCatchAll({
  params,
}: {
  params: { slug?: string[] };
}) {
  const locale = await getRequestLocale();
  const appSlug = (params?.slug?.[0] ?? "").trim();

  if (!appSlug) redirect("/support");

  redirect(getAppSupportHref(appSlug, locale));
}