// src/app/layout.tsx
import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/footer.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

import { resolveSite } from "@/site/resolve";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await resolveSite();

  return (
    <html lang="en" suppressHydrationWarning>
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