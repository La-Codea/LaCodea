export type Locale = "en" | "de" | "fr";
export const SUPPORTED_LOCALES: Locale[] = ["en", "de", "fr"];

export function normalizeLocale(v: string | null | undefined): Locale {
  if (v === "de" || v === "fr" || v === "en") return v;
  return "en";
}

export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  return normalizeLocale(seg);
}

export function switchLocale(pathname: string, to: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  const current = normalizeLocale(parts[0]);
  const rest = (current === "en" ? parts : parts.slice(1)).join("/");
  if (to === "en") return "/" + rest;
  return "/" + [to, rest].filter(Boolean).join("/");
}
