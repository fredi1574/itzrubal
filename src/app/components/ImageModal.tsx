"use client";

import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import { useLocale } from "../lib/LocaleProvider";

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
};

export default function ImageModal({
  isOpen,
  onClose,
  src,
  alt,
  caption,
}: ImageModalProps) {
  const { t } = useLocale();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        aria-label="Close image"
      >
        <IoClose className="w-6 h-6" />
      </button>

      {/* Image Container */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full max-w-6xl max-h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            priority
            sizes="90vw"
          />
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded text-sm max-w-md text-center">
          {caption}
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-xs">
        {t("gallery.pressEscToClose") as string}
      </div>
    </div>
  );
}
