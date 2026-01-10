"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const THEME_COOKIE = "lacodea_theme";

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

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  function toggle() {
    const next = (isDark ? "light" : "dark") as "light" | "dark";
    setTheme(next);
    setThemeCookie(next);
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