// src/app/layout.tsx
import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/footer.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

import { resolveSite } from "@/site/resolve";
import { cookies } from "next/headers";

const THEME_COOKIE = "lacodea_theme";

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