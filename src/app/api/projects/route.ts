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

    // Merge CMS with sample; prefer CMS by slug, then fill remaining samples
    const bySlug = new Map<string, Project>();
    for (const p of cmsProjects) bySlug.set(p.slug, p);
    for (const s of sampleProjects)
      if (!bySlug.has(s.slug)) bySlug.set(s.slug, s);
    const merged = Array.from(bySlug.values());

    return NextResponse.json({ projects: merged });
  } catch {
    // On any error, return sample data so page isn't empty
    return NextResponse.json({ projects: sampleProjects }, { status: 200 });
  }
}
