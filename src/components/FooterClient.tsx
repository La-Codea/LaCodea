"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SiteConfig } from "@/site/config";

type Locale = "en" | "de" | "fr";

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

  const brandCode = site.key === "simpletime" ? "ST" : "LC";
  const brandName = site.name ?? "LaCodea";

  // TODO: echten WhatsApp Channel Link eintragen
  const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/xxxxxxxxxxxxxxxxxxxx";

  return (
    <footer
      ref={ref}
      className={`footer footer-reveal ${visible ? "is-visible" : ""}`}
    >
      <div className="container footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <Link
                href={path("/")}
                className="footer-brand"
                aria-label={`${brandName} Home`}
                >
                <span className="footer-logo">{brandCode}</span>
                <span className="text-lg font-semibold tracking-tight">
                    {brandName}
                </span>
            </Link>

            <p className="muted footer-tagline">{strings.tagline}</p>

            <div className="footer-socials">
              {[
                {
                  href: WHATSAPP_CHANNEL_URL,
                  label: strings.socialWhatsapp,
                  icon: <IconWhatsApp className="h-5 w-5" />,
                },
                {
                  href: "https://x.com",
                  label: strings.socialX,
                  icon: <IconX className="h-5 w-5" />,
                },
              ].map((s) => (
                <a
                  key={s.label}
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