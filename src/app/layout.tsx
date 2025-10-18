import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Crimson_Text, Alef } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { cookies } from "next/headers";
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
    default: "Iztrubal Interior Design",
    template: "%s - Interior",
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
        className={`${inter.variable} ${crimsonText.variable} ${geistSans.variable} ${geistMono.variable} ${alef.variable} antialiased`}
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
