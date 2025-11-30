import type { Metadata } from "next";
import { Alef, Crimson_Text, Geist, Geist_Mono, Inter } from "next/font/google";
import { cookies } from "next/headers";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { LocaleProvider } from "./lib/LocaleProvider";
import { getDirection, getSafeLocale } from "./lib/i18n";

// Clean sans-serif for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Sophisticated serif for quotes and special text
const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Keep Geist for technical elements
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Hebrew font for navbar
const alef = Alef({
  variable: "--font-alef",
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hagit Oz Interior Design",
    template: "%s - Hagit Oz",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLocale = getSafeLocale(cookieStore.get("locale")?.value);
  const dir = getDirection(initialLocale);
  return (
    <html lang={initialLocale} dir={dir}>
      <body
        className={`${inter.variable} ${crimsonText.variable} ${geistSans.variable} ${geistMono.variable} ${alef.variable} antialiased min-h-screen flex flex-col`}
      >
        <LocaleProvider initialLocale={initialLocale}>
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
