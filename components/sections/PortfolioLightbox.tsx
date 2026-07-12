"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortfolioItem } from "@/types";
import Image from "next/image";
import { X } from "lucide-react";
import { getPlaceholder, getPlaceholderImageUrl } from "@/lib/placeholder";
import { useEffect } from "react";

interface PortfolioLightboxProps {
  item: PortfolioItem;
  onClose: () => void;
}

export function PortfolioLightbox({ item, onClose }: PortfolioLightboxProps) {
  const placeholder = getPlaceholder((item.imageKey as any) || "square");

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-6 right-6 text-ivory hover:text-gold-500 transition-colors z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-8 h-8" />
        </motion.button>

        {/* Content */}
        <motion.div
          className="max-w-4xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Video or Image */}
          <div className="mb-8">
            {item.isVideo && item.videoUrl ? (
              <video
                src={item.videoUrl}
                controls
                className="w-full h-auto rounded-lg bg-black"
                autoPlay
              />
            ) : (
              <Image
                src={getPlaceholderImageUrl(item.imageKey as any)}
                alt={item.title}
                width={placeholder.width}
                height={placeholder.height}
                className="w-full h-auto rounded-lg"
                placeholder="blur"
                blurDataURL={placeholder.blurDataURL}
              />
            )}
          </div>

          {/* Info */}
          <div className="bg-charcoal/50 backdrop-blur-sm rounded-lg p-6 md:p-8">
            <h2 className="font-serif text-4xl font-light text-ivory mb-2">
              {item.title}
            </h2>
            <p className="font-sans text-sm text-gold-500 uppercase tracking-wider mb-6">
              {item.category}
            </p>
            {item.description && (
              <p className="font-sans text-warmgray leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
