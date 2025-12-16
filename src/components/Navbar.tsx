"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import MobileMenu from "@/components/MobileMenu";
import LanguageToggle from "@/components/LanguageToggle";

type Locale = "en" | "de" | "fr";

function getLocaleFromPathname(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg === "de" || seg === "fr") return seg;
  return "en";
}

function withLocale(locale: Locale, href: string) {
  if (locale === "en") return href; // English = ohne Prefix
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const nav =
    locale === "de"
      ? [
          { href: withLocale(locale, "/"), label: "Start" },
          { href: withLocale(locale, "/apps"), label: "Apps" },
          { href: withLocale(locale, "/announcements"), label: "Ankündigungen" },
          { href: withLocale(locale, "/support"), label: "Support" },
          { href: withLocale(locale, "/feedback"), label: "Feedback" },
          { href: withLocale(locale, "/contact"), label: "Kontakt" },
        ]
      : locale === "fr"
      ? [
          { href: withLocale(locale, "/"), label: "Accueil" },
          { href: withLocale(locale, "/apps"), label: "Apps" },
          { href: withLocale(locale, "/announcements"), label: "Annonces" },
          { href: withLocale(locale, "/support"), label: "Support" },
          { href: withLocale(locale, "/feedback"), label: "Avis" },
          { href: withLocale(locale, "/contact"), label: "Contact" },
        ]
      : [
          { href: "/", label: "Home" },
          { href: "/apps", label: "Apps" },
          { href: "/announcements", label: "Announcements" },
          { href: "/support", label: "Support" },
          { href: "/feedback", label: "Feedback" },
          { href: "/contact", label: "Contact" },
        ];

  const homeHref = withLocale(locale, "/");
  const appsHref = withLocale(locale, "/apps");

  function isActive(href: string) {
    // Exakt Home matchen
    if (href === "/" || href === "/de" || href === "/fr") return pathname === href;
    // Sonst auch Subpages matchen
    return pathname === href || pathname.startsWith(href + "/");
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
                  key={item.href}
                  href={item.href}
                  className={`nav-pill ${active ? "nav-pill-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link href={appsHref} className="btn btn-primary hidden sm:inline-flex">
              {locale === "de" ? "Apps ansehen" : locale === "fr" ? "Voir les apps" : "Explore Apps"}
            </Link>
            <MobileMenu nav={nav} />
          </div>
        </div>
      </div>
    </header>
  );
}
