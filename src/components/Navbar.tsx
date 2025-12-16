"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import MobileMenu from "@/components/MobileMenu";
import { getLocaleFromPathname, t } from "@/lib/translations";

type NavItem = { href: string; label: string };

function withLocale(pathname: string, href: string) {
  const locale = getLocaleFromPathname(pathname);
  if (locale === "en") return href;
  // avoid double prefix
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const nav: NavItem[] = [
    { href: "/", label: t(locale, "nav.home") },
    { href: "/apps", label: t(locale, "nav.apps") },
    { href: "/announcements", label: t(locale, "nav.announcements") },
    { href: "/support", label: t(locale, "nav.support") },
    { href: "/feedback", label: t(locale, "nav.feedback") },
    { href: "/contact", label: t(locale, "nav.contact") },
  ].map((item) => ({
    ...item,
    href: withLocale(pathname, item.href),
  }));

  return (
    <div className="navbar-shell">
      <header className="navbar-floating">
        <div className="navbar-inner">
          <Link
            href={withLocale(pathname, "/")}
            className="font-semibold tracking-tight"
            aria-label="LaCodea Home"
          >
            LaCodea
          </Link>

          <nav className="navbar-links">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="navlink">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <LanguageToggle />
            <ThemeToggle />
            <MobileMenu nav={nav} />
          </div>
        </div>
      </header>
    </div>
  );
}
