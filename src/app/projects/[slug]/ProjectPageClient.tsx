"use client";

import Image from "next/image";
import Gallery from "../../components/Gallery";
import Section from "../../components/Section";
import { useLocale } from "../../lib/LocaleProvider";

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

type Props = {
  project: Project;
};

export default function ProjectPageClient({ project }: Props) {
  const { t, locale } = useLocale();

  // Helper functions to get localized content
  const getLocalizedTitle = () => {
    return locale === "he" && project.titleHe ? project.titleHe : project.title;
  };

  const getLocalizedLocation = () => {
    return locale === "he" && project.locationHe
      ? project.locationHe
      : project.location;
  };

  const getLocalizedDescription = () => {
    return locale === "he" && project.descriptionHe
      ? project.descriptionHe
      : project.description;
  };

  const getLocalizedHighlights = () => {
    return locale === "he" && project.highlightsHe
      ? project.highlightsHe
      : project.highlights;
  };

  const getLocalizedChallenges = () => {
    return locale === "he" && project.challengesHe
      ? project.challengesHe
      : project.challenges;
  };

  const getLocalizedTeam = () => {
    return locale === "he" && project.teamHe ? project.teamHe : project.team;
  };

  const getLocalizedMaterials = () => {
    return locale === "he" && project.materialsHe
      ? project.materialsHe
      : project.materials;
  };

  return (
    <main>
      {/* Hero Section */}
      <div className="relative">
        {project.coverUrl ? (
          <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
            <Image
              src={project.coverUrl}
              alt={getLocalizedTitle()}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12">
              <div className="max-w-4xl">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4">
                  {getLocalizedTitle()}
                </h1>
                {getLocalizedLocation() && (
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 sm:mb-6">
                    {getLocalizedLocation()}
                  </p>
                )}
                {getLocalizedDescription() && (
                  <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
                    {getLocalizedDescription()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[70vh] min-h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4">
                {getLocalizedTitle()}
              </h1>
              {getLocalizedLocation() && (
                <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 mb-4 sm:mb-6">
                  {getLocalizedLocation()}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Project Details Section */}
      <Section title={t("projects.projectOverview") as string}>
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {project.description && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {t("projects.aboutThisProject") as string}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {getLocalizedDescription()}
                </p>
              </div>
            )}

            {/* Project Highlights */}
            {getLocalizedHighlights() &&
              getLocalizedHighlights()!.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {t("projects.keyHighlights") as string}
                  </h3>
                  <ul className="space-y-2">
                    {getLocalizedHighlights()!.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-foreground/80">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Challenges */}
            {getLocalizedChallenges() && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {t("projects.designChallenges") as string}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {getLocalizedChallenges()}
                </p>
              </div>
            )}
          </div>

          {/* Project Meta Information */}
          <div className="space-y-4 lg:space-y-6">
            <div className="card p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">
                {t("projects.projectDetails") as string}
              </h3>
              <div className="space-y-3">
                {project.completionDate && (
                  <div>
                    <span className="text-sm font-medium text-foreground/60">
                      {t("projects.completionDate") as string}
                    </span>
                    <p className="text-foreground">{project.completionDate}</p>
                  </div>
                )}
                {project.size && (
                  <div>
                    <span className="text-sm font-medium text-foreground/60">
                      {t("projects.size") as string}
                    </span>
                    <p className="text-foreground">{project.size}</p>
                  </div>
                )}
                {project.timeline && (
                  <div>
                    <span className="text-sm font-medium text-foreground/60">
                      {t("projects.timeline") as string}
                    </span>
                    <p className="text-foreground">{project.timeline}</p>
                  </div>
                )}
                {project.budget && (
                  <div>
                    <span className="text-sm font-medium text-foreground/60">
                      {t("projects.budgetRange") as string}
                    </span>
                    <p className="text-foreground">{project.budget}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Materials */}
            {getLocalizedMaterials() && getLocalizedMaterials()!.length > 0 && (
              <div className="card p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {t("projects.materialsUsed") as string}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getLocalizedMaterials()!.map((material, index) => (
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
            {getLocalizedTeam() && getLocalizedTeam()!.length > 0 && (
              <div className="card p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {t("projects.projectTeam") as string}
                </h3>
                <ul className="space-y-2">
                  {getLocalizedTeam()!.map((member, index) => (
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
        <Section title={t("projects.projectGallery") as string}>
          <Gallery
            items={project.gallery}
            beforeText={t("projects.before") as string}
            afterText={t("projects.after") as string}
          />
        </Section>
      )}
    </main>
  );
}
