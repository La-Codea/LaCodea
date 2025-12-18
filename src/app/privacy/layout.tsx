// src/app/privacy/layout.tsx
import { getT } from "@/i18n/server";
import { resolveSite } from "@/site/resolve";

export default async function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await resolveSite();

  // SimpleTime: KEIN Hub-Header drumherum
  if (site.key === "simpletime") return <>{children}</>;

  const __i18n = await getT();
  const t = typeof __i18n === "function" ? __i18n : __i18n.t;

  return (
    <main className="container py-10 md:py-14">
      <header className="mb-10 md:mb-14">
        <h1 className="text-4xl font-semibold tracking-tight">
          {t("pages.privacy.title")}
        </h1>
        <p className="muted mt-3 max-w-2xl text-lg">
          {t("pages.privacy.subtitle")}
        </p>
      </header>

      {children}
    </main>
  );
}