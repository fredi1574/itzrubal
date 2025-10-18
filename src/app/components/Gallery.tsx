"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type GalleryItem = {
  beforeUrl?: string;
  afterUrl?: string;
  caption?: string;
  url?: string;
  alt?: string;
  type?: "before-after" | "single" | "panorama";
};

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [lightbox, setLightbox] = useState<null | {
    url: string;
    alt: string;
    caption?: string;
  }>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="mt-4">
      {/* Enhanced Gallery Grid */}
      <div className="grid gap-6">
        {items.map((g, i) => {
          const itemType =
            g.type || (g.beforeUrl && g.afterUrl ? "before-after" : "single");

          if (itemType === "before-after") {
            return (
              <div key={i} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground/60 uppercase tracking-wide">
                      Before
                    </h4>
                    <BlurImage
                      url={g.beforeUrl}
                      alt={g.caption ? `${g.caption} (before)` : `Before`}
                      onClick={() =>
                        g.beforeUrl &&
                        setLightbox({
                          url: g.beforeUrl,
                          alt: "Before",
                          caption: g.caption,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground/60 uppercase tracking-wide">
                      After
                    </h4>
                    <BlurImage
                      url={g.afterUrl}
                      alt={g.caption ? `${g.caption} (after)` : `After`}
                      onClick={() =>
                        g.afterUrl &&
                        setLightbox({
                          url: g.afterUrl,
                          alt: "After",
                          caption: g.caption,
                        })
                      }
                    />
                  </div>
                </div>
                {g.caption && (
                  <div className="text-center">
                    <p className="text-sm text-foreground/70 italic">
                      {g.caption}
                    </p>
                  </div>
                )}
              </div>
            );
          }

          if (itemType === "panorama") {
            return (
              <div key={i} className="space-y-4">
                <BlurImage
                  url={g.url || g.beforeUrl}
                  alt={g.alt || g.caption || `Gallery image ${i + 1}`}
                  onClick={() =>
                    (g.url || g.beforeUrl) &&
                    setLightbox({
                      url: g.url || g.beforeUrl!,
                      alt: g.alt || g.caption || `Gallery image ${i + 1}`,
                      caption: g.caption,
                    })
                  }
                  className="aspect-[21/9]"
                />
                {g.caption && (
                  <div className="text-center">
                    <p className="text-sm text-foreground/70 italic">
                      {g.caption}
                    </p>
                  </div>
                )}
              </div>
            );
          }

          // Single image
          return (
            <div key={i} className="space-y-4">
              <BlurImage
                url={g.url || g.beforeUrl}
                alt={g.alt || g.caption || `Gallery image ${i + 1}`}
                onClick={() =>
                  (g.url || g.beforeUrl) &&
                  setLightbox({
                    url: g.url || g.beforeUrl!,
                    alt: g.alt || g.caption || `Gallery image ${i + 1}`,
                    caption: g.caption,
                  })
                }
              />
              {g.caption && (
                <div className="text-center">
                  <p className="text-sm text-foreground/70 italic">
                    {g.caption}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Enhanced Lightbox */}
      {lightbox ? (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-7xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              className="absolute -top-12 right-0 text-white/80 hover:text-white text-lg z-10"
              onClick={() => setLightbox(null)}
            >
              ✕ Close
            </button>
            <div className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm">
              <Image
                src={lightbox.url}
                alt={lightbox.alt}
                width={2000}
                height={1500}
                className="h-auto w-full object-contain max-h-[80vh]"
                priority
              />
            </div>
            {lightbox.caption && (
              <div className="mt-4 text-center">
                <p className="text-sm text-white/80">{lightbox.caption}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BlurImage({
  url,
  alt,
  onClick,
  className = "aspect-[4/3]",
}: {
  url?: string;
  alt: string;
  onClick?: () => void;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  if (!url) {
    return (
      <div
        className={`${className} rounded-xl bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)]`}
      />
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="group block overflow-hidden rounded-xl"
    >
      <div
        className={`relative ${className} w-full ${
          loaded
            ? ""
            : "bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)] animate-pulse"
        }`}
      >
        <Image
          src={url}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className={`object-cover transition duration-300 ${
            loaded ? "blur-0" : "blur-sm"
          }`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      </div>
    </button>
  );
}
