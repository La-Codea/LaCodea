"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const THEME_COOKIE = "lacodea_theme";
const TRANSITION_CLASS = "theme-transition";

function prefersReducedMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function getCookieDomainFromHostname(hostname: string) {
  // Dev: simpletime.localhost / www.localhost
  if (hostname.endsWith(".localhost")) return ".localhost";

  // Prod: www.lacodea.com / simpletime.lacodea.com / etc.
  const parts = hostname.split(".").filter(Boolean);
  if (parts.length >= 2) return `.${parts.slice(-2).join(".")}`;

  return undefined;
}

function setThemeCookie(theme: "light" | "dark") {
  const hostname = window.location.hostname;
  const domain = getCookieDomainFromHostname(hostname);

  const base = `${THEME_COOKIE}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;

  // Domain-Cookie für Subdomain-Sharing
  if (domain) {
    document.cookie = `${base}; Domain=${domain}`;
  } else {
    document.cookie = base;
  }
}

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  function toggle() {
    const next = (isDark ? "light" : "dark") as "light" | "dark";

    // Accessibility: keine Animation wenn Reduce Motion
    if (prefersReducedMotion()) {
      setTheme(next);
      setThemeCookie(next);
      return;
    }

    const html = document.documentElement;

    // Dauer aus CSS-Variable lesen (fallback 650ms)
    const msVar = getComputedStyle(html).getPropertyValue("--theme-transition-ms").trim();
    const durationMs = msVar.endsWith("ms")
      ? parseFloat(msVar)
      : msVar.endsWith("s")
      ? parseFloat(msVar) * 1000
      : 650;

    if (timerRef.current) window.clearTimeout(timerRef.current);

    // Transition-Klasse aktivieren
    html.classList.add(TRANSITION_CLASS);

    // Reflow erzwingen, damit Browser die Klasse sicher anwendet
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    html.offsetHeight;

    // Theme im nächsten Frame wechseln
    requestAnimationFrame(() => {
      setTheme(next);
      setThemeCookie(next);
    });

    // Klasse nach Ablauf entfernen (leichtes Padding)
    timerRef.current = window.setTimeout(() => {
      html.classList.remove(TRANSITION_CLASS);
      timerRef.current = null;
    }, Math.ceil(durationMs + 50));
  }

  return (
    <button
      onClick={toggle}
      className="btn bg-zinc-100 hover:bg-zinc-200 text-black dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
      aria-label="Toggle theme"
      type="button"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}