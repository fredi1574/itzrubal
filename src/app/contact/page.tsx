import Section from "../components/Section";
import ContactForm from "../components/ContactForm";
import { cookies } from "next/headers";
import { getDictionary, getSafeLocale } from "../lib/i18n";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = getSafeLocale(cookieStore.get("locale")?.value);
  const dict = getDictionary(locale);
  const title = (dict?.contact as { title?: string })?.title || "Contact";
  return { title };
}

export default async function ContactPage() {
  const cookieStore = await cookies();
  const locale = getSafeLocale(cookieStore.get("locale")?.value);
  const dict = getDictionary(locale);
  const title = (dict?.contact as { title?: string })?.title ?? "Contact";
  const subtitle =
    (dict?.contact as { subtitle?: string })?.subtitle ??
    "Share your project—let's design something beautiful.";
  return (
    <main>
      <Section title={title} subtitle={subtitle}>
        <ContactForm />
      </Section>
    </main>
  );
}
