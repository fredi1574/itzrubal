import { headers } from "next/headers";
import ProjectCard from "../components/ProjectCard";

export const metadata = { title: "Portfolio" };
export const dynamic = "force-dynamic";

async function getProjects() {
  try {
    const hdrs = await headers();
    const proto = hdrs.get("x-forwarded-proto") || "http";
    const host = hdrs.get("host");
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
    return projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      location: project.location,
      coverUrl: project.coverUrl,
    }));
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <div className="grid mb-6 mt-3 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.slug}>
          <ProjectCard
            slug={project.slug}
            title={project.title}
            location={project.location}
            coverUrl={project.coverUrl}
          />
        </div>
      ))}
    </div>
  );
}
