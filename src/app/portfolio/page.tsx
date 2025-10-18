import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import { headers } from "next/headers";

export const metadata = { title: "Portfolio" };
export const dynamic = "force-dynamic";

async function getProjects() {
  try {
    const hdrs = await headers();
    const proto = hdrs.get("x-forwarded-proto") || "http";
    const host = hdrs.get("host") || "localhost:3000";
    const url = `${proto}://${host}/api/projects`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("failed");
    const data = await res.json();
    return (
      (data?.projects as Array<{
        slug: string;
        title: string;
        location: string;
        coverUrl?: string;
      }>) ?? []
    );
  } catch (error) {
    console.error("Portfolio API Error:", error);
    // Fallback to sample data if API fails completely
    const { projects } = await import("../lib/sampleData");
    return projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      location: p.location,
      coverUrl: p.coverUrl,
    }));
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <main>
      <Section
        title="Portfolio"
        subtitle="Selected residential and commercial projects."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.slug} className="card rounded-xl p-3">
              <ProjectCard
                slug={p.slug}
                title={p.title}
                location={p.location}
                coverUrl={p.coverUrl}
              />
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
