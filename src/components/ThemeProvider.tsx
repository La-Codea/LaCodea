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
  const { setTheme, resolvedTheme } = useTheme();
  const [didInit, setDidInit] = useState(false);

  // ✅ Beim Laden: Cookie -> next-themes (damit es NICHT auf system/localStorage springt)
  useEffect(() => {
    const cookieTheme = readThemeCookie();
    if (cookieTheme) {
      setTheme(cookieTheme);
    }
    setDidInit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Optional: wenn next-themes später einen Wert hat, aber Cookie fehlt -> nichts tun.
  // (Cookie wird bei dir beim Toggle gesetzt, daher reicht das.)
  useEffect(() => {
    if (!didInit) return;
    // Hier könntest du optional cookie nachziehen,
    // aber da ThemeToggle das bereits setzt, ist es nicht nötig.
  }, [didInit, resolvedTheme]);

  return null;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ThemeCookieSync />
      {children}
    </NextThemesProvider>
  );
}