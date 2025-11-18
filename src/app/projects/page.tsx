import type { JSX } from "react";
import Link from "next/link";
import { headers } from "next/headers";

export const metadata = { title: "Projects" };
export const dynamic = "force-dynamic";

type ProjectSummary = {
  slug: string;
  title: string;
  location?: string;
  coverUrl?: string;
};

const comingSoonProjects = [
  { title: "בקרוב", description: "פרויקט חדש בעבודה\nבוהו כפרי במרכז" },
  { title: "בקרוב", description: "פרויקט נוסף בדרך\nנורדי-תעשייתי בצפון" },
  { title: "בקרוב", description: "פרויקט מתוכנן\nמודרני מינימליסטי" },
  { title: "בקרוב", description: "פרויקט חדש\nכפרי רומנטי" },
  { title: "בקרוב", description: "פרויקט בתכנון\nסקנדינבי חם" },
] as const;

async function getProjects(): Promise<ProjectSummary[]> {
  try {
    const hdrs = await headers();
    const proto = hdrs.get("x-forwarded-proto") || "http";
    const host = hdrs.get("host");
    const url = `${proto}://${host}/api/projects`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("failed");
    const data = await res.json();
    return (
      (data?.projects as ProjectSummary[])?.map((project) => ({
        slug: project.slug,
        title: project.title,
        location: project.location,
        coverUrl: project.coverUrl,
      })) ?? []
    );
  } catch (error) {
    console.error("Projects API Error:", error);
    const { projects } = await import("../lib/sampleData");
    return projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      location: project.location,
      coverUrl: project.coverUrl,
    }));
  }
}

/**
 * Renders the projects page with hero, info banner, portfolio grid and CTA.
 * @returns {JSX.Element} Portfolio landing page in Hebrew RTL layout.
 */
const PortfolioPage = async (): Promise<JSX.Element> => {
  const projects = await getProjects();
  return (
    <div className="projects-page" dir="rtl" lang="he">
      <HeroSection />
      <div className="projects-container">
        <InfoBanner />
        <PortfolioGrid projects={projects} />
      </div>
      <CtaSection />
    </div>
  );
};

/**
 * Displays the hero header for the portfolio page.
 * @returns {JSX.Element} Hero section with title and subtitle.
 */
const HeroSection = (): JSX.Element => (
  <section className="projects-hero">
    <h1 className="projects-hero-title">תיק עבודות</h1>
    <p className="projects-hero-text">
      כל פרויקט הוא סיפור ייחודי של הקשבה, יצירה והפיכת חלל לבית אמיתי
    </p>
  </section>
);

/**
 * Highlights the portfolio philosophy and CTA.
 * @returns {JSX.Element} Informational banner with button.
 */
const InfoBanner = (): JSX.Element => (
  <div className="projects-info">
    <h2 className="projects-info-title">איכות על פני כמות</h2>
    <p className="projects-info-text">
      אני בוחרת להציג כל פרויקט בצורה מפורטת ומעמיקה, כך שתוכלו באמת להכיר את
      תהליך העבודה והתוצאה. פרויקטים נוספים מתווספים באופן שוטף, כשהם מוכנים
      להצגה מושלמת.
    </p>
    <a className="projects-info-button" href="/contact">
      בואו נדבר על הפרויקט שלכם
    </a>
  </div>
);

type PortfolioGridProps = {
  projects: ProjectSummary[];
};

/**
 * Renders the grid of live and coming-soon projects.
 * @param {PortfolioGridProps} props Portfolio data lists.
 * @returns {JSX.Element} Grid layout of project cards.
 */
const PortfolioGrid = ({ projects }: PortfolioGridProps): JSX.Element => (
  <div className="projects-grid">
    {projects.map((project) => (
      <ProjectCard key={project.slug} project={project} />
    ))}
    {comingSoonProjects.map((item) => (
      <ComingSoonCard key={item.description} description={item.description} title={item.title} />
    ))}
  </div>
);

type ProjectCardProps = {
  project: ProjectSummary;
};

/**
 * Displays a single project entry linking to the detailed page.
 * @param {ProjectCardProps} props Project summary object.
 * @returns {JSX.Element} Clickable project showcase card.
 */
const ProjectCard = ({ project }: ProjectCardProps): JSX.Element => (
  <Link className="projects-card" href={`/projects/${project.slug}`}>
    <div
      className="projects-image"
      style={
        project.coverUrl
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${project.coverUrl})`,
            }
          : undefined
      }
    >
      {!project.coverUrl ? `[תמונה - ${project.title}]` : null}
      <div className="projects-overlay">
        <h3 className="projects-title">{project.title}</h3>
        {project.location ? (
          <p className="projects-subtitle">{project.location}</p>
        ) : null}
      </div>
    </div>
  </Link>
);

type ComingSoonCardProps = {
  title: string;
  description: string;
};

const ComingSoonCard = ({ title, description }: ComingSoonCardProps): JSX.Element => (
  <div className="projects-card projects-coming-soon">
    <div className="projects-coming-soon-icon" aria-hidden="true">
      ⏳
    </div>
    <h3 className="projects-coming-soon-title">{title}</h3>
    <p className="projects-coming-soon-text">{description}</p>
  </div>
);

/**
 * Displays the final call-to-action section.
 * @returns {JSX.Element} CTA block with contact link.
 */
const CtaSection = (): JSX.Element => (
  <section className="projects-cta">
    <h2 className="projects-cta-title">הפרויקט הבא יכול להיות שלכם</h2>
    <p className="projects-cta-text">
      בואו נדבר על איך אפשר להפוך את הבית שלכם למקום שבאמת מרגיש כמו בית
    </p>
    <a className="projects-cta-button" href="/contact">
      צרו קשר
    </a>
  </section>
);

export default PortfolioPage;
