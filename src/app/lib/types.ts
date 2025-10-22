export type GalleryItem = {
  beforeUrl?: string;
  afterUrl?: string;
  caption?: string;
  url?: string;
  alt?: string;
  type?: "before-after" | "single" | "panorama";
};

export type Project = {
  slug: string;
  title: string;
  titleHe?: string;
  location?: string;
  locationHe?: string;
  description?: string;
  descriptionHe?: string;
  coverUrl?: string;
  completionDate?: string;
  size?: string;
  timeline?: string;
  budget?: string;
  team?: string[];
  teamHe?: string[];
  materials?: string[];
  materialsHe?: string[];
  highlights?: string[];
  highlightsHe?: string[];
  challenges?: string;
  challengesHe?: string;
  gallery?: GalleryItem[];
};

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

export type Locale = "en" | "he";

export type Dictionary = Record<string, unknown>;
