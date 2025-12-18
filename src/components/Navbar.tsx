"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import MobileMenu from "@/components/MobileMenu";
import LanguageToggle from "@/components/LanguageToggle";
import { getLocaleFromPath } from "@/i18n/client";
import { t } from "@/i18n";
import type { SiteConfig } from "@/site/config";

export default function Navbar({ site }: { site: SiteConfig }) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const prefix = locale === "en" ? "" : `/${locale}`;

  const navAll = [
    { href: `${prefix}/`, key: "nav.home" },
    { href: `${prefix}/apps`, key: "nav.apps", gate: "apps" as const },
    { href: `${prefix}/announcements`, key: "nav.announcements", gate: "announcements" as const },
    { href: `${prefix}/support`, key: "nav.support" },
    { href: `${prefix}/feedback`, key: "nav.feedback" },
    { href: `${prefix}/contact`, key: "nav.contact" },
  ];

  const nav = navAll.filter((i) => {
    if (i.gate === "apps") return site.nav.showApps;
    if (i.gate === "announcements") return site.nav.showAnnouncements;
    return true;
  });

  const homeHref = `${prefix}/` as const;

  function normalizePath(p: string) {
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
              <span className="text-xs font-black">{site.key === "simpletime" ? "ST" : "LC"}</span>
            </span>
            <span className="text-[15px] md:text-[16px]">{site.name}</span>
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