import { useLocale } from "./LocaleProvider";
import type { Project } from "./types";

export function useLocalizedContent(project: Project) {
  const { locale } = useLocale();

  return {
    title: locale === "he" && project.titleHe ? project.titleHe : project.title,
    location:
      locale === "he" && project.locationHe
        ? project.locationHe
        : project.location,
    description:
      locale === "he" && project.descriptionHe
        ? project.descriptionHe
        : project.description,
    highlights:
      locale === "he" && project.highlightsHe
        ? project.highlightsHe
        : project.highlights,
    challenges:
      locale === "he" && project.challengesHe
        ? project.challengesHe
        : project.challenges,
    team: locale === "he" && project.teamHe ? project.teamHe : project.team,
    materials:
      locale === "he" && project.materialsHe
        ? project.materialsHe
        : project.materials,
  };
}
