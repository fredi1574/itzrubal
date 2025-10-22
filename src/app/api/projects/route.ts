import { NextResponse } from "next/server";
import { projects as sampleProjects } from "@/app/lib/sampleData";

type Project = {
  slug: string;
  title: string;
  location?: string;
  coverUrl?: string;
};

const SANITY_PROJECT_ID = "22xxdrf2"; // from studio/sanity.config.ts
const SANITY_DATASET = "project";
const SANITY_API_VERSION = "2023-10-01";

const GROQ = encodeURIComponent(`*[_type == "project"]{ 
  "slug": slug.current,
  title,
  description,
  location,
  "coverUrl": coalesce(coverImage.asset->url, ""),
}[0...50]`);

export async function GET() {
  try {
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${GROQ}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch Sanity");
    const data = await res.json();
    const cmsProjects: Project[] = Array.isArray(data.result)
      ? data.result
      : [];

    // Merge Sanity projects with sample projects
    // Sanity projects take priority by slug, then add sample projects
    const bySlug = new Map<string, Project>();

    // Add Sanity projects first (they take priority)
    for (const p of cmsProjects) {
      bySlug.set(p.slug, p);
    }

    // Add sample projects that don't conflict with Sanity projects
    for (const s of sampleProjects) {
      if (!bySlug.has(s.slug)) {
        bySlug.set(s.slug, s);
      }
    }

    const merged = Array.from(bySlug.values());
    return NextResponse.json({ projects: merged });
  } catch (error) {
    console.error("API Error:", error);
    // On any error, return sample data so portfolio isn't empty
    return NextResponse.json({ projects: sampleProjects });
  }
}
