import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.ROOT_DOMAIN ?? "lacodea.com";
const LOCALES = new Set(["en", "de", "fr"]);
const LOCALE_COOKIE = "lacodea_locale";
const SET_PARAM = "__setLocale";

function getSubdomainFromHost(hostname: string) {
  if (hostname.endsWith(".localhost")) return hostname.replace(".localhost", "");
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) return hostname.replace(`.${ROOT_DOMAIN}`, "");
  return null;
}

function stripLocalePrefix(pathname: string): string {
  const segs = pathname.split("/").filter(Boolean);
  const first = segs[0];
  if (first && LOCALES.has(first)) {
    const rest = "/" + segs.slice(1).join("/");
    return rest === "/" ? "/" : rest;
  }
  return pathname || "/";
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // ignore Next internals + APIs
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap")
  ) {
    return NextResponse.next();
  }

  // --- 1) Locale switch via query param
  const forced = url.searchParams.get(SET_PARAM);
  if (forced === "en" || forced === "de" || forced === "fr") {
    const base = stripLocalePrefix(pathname);
    const targetUrl = req.nextUrl.clone();
    targetUrl.searchParams.delete(SET_PARAM);

    if (forced === "en") {
      targetUrl.pathname = base; // no prefix for EN
      const res = NextResponse.redirect(targetUrl);
      res.cookies.set(LOCALE_COOKIE, "", { path: "/", maxAge: 0 });
      return res;
    }

    targetUrl.pathname = `/${forced}${base === "/" ? "" : base}`;
    const res = NextResponse.redirect(targetUrl);
    res.cookies.set(LOCALE_COOKIE, forced, { path: "/", sameSite: "lax" });
    return res;
  }

  // --- 2) Determine locale from URL prefix or sticky cookie
  const segs = pathname.split("/").filter(Boolean);
  const first = segs[0];

  let locale: "en" | "de" | "fr" = "en";
  let hasPrefix = false;

  if (first && LOCALES.has(first)) {
    locale = first as "en" | "de" | "fr";
    hasPrefix = true;

    // optional: /en/... -> redirect to /...
    if (locale === "en") {
      const rest = "/" + segs.slice(1).join("/");
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = rest === "/" ? "/" : rest;
      const res = NextResponse.redirect(redirectUrl);
      res.cookies.set(LOCALE_COOKIE, "", { path: "/", maxAge: 0 });
      return res;
    }
  } else {
    const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
    if (cookieLocale === "de" || cookieLocale === "fr") {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = `/${cookieLocale}${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(redirectUrl);
    }
  }

  // --- 3) Determine subdomain (site/app)
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const sub = getSubdomainFromHost(host);

  const isSimpletime = sub === "simpletime";

  // appSlug: only for app-specific rewrites (exclude simpletime)
  const appSlug =
    sub && sub !== "www" && sub !== "localhost" && sub !== "simpletime" ? sub : null;

  // siteSlug: for theming/layout decisions (simpletime counts!)
  const siteSlug = isSimpletime ? "simpletime" : appSlug;

  // --- 4) Prepare request headers for Server Components
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", locale);
  if (siteSlug) requestHeaders.set("x-app-slug", siteSlug);

  // --- 5) Internal routing: strip /de or /fr prefix (keep visible URL)
  if (hasPrefix && locale !== "en") {
    const rest = "/" + segs.slice(1).join("/");
    url.pathname = rest === "/" ? "/" : rest;
  }

  // --- 6) simpletime subdomain: rewrite "/" -> "/simpletime"
  if (isSimpletime && url.pathname === "/") {
    url.pathname = "/simpletime";
    const res = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    if (locale !== "en") res.cookies.set(LOCALE_COOKIE, locale, { path: "/", sameSite: "lax" });
    else res.cookies.set(LOCALE_COOKIE, "", { path: "/", maxAge: 0 });
    return res;
  }

  // --- 7) app subdomain: /support -> /support/<appSlug>
  if (appSlug && url.pathname === "/support") {
    url.pathname = `/support/${appSlug}`;
    const res = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    if (locale !== "en") res.cookies.set(LOCALE_COOKIE, locale, { path: "/", sameSite: "lax" });
    else res.cookies.set(LOCALE_COOKIE, "", { path: "/", maxAge: 0 });
    return res;
  }

  // --- 8) de/fr prefixed URLs: rewrite + set cookie
  if (hasPrefix && locale !== "en") {
    const res = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    res.cookies.set(LOCALE_COOKIE, locale, { path: "/", sameSite: "lax" });
    return res;
  }

  // --- 9) Default
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.cookies.set(LOCALE_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};