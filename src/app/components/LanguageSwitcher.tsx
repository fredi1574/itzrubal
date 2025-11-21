"use client";

import { useState, useRef, useEffect, type JSX } from "react";
import { CiGlobe } from "react-icons/ci";
import { useLocale } from "../lib/LocaleProvider";
import { IoChevronDownOutline } from "react-icons/io5";

type LanguageSwitcherProps = {
  menuPlacement?: "top" | "bottom";
};

export default function LanguageSwitcher(
  props?: LanguageSwitcherProps
): JSX.Element {
  const { menuPlacement = "bottom" } = props ?? {};
  const { locale, setLocale, t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: t("nav.en") },
    { code: "he", label: t("nav.he") },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setLocale(langCode as "en" | "he");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-black/10 dark:border-white/10 bg-transparent hover:bg-foreground/5 hover:scale-100 transition-all duration-300 hover:border-accent/30"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Globe Icon */}
        <CiGlobe className="w-5 h-5 text-foreground/80 hover:text-accent transition-colors duration-300" />

        {/* Dropdown Arrow */}
        <IoChevronDownOutline
          className={`w-3 h-3 text-foreground/60 transition-all duration-300 ${
            isOpen ? "rotate-180 text-accent" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 w-32 bg-white rounded-lg border border-black/10 dark:border-white/10 shadow-lg z-50 animate-scale-in backdrop-blur-sm ${
            menuPlacement === "top"
              ? "bottom-full mb-1 origin-bottom"
              : "top-full mt-1 origin-top"
          }`}
        >
          {languages.map((language, index) => (
            <button
              key={language.code}
              type="button"
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full px-3 py-2 text-sm text-left transition-all duration-300 first:rounded-t-lg last:rounded-b-lg hover:scale-105 ${
                locale === language.code
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-foreground/80 hover:bg-foreground/5 hover:text-accent"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {language.label as string}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
