"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type GalleryItem = {
  beforeUrl?: string;
  afterUrl?: string;
  caption?: string;
  url?: string;
  alt?: string;
  type?: "before-after" | "single" | "panorama";
};

type ImageCarouselProps = {
  items: GalleryItem[];
  beforeText?: string;
  afterText?: string;
};

export default function ImageCarousel({
  items,
  beforeText = "Before",
  afterText = "After",
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      updateSliderPosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateSliderPosition(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];
  const itemType =
    currentItem.type ||
    (currentItem.beforeUrl && currentItem.afterUrl ? "before-after" : "single");

  return (
    <div className="relative">
      {/* Main Image Display */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-100">
        {itemType === "before-after" ? (
          <div
            ref={sliderRef}
            className="relative h-full cursor-col-resize select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Before Image */}
            <div className="absolute inset-0">
              {currentItem.beforeUrl ? (
                <Image
                  src={currentItem.beforeUrl}
                  alt={
                    currentItem.caption
                      ? `${currentItem.caption} (before)`
                      : `Before`
                  }
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            {/* After Image with clipping */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              {currentItem.afterUrl ? (
                <Image
                  src={currentItem.afterUrl}
                  alt={
                    currentItem.caption
                      ? `${currentItem.caption} (after)`
                      : `After`
                  }
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-accent/40 shadow-lg z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Slider Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-full shadow-lg flex items-center justify-center cursor-col-resize"></div>
            </div>

            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium pointer-events-none">
              {beforeText}
            </div>
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium pointer-events-none">
              {afterText}
            </div>
          </div>
        ) : itemType === "panorama" ? (
          <div className="relative w-full h-full">
            {currentItem.url || currentItem.beforeUrl ? (
              <Image
                src={currentItem.url || currentItem.beforeUrl!}
                alt={
                  currentItem.alt ||
                  currentItem.caption ||
                  `Gallery image ${currentIndex + 1}`
                }
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            {currentItem.url || currentItem.beforeUrl ? (
              <Image
                src={currentItem.url || currentItem.beforeUrl!}
                alt={
                  currentItem.alt ||
                  currentItem.caption ||
                  `Gallery image ${currentIndex + 1}`
                }
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
        )}

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
              aria-label="Previous image"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
              aria-label="Next image"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {items.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs z-20">
            {currentIndex + 1} / {items.length}
          </div>
        )}
      </div>

      {/* Caption */}
      {currentItem.caption && (
        <div className="mt-3 text-center">
          <p className="text-sm text-foreground/70 italic">
            {currentItem.caption}
          </p>
        </div>
      )}

      {/* Thumbnail Navigation */}
      {items.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all ${
                index === currentIndex
                  ? "ring-2 ring-primary scale-105"
                  : "opacity-60 hover:opacity-80"
              }`}
            >
              {item.url || item.beforeUrl ? (
                <Image
                  src={item.url || item.beforeUrl!}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
