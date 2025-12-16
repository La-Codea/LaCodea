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

  // 0) Explicit locale switch via query: ?__setLocale=en|de|fr
  const forced = url.searchParams.get(SET_PARAM);
  if (forced === "en" || forced === "de" || forced === "fr") {
    const base = stripLocalePrefix(pathname);

    // build target visible URL (no query param)
    const targetUrl = req.nextUrl.clone();
    targetUrl.searchParams.delete(SET_PARAM);

    if (forced === "en") {
      targetUrl.pathname = base; // no prefix for EN
      const res = NextResponse.redirect(targetUrl);
      res.cookies.set(LOCALE_COOKIE, "", { path: "/", maxAge: 0 });
      return res;
    } else {
      targetUrl.pathname = `/${forced}${base === "/" ? "" : base}`;
      const res = NextResponse.redirect(targetUrl);
      res.cookies.set(LOCALE_COOKIE, forced, { path: "/", sameSite: "lax" });
      return res;
    }
  }

  // Determine locale from URL prefix
  const segs = pathname.split("/").filter(Boolean);
  const first = segs[0];

  let locale: "en" | "de" | "fr" = "en";
  let hasPrefix = false;

  if (first && LOCALES.has(first)) {
    locale = first as any;
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
    // No prefix: follow sticky cookie (de/fr only)
    const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
    if (cookieLocale === "de" || cookieLocale === "fr") {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = `/${cookieLocale}${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Pass locale to Server Components
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", locale);

  // Internal routing: strip /de or /fr prefix
  if (hasPrefix && locale !== "en") {
    const rest = "/" + segs.slice(1).join("/");
    url.pathname = rest === "/" ? "/" : rest;
  }

  // Subdomain -> appSlug logic
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const sub = getSubdomainFromHost(host);
  const appSlug = sub && sub !== "www" && sub !== "localhost" ? sub : null;

  // Subdomain: /support -> /support/<appSlug>
  if (appSlug && url.pathname === "/support") {
    url.pathname = `/support/${appSlug}`;
    const res = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    if (locale !== "en") res.cookies.set(LOCALE_COOKIE, locale, { path: "/", sameSite: "lax" });
    else res.cookies.set(LOCALE_COOKIE, "", { path: "/", maxAge: 0 });
    return res;
  }

  // For de/fr prefixed URLs we must rewrite + set cookie
  if (hasPrefix && locale !== "en") {
    const res = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    res.cookies.set(LOCALE_COOKIE, locale, { path: "/", sameSite: "lax" });
    return res;
  }

  // Default
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  // keep cookie only for de/fr
  res.cookies.set(LOCALE_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
