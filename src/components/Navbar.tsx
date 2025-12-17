"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import MobileMenu from "@/components/MobileMenu";
import LanguageToggle from "@/components/LanguageToggle";
import { getLocaleFromPath } from "@/i18n/client";
import { t } from "@/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  // Prefix für alle nicht-en Sprachen: /de, /fr
  const prefix = locale === "en" ? "" : `/${locale}`;

  const nav = [
    { href: `${prefix}/`, key: "nav.home" },
    { href: `${prefix}/apps`, key: "nav.apps" },
    { href: `${prefix}/announcements`, key: "nav.announcements" },
    { href: `${prefix}/support`, key: "nav.support" },
    { href: `${prefix}/feedback`, key: "nav.feedback" },
    { href: `${prefix}/contact`, key: "nav.contact" },
  ];

  const homeHref = `${prefix}/` as const;
  const appsHref = `${prefix}/apps` as const;

  function normalizePath(p: string) {
    // "/" und "/de" etc. sollen gleichwertig mit "/de/" behandelt werden
    return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function isActive(href: string) {
    const a = normalizePath(pathname);
    const h = normalizePath(href);
    return a === h || a.startsWith(h + "/");
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="navbar-shell border-b border-[rgb(var(--card-border))] bg-[rgb(var(--bg))]/70 backdrop-blur">
        <div className="container flex items-center justify-between navbar-pad">
          <Link href={homeHref} className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] shadow-sm">
              <span className="text-xs font-black">LC</span>
            </span>
            <span className="text-[15px] md:text-[16px]">LaCodea</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`nav-pill ${active ? "nav-pill-active" : ""}`}
                >
                  {t(locale, item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link href={appsHref} className="btn btn-primary hidden sm:inline-flex">
              {t(locale, "cta.exploreApps")}
            </Link>
            <MobileMenu
              nav={nav.map((n) => ({
                href: n.href,
                label: t(locale, n.key),
              }))}
            />
          </div>
        </div>
      </div>
    </header>
  );
}