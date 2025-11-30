"use client";

import { useEffect, useState, type JSX } from "react";
import { createPortal } from "react-dom";
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

type Translate = ReturnType<typeof useLocale>["t"];

type NavLinksProps = {
  itemClass: string;
  onNavigate?: () => void;
  pathname: string;
  t: Translate;
};

type DesktopNavProps = Pick<NavLinksProps, "pathname" | "t">;

type MobileNavProps = DesktopNavProps & {
  onNavigate: () => void;
  open: boolean;
};

type MobileDrawerProps = Pick<MobileNavProps, "onNavigate" | "pathname" | "t">;

type MobileToggleProps = {
  open: boolean;
  onToggle: () => void;
};

type LogoProps = {
  label: string;
};

function NavLinks({
  itemClass,
  onNavigate,
  pathname,
  t,
}: NavLinksProps): JSX.Element {
  return (
    <>
      {linkDefs.map((link) => {
        const active = pathname === link.href;
        const stateClasses = active
          ? "text-[#B8A195] font-medium"
          : "text-[#B2B5AA] hover:text-accent";
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${itemClass} ${stateClasses}`}
            onClick={onNavigate}
          >
            {t(link.key) as string}
          </Link>
        );
      })}
    </>
  );
}

function DesktopNav({ pathname, t }: DesktopNavProps): JSX.Element {
  return (
    <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
      <NavLinks
        itemClass="site-nav-link text-caption transition-all duration-300 hover:scale-105 animate-fade-in-up"
        pathname={pathname}
        t={t}
      />
    </nav>
  );
}

function usePreventBodyScroll(active: boolean): void {
  useEffect(() => {
    if (!active) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [active]);
}

function MobileDrawer({
  onNavigate,
  pathname,
  t,
}: MobileDrawerProps): JSX.Element {
  return (
    <div
      className="md:hidden fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <button
        type="button"
        aria-label="Close navigation menu"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onNavigate}
      />
      <div className="ml-auto flex h-full w-72 flex-col border-l border-border bg-background shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-end border-b border-border px-4 py-3">
          <button
            type="button"
            aria-label="Close navigation drawer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={onNavigate}
          >
            <span className="sr-only">Close</span>
            <span className="relative block h-4 w-4">
              <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 bg-foreground rotate-45" />
              <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 bg-foreground -rotate-45" />
            </span>
          </button>
        </div>
        <nav className="flex flex-col gap-3 px-5 py-6 overflow-y-auto">
          <NavLinks
            itemClass="site-nav-link text-base transition-colors duration-300"
            onNavigate={onNavigate}
            pathname={pathname}
            t={t}
          />
        </nav>
        <div className="mt-auto border-t border-border px-5 py-5">
          <LanguageSwitcher menuPlacement="top" />
        </div>
      </div>
    </div>
  );
}

function MobileNav({
  onNavigate,
  open,
  pathname,
  t,
}: MobileNavProps): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  usePreventBodyScroll(open && mounted);

  if (!mounted || !open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <MobileDrawer onNavigate={onNavigate} pathname={pathname} t={t} />,
    document.body
  );
}

function MobileToggle({ onToggle, open }: MobileToggleProps): JSX.Element {
  return (
    <button
      type="button"
      aria-label="Toggle navigation menu"
      aria-expanded={open}
      className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-border transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      onClick={onToggle}
    >
      <span
        className={`h-0.5 w-6 rounded bg-foreground transition-transform ${
          open ? "translate-y-1.5 rotate-45" : ""
        }`}
      />
      <span
        className={`h-0.5 w-6 rounded bg-foreground transition-opacity ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`h-0.5 w-6 rounded bg-foreground transition-transform ${
          open ? "-translate-y-1.5 -rotate-45" : ""
        }`}
      />
    </button>
  );
}

function Logo({ label }: LogoProps): JSX.Element {
  return (
    <div className="flex flex-1 items-center">
      <Link
        href="/"
        className="heading-md font-alef flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:text-accent"
      >
        <Image src="/logo.png" alt="Iztrubal logo" width={70} height={70} />
        <span className="studio-name">{label}</span>
      </Link>
    </div>
  );
}

export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  const { t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b hairline backdrop-blur bg-background/70 animate-fade-in">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">
          <Logo label={t("nav.logo") as string} />
          <DesktopNav pathname={pathname} t={t} />
          <div className="flex flex-1 items-center justify-end gap-3">
            <MobileToggle
              open={mobileOpen}
              onToggle={() => setMobileOpen((prev) => !prev)}
            />
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        <MobileNav
          onNavigate={() => setMobileOpen(false)}
          open={mobileOpen}
          pathname={pathname}
          t={t}
        />
      </div>
    </header>
  );
}
