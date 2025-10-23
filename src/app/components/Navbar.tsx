"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "../lib/LocaleProvider";
import LanguageSwitcher from "./LanguageSwitcher";

const linkDefs = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
  { href: "/services", key: "nav.services" },
  { href: "/projects", key: "nav.projects" },
  { href: "/contact", key: "nav.contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-40 w-full border-b hairline backdrop-blur bg-background/70 animate-fade-in">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="heading-md font-alef flex items-center transition-all gap-2 hover:text-accent duration-300 hover:scale-105"
          >
            <Image src="/logo.png" alt="Iztrubal logo" width={50} height={50} />
            <span className="studio-name">{t("nav.logo") as string}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {linkDefs.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-caption transition-all duration-300 hover:scale-105 animate-fade-in-up ${
                    active
                      ? "text-accent font-medium"
                      : "text-foreground/60 hover:text-accent"
                  }`}
                >
                  {t(link.key) as string}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3 animate-fade-in-up animate-stagger-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
