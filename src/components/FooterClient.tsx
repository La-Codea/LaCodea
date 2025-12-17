"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locale";

type Strings = {
  tagline: string;
  apps: string;
  announcements: string;
  support: string;
  feedback: string;
  contact: string;
  privacy: string;
  imprint: string;
};

export default function FooterClient({
  locale,
  t,
}: {
  locale: Locale;
  t: Strings;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Falls jemand reduce motion nutzt: direkt sichtbar
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
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

  const path = (p: string) => (locale === "en" ? p : `/${locale}${p}`);

  return (
    <footer
      ref={ref}
      className={`footer footer-reveal ${visible ? "is-visible" : ""}`}
    >
      <div className="container footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand">
              <span className="footer-logo">LC</span>
              <span className="text-lg font-semibold tracking-tight">LaCodea</span>
            </div>

            <p className="muted footer-tagline">{t.tagline}</p>

            <div className="footer-socials">
              {[
                { href: "https://x.com", label: "X", icon: "𝕏" },
                { href: "https://github.com", label: "GitHub", icon: "⌂" },
                { href: "mailto:contact@lacodea.com", label: "Email", icon: "✉" },
              ].map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="footer-social">
                  <span aria-hidden>{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer-title">Navigation</div>
            <div className="footer-links">
              <Link className="navlink" href={path("/apps")}>{t.apps}</Link>
              <Link className="navlink" href={path("/announcements")}>{t.announcements}</Link>
              <Link className="navlink" href={path("/support")}>{t.support}</Link>
              <Link className="navlink" href={path("/feedback")}>{t.feedback}</Link>
              <Link className="navlink" href={path("/contact")}>{t.contact}</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="footer-title">Legal</div>
            <div className="footer-links">
              <Link className="navlink" href={path("/privacy")}>{t.privacy}</Link>
              <Link className="navlink" href={path("/imprint")}>{t.imprint}</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="muted">© {new Date().getFullYear()} LaCodea</div>
          <div className="muted">Built with care · Privacy-first</div>
        </div>
      </div>
    </footer>
  );
}