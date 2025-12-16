"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLocaleFromPath, switchLocale } from "@/i18n/client";

type Locale = "en" | "de" | "fr";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
];

function setLocaleCookie(locale: Locale) {
  // 1 Jahr, SameSite Lax, überall gültig
  document.cookie = `lacodea_locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useMemo(() => getLocaleFromPath(pathname) as Locale, [pathname]);

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  function choose(next: Locale) {
    setOpen(false);

    // ✅ wichtig: Cookie sofort setzen, damit RSC/Server sofort die neue Locale sieht
    setLocaleCookie(next);

    const nextPath = switchLocale(pathname, next);

    startTransition(() => {
      router.push(nextPath);
      router.refresh(); // ✅ sofort neu rendern
    });
  }

  return (
    <div ref={ref} className="lang-dd">
      <button
        type="button"
        className="btn lang-dd__btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
      >
        <span className="lang-dd__globe">🌐</span>
        <span className="lang-dd__code">{locale.toUpperCase()}</span>
        <span className="lang-dd__chev">▾</span>
      </button>

      {open && (
        <div className="card lang-dd__menu" role="menu" aria-label="Languages">
          {OPTIONS.map((o) => {
            const active = o.value === locale;
            return (
              <button
                key={o.value}
                type="button"
                role="menuitem"
                className={`lang-dd__item ${active ? "lang-dd__item--active" : ""}`}
                onClick={() => choose(o.value)}
                disabled={isPending}
              >
                <span>{o.label}</span>
                {active && <span className="lang-dd__check">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
