"use client";

import Image from "next/image";
import ImageCarousel from "../../components/ImageCarousel";
import { ButtonLink } from "../../components/Button";
import { useLocale } from "../../lib/LocaleProvider";
import { Project } from "../../lib/types";

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
    <div className="min-h-screen">
      {/* Compact Hero Section */}
      <div className="relative">
        {project.coverUrl ? (
          <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
            <Image
              src={project.coverUrl}
              alt={getLocalizedTitle()}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                  <div className="lg:col-span-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">
                      {getLocalizedTitle()}
                    </h1>
                    {getLocalizedLocation() && (
                      <p className="text-lg sm:text-xl text-white/90 mb-3 sm:mb-4">
                        {getLocalizedLocation()}
                      </p>
                    )}
                    {getLocalizedDescription() && (
                      <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
                        {getLocalizedDescription()}
                      </p>
                    )}
                  </div>

                  {/* Quick Project Info */}
                  <div className=" p-4 sm:p-6 border bg-background/20 border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {t("projects.projectDetails") as string}
                    </h3>
                    <div className="space-y-3 text-sm">
                      {project.completionDate && (
                        <div className="flex justify-between">
                          <span className="text-white/70">
                            {t("projects.completionDate") as string}
                          </span>
                          <span className="text-white">
                            {project.completionDate}
                          </span>
                        </div>
                      )}
                      {project.size && (
                        <div className="flex justify-between">
                          <span className="text-white/70">
                            {t("projects.size") as string}
                          </span>
                          <span className="text-white">{project.size}</span>
                        </div>
                      )}
                      {project.timeline && (
                        <div className="flex justify-between">
                          <span className="text-white/70">
                            {t("projects.timeline") as string}
                          </span>
                          <span className="text-white">{project.timeline}</span>
                        </div>
                      )}
                      {project.budget && (
                        <div className="flex justify-between">
                          <span className="text-white/70">
                            {t("projects.budgetRange") as string}
                          </span>
                          <span className="text-white">{project.budget}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[50vh] min-h-[400px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
                {getLocalizedTitle()}
              </h1>
              {getLocalizedLocation() && (
                <p className="text-lg sm:text-xl text-foreground/70 mb-3 sm:mb-4">
                  {getLocalizedLocation()}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Back Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-0">
        <div className="max-w-6xl mx-auto">
          <ButtonLink
            href="/projects"
            variant="ghost"
            className={`
              group inline-flex items-center gap-2
              px-4 py-2 bg-background/80 border border-accent/30
              text-caption text-accent font-medium
              shadow-sm hover:bg-accent/10 transition-all duration-200
              backdrop-blur-sm
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
            `}
            style={{ boxShadow: "0 2px 8px 0 rgba(169,99,96,0.1)" }}
          >
            <span className="font-playfair tracking-wide uppercase">
              {t("projects.backToProjects") as string}
            </span>
            <svg
              className="w-4 h-4 text-accent group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </ButtonLink>
        </div>
      </div>

      {/* Compact Project Details */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Main Content - 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Project Highlights - Compact Grid */}
              {getLocalizedHighlights() &&
                getLocalizedHighlights()!.length > 0 && (
                  <div className="bg-transparent p-4 sm:p-6 border border-accent/20">
                    <h3 className="text-lg font-semibold mb-4">
                      {t("projects.keyHighlights") as string}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {getLocalizedHighlights()!.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">
                            •
                          </span>
                          <span className="text-foreground/80 text-sm">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Challenges - Compact */}
              {getLocalizedChallenges() && (
                <div className="bg-transparent p-4 sm:p-6 border border-accent/20">
                  <h3 className="text-lg font-semibold mb-4">
                    {t("projects.designChallenges") as string}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed text-sm">
                    {getLocalizedChallenges()}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-4">
              {/* Materials */}
              {getLocalizedMaterials() &&
                getLocalizedMaterials()!.length > 0 && (
                  <div className="bg-transparent p-4 sm:p-6 border border-accent/20">
                    <h3 className="text-lg font-semibold mb-4">
                      {t("projects.materialsUsed") as string}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {getLocalizedMaterials()!.map((material, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Team */}
              {getLocalizedTeam() && getLocalizedTeam()!.length > 0 && (
                <div className="bg-transparent p-4 sm:p-6 border border-accent/20">
                  <h3 className="text-lg font-semibold mb-4">
                    {t("projects.projectTeam") as string}
                  </h3>
                  <ul className="space-y-2">
                    {getLocalizedTeam()!.map((member, index) => (
                      <li key={index} className="text-foreground/80 text-sm">
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Gallery Section */}
      {Array.isArray(project.gallery) && project.gallery.length > 0 && (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t("projects.projectGallery") as string}
            </h2>
            <ImageCarousel
              items={project.gallery}
              beforeText={t("projects.before") as string}
              afterText={t("projects.after") as string}
            />
          </div>
        </div>
      )}
    </div>
  );
}
