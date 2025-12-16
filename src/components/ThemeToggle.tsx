"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="btn bg-zinc-100 hover:bg-zinc-200 text-black dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
      aria-label="Toggle theme"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
