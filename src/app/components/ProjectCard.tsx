import Link from "next/link";
import Image from "next/image";

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
  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group block transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)] relative">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            width={1200}
            height={900}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            priority={false}
          />
        ) : null}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* View indicator */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          View Project
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
        <span className="text-caption text-foreground/60 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
          View →
        </span>
      </div>
    </Link>
  );
}
