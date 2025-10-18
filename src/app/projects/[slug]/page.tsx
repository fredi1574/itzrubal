import { headers } from "next/headers";
import { notFound } from "next/navigation";
import ProjectPageClient from "./ProjectPageClient";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

type GalleryItem = {
  beforeUrl?: string;
  afterUrl?: string;
  caption?: string;
  url?: string;
  alt?: string;
  type?: "before-after" | "single" | "panorama";
};

type Project = {
  slug: string;
  title: string;
  titleHe?: string;
  location?: string;
  locationHe?: string;
  description?: string;
  descriptionHe?: string;
  coverUrl?: string;
  gallery?: GalleryItem[];
  completionDate?: string;
  size?: string;
  budget?: string;
  team?: string[];
  teamHe?: string[];
  materials?: string[];
  materialsHe?: string[];
  timeline?: string;
  challenges?: string;
  challengesHe?: string;
  highlights?: string[];
  highlightsHe?: string[];
};

async function getProject(slug: string) {
  try {
    const hdrs = await headers();
    const proto = hdrs.get("x-forwarded-proto") || "http";
    const host = hdrs.get("host") || "localhost:3000";
    const url = `${proto}://${host}/api/projects/${slug}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("failed");
    const data = await res.json();
    return (data?.project as Project) ?? null;
  } catch (error) {
    console.error("Project API Error:", error);
    // Fallback to sample data if API fails
    const { projects } = await import("../../lib/sampleData");
    return projects.find((p) => p.slug === slug) || null;
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return notFound();

  return <ProjectPageClient project={project} />;
}
