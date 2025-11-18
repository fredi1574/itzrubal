import Image from "next/image";

type GalleryItem = {
  beforeUrl?: string;
  afterUrl?: string;
  caption?: string;
  url?: string;
  alt?: string;
  type?: "before-after" | "single" | "panorama";
};

type GalleryProps = {
  items: GalleryItem[];
  beforeText?: string;
  afterText?: string;
};

export default function Gallery({
  items,
  beforeText = "Before",
  afterText = "After",
}: GalleryProps) {
  return (
    <div className="grid">
      {items.map((g, i) => {
        const itemType =
          g.type || (g.beforeUrl && g.afterUrl ? "before-after" : "single");

        if (itemType === "before-after") {
          return (
            <div key={i} className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-medium text-foreground/60 uppercase tracking-wide">
                    {beforeText}
                  </h4>
                  {g.beforeUrl ? (
                    <div className="relative aspect-[4/3] w-full max-w-sm mx-auto overflow-hidden">
                      <Image
                        src={g.beforeUrl}
                        alt={g.caption ? `${g.caption} (before)` : `Before`}
                        width={800}
                        height={600}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] w-full max-w-sm mx-auto bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)]" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-medium text-foreground/60 uppercase tracking-wide">
                    {afterText}
                  </h4>
                  {g.afterUrl ? (
                    <div className="relative aspect-[4/3] w-full max-w-sm mx-auto overflow-hidden">
                      <Image
                        src={g.afterUrl}
                        alt={g.caption ? `${g.caption} (after)` : `After`}
                        width={800}
                        height={600}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] w-full max-w-sm mx-auto bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)]" />
                  )}
                </div>
              </div>
              {g.caption && (
                <div className="text-center">
                  <p className="text-xs leading-tight text-foreground/70 italic">
                    {g.caption}
                  </p>
                </div>
              )}
            </div>
          );
        }

        if (itemType === "panorama") {
          return (
            <div key={i} className="space-y-2">
              {g.url || g.beforeUrl ? (
                <div className="relative aspect-[21/9] w-full max-w-sm mx-auto overflow-hidden">
                  <Image
                    src={g.url || g.beforeUrl!}
                    alt={g.alt || g.caption || `Gallery image ${i + 1}`}
                    width={1600}
                    height={686}
                    sizes="(max-width: 640px) 100vw, 100vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[21/9] w-full max-w-sm mx-auto bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)]" />
              )}
              {g.caption && (
                <div className="text-center">
                  <p className="text-xs leading-tight text-foreground/70 italic">
                    {g.caption}
                  </p>
                </div>
              )}
            </div>
          );
        }

        // Single image
        return (
          <div key={i} className="space-y-2">
            {g.url || g.beforeUrl ? (
              <div className="relative aspect-[4/3] w-full max-w-sm mx-auto overflow-hidden">
                <Image
                  src={g.url || g.beforeUrl!}
                  alt={g.alt || g.caption || `Gallery image ${i + 1}`}
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] w-full max-w-sm mx-auto bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)]" />
            )}
            {g.caption && (
              <div className="text-center">
                <p className="text-xs leading-tight text-foreground/70 italic">
                  {g.caption}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
