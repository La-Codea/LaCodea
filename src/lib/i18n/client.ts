import type { Locale } from "./shared";
import { normalizeLocale } from "./shared";

export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  return normalizeLocale(seg);
}

export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];
  if (first === "de" || first === "fr") {
    const rest = "/" + parts.slice(1).join("/");
    return rest === "/" ? "/" : rest;
  }
  return pathname || "/";
}

export function withLocale(locale: Locale, path: string): string {
  // English = no prefix
  if (locale === "en") return path === "" ? "/" : path;
  if (path === "/" || path === "") return `/${locale}`;
  return `/${locale}${path}`;
}

export function switchLocale(currentPath: string, nextLocale: Locale): string {
  const base = stripLocalePrefix(currentPath);
  return withLocale(nextLocale, base);
}
