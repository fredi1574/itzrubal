"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "./components/Button";
import Section from "./components/Section";
import ProjectCard from "./components/ProjectCard";
import TestimonialCard from "./components/TestimonialCard";
import { projects as sampleProjects, testimonials } from "./lib/sampleData";
import { useLocale } from "./lib/LocaleProvider";

export default function Home() {
  const { t } = useLocale();
  const services =
    (t("home.servicesCards") as Array<{ title: string; body: string }>) ?? [];
  const [projects, setProjects] = useState<
    Array<{
      slug: string;
      title: string;
      location: string;
      coverUrl?: string;
    }>
  >(sampleProjects);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/projects`, { cache: "no-store" });
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        if (!cancelled && Array.isArray(data?.projects)) {
          setProjects(data.projects);
        }
      } catch {
        // keep sampleProjects
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <main>
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-2xl">
            <p className="text-accent animate-fade-in-up">
              {t("home.heroTag") as string}
            </p>
            <h1 className="mt-4 heading-xl animate-fade-in-up animate-stagger-1 text-gradient">
              {t("home.heroTitle") as string}
            </h1>
            <p className="mt-6 text-body-lg text-foreground/70 max-w-xl animate-fade-in-up animate-stagger-2">
              {t("home.heroBody") as string}
            </p>
            <div className="mt-8 flex gap-3 animate-fade-in-up animate-stagger-3">
              <ButtonLink href="/projects" className="hover-lift hover-glow">
                {t("common.viewProjects") as string}
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                className="hover-lift"
              >
                {t("common.bookConsultation") as string}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <Section
        title={t("home.selectedProjectsTitle") as string}
        subtitle={t("home.selectedProjectsSubtitle") as string}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, index) => (
            <div
              key={p.slug}
              className={`card rounded-xl p-3 hover-lift transition-smooth animate-fade-in-up animate-stagger-${Math.min(
                index + 1,
                5
              )}`}
            >
              <ProjectCard
                slug={p.slug}
                title={p.title}
                location={p.location}
                coverUrl={p.coverUrl}
              />
            </div>
          ))}
        </div>
        <div className="mt-8 animate-fade-in-up animate-stagger-4">
          <ButtonLink href="/portfolio" variant="ghost" className="hover-lift">
            {t("home.exploreAllProjects") as string}
          </ButtonLink>
        </div>
      </Section>

      <Section
        title={t("home.servicesTitle") as string}
        subtitle={t("home.servicesSubtitle") as string}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {services.map((s, index) => (
            <div
              key={s.title}
              className={`rounded-xl border border-black/10 dark:border-white/10 p-6 hover-lift hover-glow transition-smooth animate-fade-in-up animate-stagger-${Math.min(
                index + 1,
                5
              )}`}
            >
              <h3 className="heading-sm">{s.title}</h3>
              <p className="mt-2 text-body text-foreground/70">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={t("home.testimonialsTitle") as string}
        subtitle={t("home.testimonialsSubtitle") as string}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`animate-fade-in-up animate-stagger-${Math.min(
                i + 1,
                5
              )}`}
            >
              <TestimonialCard quote={t.quote} author={t.author} />
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
