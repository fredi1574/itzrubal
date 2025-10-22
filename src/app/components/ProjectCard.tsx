"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "../lib/LocaleProvider";

type Props = {
  slug: string;
  title: string;
  location?: string;
  coverUrl?: string;
};

export default function ProjectCard({
  slug,
  title,
  location,
  coverUrl,
}: Props) {
  const { t } = useLocale();
  return (
    <Link
      href={`/projects/${slug}`}
      className="group block transition-all duration-300 hover:scale-[1.03]"
    >
      <div className="aspect-square overflow-hidden bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)] relative">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            width={1200}
            height={900}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="px-4 py-2 border-2 border-white text-lg font-medium text-white transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {t("projects.viewProject") as string}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="heading-sm group-hover:text-accent transition-colors duration-300">
            {title}
          </div>
          {location && (
            <div className="text-caption text-foreground/60 group-hover:text-foreground/80 transition-colors duration-300">
              {location}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
