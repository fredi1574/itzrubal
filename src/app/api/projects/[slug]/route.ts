import { NextResponse } from "next/server";

const SANITY_PROJECT_ID = "22xxdrf2";
const SANITY_DATASET = "project";
const SANITY_API_VERSION = "2023-10-01";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const query =
      encodeURIComponent(`*[_type == "project" && slug.current == "${slug}"][0]{
      "slug": slug.current,
      title,
      description,
      "coverUrl": coalesce(coverImage.asset->url, ""),
      completionDate,
      size,
      budget,
      team,
      materials,
      timeline,
      challenges,
      highlights,
      gallery[]{
        "beforeUrl": coalesce(beforeImage.asset->url, ""),
        "afterUrl": coalesce(afterImage.asset->url, ""),
        "url": coalesce(image.asset->url, ""),
        alt,
        caption,
        type
      }
    }`);
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch Sanity");
    const data = await res.json();
    const project = data?.result ?? null;
    if (project) return NextResponse.json({ project });
  } catch (error) {
    console.error("Project API Error:", error);
  }

  // If no Sanity project found, return null so frontend can fallback
  return NextResponse.json({ project: null }, { status: 404 });
}
