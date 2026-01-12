"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SiteConfig } from "@/site/config";
import { HUB } from "@/site/config";
import type { Locale } from "@/i18n/shared";

type FooterStrings = {
  tagline: string;
  sectionNavigation: string;
  sectionLegal: string;
  bottomline: string;

  apps: string;
  announcements: string;
  support: string;
  feedback: string;
  contact: string;
  privacy: string;
  imprint: string;

  socialWhatsapp: string;
  socialX: string;
  socialInstagram: string;
  socialTikTok: string;
  socialTelegram: string;
};

function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.6L6 22H2.8l7.4-8.5L1 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L6.2 3.9H4.4L17.8 20z" />
    </svg>
  );
}

function IconWhatsApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2a9.9 9.9 0 0 0-8.5 15l-1 3.7 3.8-1A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.2.6.6-2.1-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.8-6.1c-.3-.2-1.7-.8-2-1s-.5-.2-.7.2-.8 1-.9 1.1-.3.2-.6.1a6.7 6.7 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.8c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3s-1 1-1 2.4 1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.1-1.4-.1-.1-.3-.2-.6-.4z" />
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm4.75-2.9a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05z" />
    </svg>
  );
}

function IconTikTok(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21 8.1a7.6 7.6 0 0 1-4.5-1.5v7.4a6.5 6.5 0 1 1-5.6-6.4v3.4a3.2 3.2 0 1 0 2.4 3.1V2h3.2a4.4 4.4 0 0 0 4.5 4.1z" />
    </svg>
  );
}

function IconTelegram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.9 4.6c.2.1.3.4.1 1.2l-3.1 14.6c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.8.4l.3-4.9L19 6.7c.4-.4-.1-.6-.6-.3l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5L20 4.1c.8-.3 1.5-.1 1.9.5z" />
    </svg>
  );
}

function getHubHomeHref(locale: Locale) {
  const prefix = locale === "en" ? "" : `/${locale}`;

  // Lokal: Hub läuft auf localhost:3000 (ohne Subdomain)
  if (process.env.NODE_ENV !== "production") {
    return `http://localhost:3000${prefix}/`;
  }

  // Prod: Hub ist www.<ROOT_DOMAIN>
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? process.env.ROOT_DOMAIN ?? "lacodea.com";
  return `https://www.${domain}${prefix}/`;
}

export default function FooterClient({
  locale,
  strings,
  site,
}: {
  locale: Locale;
  strings: FooterStrings;
  site: SiteConfig;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { root: null, threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base = locale === "en" ? "" : `/${locale}`;
  const path = (p: string) => `${base}${p}`;

  const showApps = site.nav?.showApps ?? true;
  const showAnnouncements = site.nav?.showAnnouncements ?? true;

  // ✅ Footer Brand ist IMMER LaCodea (Hub)
  const brandSite = HUB;
  const brandName = brandSite.name ?? "LaCodea";
  const brandCode = "LC";
  const showImageLogo = brandSite.logoType === "image" && !!brandSite.logoSrc;

  // TODO: echten WhatsApp Channel Link eintragen
  const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029Vb7D9bXIt5rnUGZcLu1C";
  const INSTAGRAM_URL = "https://www.instagram.com/la_codea/";
  const TIKTOK_URL = "https://tiktok.com";
  const TELEGRAM_URL = "https://t.me/la_codea";

  return (
    <footer
      ref={ref}
      className={`footer footer-reveal ${visible ? "is-visible" : ""}`}
    >
      <div className="container footer-inner px-4 sm:px-6">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <a
              href={getHubHomeHref(locale)}
              className="footer-brand flex items-center gap-2"
              aria-label={`${brandName} Home`}
            >
              <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] shadow-sm">
                {showImageLogo ? (
                  <Image
                    src={brandSite.logoSrc!}
                    alt={`${brandName} logo`}
                    fill
                    sizes="40px"
                    className="h-7 w-7 rounded-xl"
                    priority
                  />
                ) : (
                  <span className="text-xs font-black">{brandCode}</span>
                )}
              </span>
              <span className="text-lg font-semibold tracking-tight">
                {brandName}
              </span>
            </a>

            <p className="muted footer-tagline">{strings.tagline}</p>

            <div className="footer-socials">
              {[
                {
                  id: "whatsapp",
                  href: WHATSAPP_CHANNEL_URL,
                  label: strings.socialWhatsapp,
                  icon: <IconWhatsApp className="h-5 w-5" />,
                },
                {
                  id: "x",
                  href: "https://x.com/LaCodeaa",
                  label: strings.socialX,
                  icon: <IconX className="h-5 w-5" />,
                },
                {
                  id: "instagram",
                  href: INSTAGRAM_URL,
                  label: strings.socialInstagram,
                  icon: <IconInstagram className="h-5 w-5" />,
                },
                {
                  id: "tiktok",
                  href: TIKTOK_URL,
                  label: strings.socialTikTok,
                  icon: <IconTikTok className="h-5 w-5" />,
                },
                {
                  id: "telegram",
                  href: TELEGRAM_URL,
                  label: strings.socialTelegram,
                  icon: <IconTelegram className="h-5 w-5" />,
                },
              ].map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  aria-label={s.label}
                  className="footer-social"
                  target="_blank"
                  rel="noreferrer"
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer-title">{strings.sectionNavigation}</div>
            <div className="footer-links">
              {showApps ? (
                <Link className="navlink" href={path("/apps")}>
                  {strings.apps}
                </Link>
              ) : null}

              {showAnnouncements ? (
                <Link className="navlink" href={path("/announcements")}>
                  {strings.announcements}
                </Link>
              ) : null}

              <Link className="navlink" href={path("/support")}>
                {strings.support}
              </Link>
              <Link className="navlink" href={path("/feedback")}>
                {strings.feedback}
              </Link>
              <Link className="navlink" href={path("/contact")}>
                {strings.contact}
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="footer-title">{strings.sectionLegal}</div>
            <div className="footer-links">
              <Link className="navlink" href={path("/privacy")}>
                {strings.privacy}
              </Link>
              <Link className="navlink" href={path("/imprint")}>
                {strings.imprint}
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="muted">
            © {new Date().getFullYear()} {brandName}
          </div>
          <div className="muted">{strings.bottomline}</div>
        </div>
      </div>
    </footer>
  );
}