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
  return (
    <main>
      <Section
        title={
          ((d.services as Record<string, unknown> | undefined)
            ?.title as string) || "Services"
        }
        subtitle={
          ((d.services as Record<string, unknown> | undefined)
            ?.subtitle as string) || ""
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="card rounded-xl p-6">
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{s.body}</p>
              {Array.isArray(s.includes) && s.includes.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm text-foreground/80 list-disc pl-5">
                  {s.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {s.note ? (
                <div className="mt-4 text-xs text-foreground/60">{s.note}</div>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={
          ((d.services as Record<string, unknown> | undefined)
            ?.processTitle as string) || "Our design process"
        }
        subtitle={
          ((d.services as Record<string, unknown> | undefined)
            ?.processSubtitle as string) || ""
        }
      >
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((p) => (
            <li
              key={p.step}
              className="rounded-xl border border-black/10 dark:border-white/10 p-6"
            >
              <div className="text-xs font-mono text-foreground/60">
                {p.step}
              </div>
              <div className="mt-2 text-base font-medium">{p.title}</div>
              <p className="mt-2 text-sm text-foreground/70">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        title={
          ((d.services as Record<string, unknown> | undefined)
            ?.faqTitle as string) || "FAQs"
        }
        subtitle={
          ((d.services as Record<string, unknown> | undefined)
            ?.faqSubtitle as string) || ""
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(
            (((d.services as Record<string, unknown> | undefined)
              ?.faqs as unknown[]) || []) as { q: string; a: string }[]
          ).map((f) => (
            <details
              key={f.q}
              className="rounded-xl border border-black/10 dark:border-white/10 p-6"
            >
              <summary className="cursor-pointer text-sm font-medium text-foreground">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-foreground/70">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl p-6 card">
          <div>
            <div className="text-lg font-medium">
              {((d.services as Record<string, unknown> | undefined)
                ?.ctaTitle as string) ?? "Ready to start your project?"}
            </div>
            <div className="mt-1 text-sm text-foreground/70">
              {((d.services as Record<string, unknown> | undefined)
                ?.ctaBody as string) ?? "Book a consultation."}
            </div>
          </div>
          <div className="shrink-0">
            <ButtonLink href="/contact">
              {((d.common as Record<string, unknown> | undefined)
                ?.bookConsultation as string) ?? "Book a consultation"}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
