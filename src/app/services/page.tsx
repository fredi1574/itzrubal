import Section from "../components/Section";
import { ButtonLink } from "../components/Button";
import { cookies } from "next/headers";
import { getDictionary, getSafeLocale } from "../lib/i18n";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const cookieStore = await cookies();
  const locale = getSafeLocale(cookieStore.get("locale")?.value);
  const dict = getDictionary(locale) as Record<string, unknown>;
  const d = dict as Record<string, unknown>;
  const services = (((d.services as Record<string, unknown> | undefined)
    ?.cards as unknown[]) || []) as {
    title: string;
    body: string;
    includes?: string[];
    note?: string;
  }[];
  const process = (((d.services as Record<string, unknown> | undefined)
    ?.process as unknown[]) || []) as {
    step: string;
    title: string;
    body: string;
  }[];
  return <div></div>;
}
