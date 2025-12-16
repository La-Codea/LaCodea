import { Locale, SUPPORTED_LOCALES } from "@/lib/i18n/shared";

export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  if (seg === "de" || seg === "fr" || seg === "en") return seg as Locale;
  return "en";
}

// EN = ohne Prefix, DE/FR = /de/... /fr/...
export function switchLocale(pathname: string, next: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0]?.toLowerCase();

  // strip existing locale prefix
  if (first === "de" || first === "fr" || first === "en") parts.shift();

  const rest = "/" + parts.join("/");

  if (next === "en") return rest === "/" ? "/" : rest;
  return `/${next}${rest === "/" ? "" : rest}`;
}

export { SUPPORTED_LOCALES };
