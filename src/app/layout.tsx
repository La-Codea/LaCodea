// src/app/layout.tsx
import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/footer.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

import { resolveSite } from "@/site/resolve";
import { cookies } from "next/headers";
import type { Metadata } from "next";

const THEME_COOKIE = "lacodea_theme";

function getPublicBaseUrl(siteKey?: string) {
  const domain =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN ??
    process.env.ROOT_DOMAIN ??
    "lacodea.com";

  const isProd = process.env.NODE_ENV === "production";

  // Hub
  if (!siteKey || siteKey === "hub") {
    return isProd ? `https://www.${domain}` : "http://localhost:3000";
  }

  // App sites (simpletime, orgaone, ...)
  return isProd
    ? `https://${siteKey}.${domain}`
    : `http://${siteKey}.localhost:3000`;
}

export async function generateMetadata(): Promise<Metadata> {
  const site = await resolveSite();

  const hubDescription =
    "Simple, useful iOS apps — built by LaCodea. We create focused tools with clean design. Privacy-first by default.";

  let title = site.name ?? "LaCodea";
  let description = hubDescription;

  if (site.key === "simpletime") {
    title = "SimpleTime";
    description =
      "SimpleTime helps you track time effortlessly — privacy-first, fast, and focused.";
  } else if (site.key === "orgaone") {
    title = "OrgaOne";
    description =
      "OrgaOne helps you stay organized with a focused, privacy-first experience.";
  } else if (site.key === "hub") {
    title = "LaCodea";
    description = hubDescription;
  }

  const baseUrl = getPublicBaseUrl(site.key);

  // Per-site OpenGraph/Twitter image (place files in `/public/og/`)
  const ogImage =
    site.key === "simpletime"
      ? "/og/simpletime.png"
      : site.key === "orgaone"
      ? "/og/orgaone.png"
      : "/og/hub.png";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s · ${title}`,
    },
    description,
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      type: "website",
      url: baseUrl,
      title,
      description,
      siteName: title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await resolveSite();

  // ✅ Next.js 16: cookies() ist async
  const cookieStore = await cookies();
  const theme = cookieStore.get(THEME_COOKIE)?.value;
  const isDark = theme === "dark";

  return (
    <html lang="en" className={isDark ? "dark" : ""} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar site={site} />
          <main className="pt-10 md:pt-14">{children}</main>
          <Footer site={site} />
        </ThemeProvider>
      </body>
    </html>
  );
}