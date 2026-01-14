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

  const baseUrl = getPublicBaseUrl(site.key);

  // ✅ Per-site SEO (configured in src/site/config.ts)
  const title = site.seo?.title ?? site.name ?? "LaCodea";
  const description =
    site.seo?.description ??
    "Simple, useful iOS apps — built by LaCodea. Privacy-first by default.";
  const ogImage = site.seo?.ogImagePath ?? "/og/hub.png";

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
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
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