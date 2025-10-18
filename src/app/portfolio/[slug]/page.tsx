import { notFound } from "next/navigation";
import Section from "../../components/Section";
import Image from "next/image";
import Gallery from "../../components/Gallery";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

type GalleryItem = {
  beforeUrl?: string;
  afterUrl?: string;
  caption?: string;
};

type Project = {
  slug: string;
  title: string;
  location?: string;
  description?: string;
  coverUrl?: string;
  gallery?: GalleryItem[];
  completionDate?: string;
  size?: string;
  budget?: string;
  team?: string[];
  materials?: string[];
  timeline?: string;
  challenges?: string;
  highlights?: string[];
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
  } catch {
    // Fallback to sample data if API fails
    const { projects } = await import("../../lib/sampleData");
    return projects.find(p => p.slug === slug) || null;
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return notFound();

  return (
    <main>
      {/* Hero Section */}
      <div className="relative">
        {project.coverUrl ? (
          <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
            <Image
              src={project.coverUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12">
              <div className="max-w-4xl">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4">
                  {project.title}
                </h1>
                {project.location && (
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 sm:mb-6">
                    {project.location}
                  </p>
                )}
                {project.description && (
                  <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[70vh] min-h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4">
                {project.title}
              </h1>
              {project.location && (
                <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 mb-4 sm:mb-6">
                  {project.location}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Project Details Section */}
      <Section title="Project Overview">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {project.description && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  About This Project
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {/* Project Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Highlights</h3>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/80">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges */}
            {project.challenges && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Design Challenges
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            )}
          </div>

          {/* Project Meta Information */}
          <div className="space-y-4 lg:space-y-6">
            <div className="card p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Project Details</h3>
              <div className="space-y-3">
                {project.completionDate && (
                  <div>
                    <span className="text-sm font-medium text-foreground/60">
                      Completion Date
                    </span>
                    <p className="text-foreground">{project.completionDate}</p>
                  </div>
                )}
                {project.size && (
                  <div>
                    <span className="text-sm font-medium text-foreground/60">
                      Size
                    </span>
                    <p className="text-foreground">{project.size}</p>
                  </div>
                )}
                {project.timeline && (
                  <div>
                    <span className="text-sm font-medium text-foreground/60">
                      Timeline
                    </span>
                    <p className="text-foreground">{project.timeline}</p>
                  </div>
                )}
                {project.budget && (
                  <div>
                    <span className="text-sm font-medium text-foreground/60">
                      Budget Range
                    </span>
                    <p className="text-foreground">{project.budget}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Materials */}
            {project.materials && project.materials.length > 0 && (
              <div className="card p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">Materials Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.materials.map((material, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Team */}
            {project.team && project.team.length > 0 && (
              <div className="card p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">Project Team</h3>
                <ul className="space-y-2">
                  {project.team.map((member, index) => (
                    <li key={index} className="text-foreground/80">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      {Array.isArray(project.gallery) && project.gallery.length > 0 && (
        <Section title="Project Gallery">
          <Gallery items={project.gallery} />
        </Section>
      )}
    </main>
  );
}
