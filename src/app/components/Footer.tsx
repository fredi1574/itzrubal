"use client";

import { useLocale } from "../lib/LocaleProvider";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t hairline bg-[color-mix(in_oklab,var(--muted)_60%,transparent)]/40 animate-fade-in">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300 animate-fade-in-up">
            © {new Date().getFullYear()} Hagit Oz Interior
          </p>
          <div className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300 animate-fade-in-up animate-stagger-1">
            {t("footer.basedIn") as string}
          </div>
        </div>
      </div>
    </footer>
  );
}
