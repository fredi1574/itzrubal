import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Inter,
  Crimson_Text,
} from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { cookies } from "next/headers";
import { LocaleProvider } from "./lib/LocaleProvider";
import { getDirection, getSafeLocale } from "./lib/i18n";

// Elegant serif for headings and display text
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

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

export const metadata: Metadata = {
  title: {
    default: "Hagit Oz Interior Design",
    template: "%s - Interior",
  },
  description:
    "Timeless interiors for modern living. Residential, commercial, and staging.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Atelier Interior — Residential & Commercial Design",
    description:
      "Timeless interiors for modern living. Residential, commercial, and staging.",
    url: "https://example.com",
    siteName: "Atelier Interior",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atelier Interior",
    description:
      "Timeless interiors for modern living. Residential, commercial, and staging.",
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
        className={`${playfairDisplay.variable} ${inter.variable} ${crimsonText.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LocaleProvider initialLocale={initialLocale}>
          <Navbar />
          {children}
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
