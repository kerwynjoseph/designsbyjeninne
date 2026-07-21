"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PortfolioItem } from "@/types";
import { getPlaceholder, getPlaceholderImageUrl } from "@/lib/placeholder";
import { useState } from "react";
import { PortfolioLightbox } from "./PortfolioLightbox";
import { MOTION } from "@/lib/motion";

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const selectedItem = items.find((item) => item.id === selectedItemId);

  return (
    <>
      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 lg:gap-10">
        {items.map((item, idx) => {
          const placeholder = getPlaceholder(
            (item.imageKey as any) || "square"
          );

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: MOTION.normal,
                delay: idx * 0.05,
              }}
              className="break-inside-avoid mb-8 cursor-pointer group"
              onClick={() => setSelectedItemId(item.id)}
              data-cursor="hover"
            >
              <div className="relative overflow-hidden rounded-lg bg-charcoal">
                {/* Video or Image */}
                <motion.div
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.isVideo && item.videoUrl ? (
                    // Video thumbnail with play button
                    <div className="relative">
                      <video
                        src={item.videoUrl}
                        className="w-full h-auto block bg-black"
                        onLoadedMetadata={(e) => {
                          // This captures the video thumbnail
                        }}
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg
                            className="w-8 h-8 text-ink ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Image
                    <Image
                      src={getPlaceholderImageUrl(item.imageKey as any)}
                      alt={item.title}
                      width={placeholder.width}
                      height={placeholder.height}
                      className="w-full h-auto block"
                      placeholder="blur"
                      blurDataURL={placeholder.blurDataURL}
                    />
                  )}

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div>
                      <h3 className="font-serif text-xl font-light text-ivory mb-2">
                        {item.title}
                      </h3>
                      <p className="font-sans text-sm text-warmgray">
                        {item.category}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Title below (always visible) */}
              <motion.div className="pt-4">
                <h3 className="font-serif text-lg font-light text-ivory mb-1">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-gold-500 uppercase tracking-wider">
                  {item.category}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <PortfolioLightbox
          item={selectedItem}
          onClose={() => setSelectedItemId(null)}
        />
      )}
    </>
  );
}
