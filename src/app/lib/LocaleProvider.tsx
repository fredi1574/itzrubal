"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getByPath, getDictionary, getSafeLocale } from "./i18n";
import { Locale } from "./types";
import { useRouter } from "next/navigation";

type LocaleContextValue = {
  locale: Locale;
  t: (path: string) => unknown;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  useEffect(() => {
    // Keep cookie in sync when mounting with initialLocale (SSR value)
    const current = getSafeLocale(getCookie("locale"));
    if (current !== initialLocale) {
      setCookie("locale", initialLocale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setCookie(name: string, value: string) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
  }

  function getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp("(?:^|; )" + name + "=([^;]*)")
    );
    return match ? decodeURIComponent(match[1]) : null;
  }

  const dict = useMemo(() => getDictionary(locale), [locale]);

  const t = useCallback((path: string) => getByPath(dict, path), [dict]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      t,
      setLocale: (l: Locale) => {
        setLocaleState(l);
        setCookie("locale", l);
        // reload to apply server-rendered lang/dir
        router.refresh();
      },
    }),
    [locale, router, t]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
