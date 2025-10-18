import { NextResponse } from "next/server";

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

    // If we have Sanity projects, return them
    if (cmsProjects.length > 0) {
      return NextResponse.json({ projects: cmsProjects });
    }

    // If no Sanity projects, return empty array so frontend can fallback
    return NextResponse.json({ projects: [] });
  } catch (error) {
    console.error("API Error:", error);
    // On any error, return empty array so frontend can fallback
    return NextResponse.json({ projects: [] });
  }
}
