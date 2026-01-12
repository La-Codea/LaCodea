import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.ROOT_DOMAIN ?? "lacodea.com";

// ✅ erweitert
const LOCALES = new Set(["en", "de", "fr", "es", "it", "ru", "hy"] as const);

const LOCALE_COOKIE = "lacodea_locale";
const SET_PARAM = "__setLocale";

type Locale = "en" | "de" | "fr" | "es" | "it" | "ru" | "hy";

function getCookieDomainFromHost(hostname: string) {
  // Dev: simpletime.localhost / orgaone.localhost etc.
  // IMPORTANT: Browsers reject `Domain=.localhost`.
  // So in dev we MUST NOT set the domain attribute at all.
  if (hostname === "localhost" || hostname.endsWith(".localhost")) return undefined;

  // Prod: share across subdomains -> ".lacodea.com" (or whatever ROOT_DOMAIN is)
  if (hostname === ROOT_DOMAIN || hostname.endsWith(`.${ROOT_DOMAIN}`)) return `.${ROOT_DOMAIN}`;

  return undefined;
}

function setLocaleCookie(res: NextResponse, locale: Locale | null, host: string) {
  const domain = getCookieDomainFromHost(host);

  if (!locale || locale === "en") {
    // Clear cookie for EN
    res.cookies.set(LOCALE_COOKIE, "", {
      path: "/",
      maxAge: 0,
      ...(domain ? { domain } : {}),
    });
    return;
  }

  res.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    sameSite: "lax",
    ...(domain ? { domain } : {}),
  });
}

function getSubdomainFromHost(hostname: string) {
  if (hostname.endsWith(".localhost")) return hostname.replace(".localhost", "");
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) return hostname.replace(`.${ROOT_DOMAIN}`, "");
  return null;
}

function stripLocalePrefix(pathname: string): string {
  const segs = pathname.split("/").filter(Boolean);
  const first = segs[0];
  if (first && LOCALES.has(first as any)) {
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
  if (
    forced === "en" ||
    forced === "de" ||
    forced === "fr" ||
    forced === "es" ||
    forced === "it" ||
    forced === "ru" ||
    forced === "hy"
  ) {
    const base = stripLocalePrefix(pathname);
    const targetUrl = req.nextUrl.clone();
    targetUrl.searchParams.delete(SET_PARAM);
    const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();

    if (forced === "en") {
      targetUrl.pathname = base; // no prefix for EN
      const res = NextResponse.redirect(targetUrl);
      setLocaleCookie(res, null, host);
      return res;
    }

    targetUrl.pathname = `/${forced}${base === "/" ? "" : base}`;
    const res = NextResponse.redirect(targetUrl);
    setLocaleCookie(res, forced as Locale, host);
    return res;
  }

  // --- 2) Determine locale from URL prefix or sticky cookie
  const segs = pathname.split("/").filter(Boolean);
  const first = segs[0];

  let locale: Locale = "en";
  let hasPrefix = false;

  if (first && LOCALES.has(first as any)) {
    locale = first as Locale;
    hasPrefix = true;

    // optional: /en/... -> redirect to /...
    if (locale === "en") {
      const rest = "/" + segs.slice(1).join("/");
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = rest === "/" ? "/" : rest;
      const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
      const res = NextResponse.redirect(redirectUrl);
      setLocaleCookie(res, null, host);
      return res;
    }
  } else {
    const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
    if (
      cookieLocale === "de" ||
      cookieLocale === "fr" ||
      cookieLocale === "es" ||
      cookieLocale === "it" ||
      cookieLocale === "ru" ||
      cookieLocale === "hy"
    ) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = `/${cookieLocale}${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(redirectUrl);
    }
  }

  // --- 3) Determine subdomain (site/app)
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const sub = getSubdomainFromHost(host);

  const isSimpletime = sub === "simpletime";
  const isOrgaone = sub === "orgaone";

// appSlug: only for app-specific rewrites (exclude simpletime/orgaone)
const appSlug =
  sub && sub !== "www" && sub !== "localhost" && sub !== "simpletime" && sub !== "orgaone"
    ? sub
    : null;

// siteSlug: for theming/layout decisions (simpletime/orgaone count!)
const siteSlug = isSimpletime ? "simpletime" : isOrgaone ? "orgaone" : appSlug;

  // --- 4) Prepare request headers for Server Components
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", locale);
  if (siteSlug) requestHeaders.set("x-app-slug", siteSlug);

  // --- 5) Internal routing: strip locale prefix (keep visible URL)
  if (hasPrefix && locale !== "en") {
    const rest = "/" + segs.slice(1).join("/");
    url.pathname = rest === "/" ? "/" : rest;
  }

  // --- 7) app subdomain: /support -> /support/<appSlug>
  if (appSlug && url.pathname === "/support") {
    url.pathname = `/support/${appSlug}`;
    const res = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    setLocaleCookie(res, locale, host);
    return res;
  }

  // --- 8) locale-prefixed URLs: rewrite + set cookie
  if (hasPrefix && locale !== "en") {
    const res = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    setLocaleCookie(res, locale, host);
    return res;
  }

  // --- 9) Default
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  setLocaleCookie(res, null, host);
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};