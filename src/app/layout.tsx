import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/footer.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="pt-10 md:pt-14">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}