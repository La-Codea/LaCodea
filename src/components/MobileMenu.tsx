"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";

type NavItem = { href: string; label: string };

export default function MobileMenu({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="md:hidden">
      <button className="btn" onClick={() => setOpen(true)} aria-label="Open menu">
        ☰
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <button
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />

          <div className="absolute right-3 top-3 w-[min(92vw,420px)] card p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Menu</div>
              <button className="btn" onClick={() => setOpen(false)} aria-label="Close">
                ✕
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`btn ${active ? "btn-primary" : ""}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="hr my-4" />

            <LanguageToggle />

            <div className="hr my-4" />

            <Link href="/apps" className="btn btn-primary w-full">
              Explore Apps
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
