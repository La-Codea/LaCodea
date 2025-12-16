"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import MobileMenu from "@/components/MobileMenu";
import LanguageToggle from "@/components/LanguageToggle";
import { getLocaleFromPath } from "@/i18n/client";

type NavItem = { href: string; label: string };

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  const nav: NavItem[] =
    locale === "de"
      ? [
          { href: "/de", label: "Start" },
          { href: "/de/apps", label: "Apps" },
          { href: "/de/announcements", label: "Mitteilungen" },
          { href: "/de/support", label: "Support" },
          { href: "/de/feedback", label: "Feedback" },
          { href: "/de/kontakt", label: "Kontakt" },
        ]
      : [
          { href: "/", label: "Home" },
          { href: "/apps", label: "Apps" },
          { href: "/announcements", label: "Announcements" },
          { href: "/support", label: "Support" },
          { href: "/feedback", label: "Feedback" },
          { href: "/kontakt", label: "Contact" },
        ];

  const homeHref = locale === "de" ? "/de" : "/";
  const appsHref = locale === "de" ? "/de/apps" : "/apps";

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/de") return pathname === "/de";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="navbar-shell" aria-label="Site navigation">
      <div className="navbar-floating">
        <div className="navbar-inner">
          <Link
            href={homeHref}
            className="flex items-center gap-3 font-semibold tracking-tight"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] shadow-sm">
              <span className="text-xs font-black">LC</span>
            </span>
            <span className="text-[15px] md:text-[16px]">LaCodea</span>
          </Link>

          <nav className="navbar-links">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-pill ${active ? "nav-pill-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="nav-actions">
            <LanguageToggle />
            <ThemeToggle />

            <Link href={appsHref} className="btn btn-primary hidden sm:inline-flex">
              {locale === "de" ? "Apps ansehen" : "Explore Apps"}
            </Link>

            <MobileMenu nav={nav} />
          </div>
        </div>
      </div>
    </header>
  );
}
