"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";

const THEME_COOKIE = "lacodea_theme";

function readThemeCookie(): "light" | "dark" | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(
    new RegExp(`(?:^|; )${THEME_COOKIE.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}=([^;]*)`)
  );
  if (!m) return null;
  const v = decodeURIComponent(m[1]);
  return v === "dark" || v === "light" ? v : null;
}

function ThemeCookieSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const cookieTheme = readThemeCookie();
    if (cookieTheme) setTheme(cookieTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // ❌ disableTransitionOnChange raus, sonst killt next-themes dir die Animation
    >
      <ThemeCookieSync />
      {children}
    </NextThemesProvider>
  );
}