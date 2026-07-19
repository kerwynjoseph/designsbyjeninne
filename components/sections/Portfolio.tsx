"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioItems, portfolioCategories } from "@/lib/data/portfolio";
import { MOTION } from "@/lib/motion";
import { Play, X } from "lucide-react";

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Handle ESC key to close video
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    if (selectedVideo) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [selectedVideo]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return portfolioItems;
    }
    return portfolioItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 md:px-12 bg-charcoal/30">
      <div className="max-w-7xl mx-auto">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: MOTION.normal }}
          className="mb-16 flex flex-wrap gap-3 justify-center"
        >
          {portfolioCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gold-500 text-ink"
                  : "bg-charcoal/50 text-warmgray border border-gold-500/30 hover:border-gold-500"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ duration: MOTION.normal, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                {item.isVideo && item.videoUrl ? (
                  <div
                    onClick={() => setSelectedVideo(item.videoUrl!)}
                    className="relative aspect-video bg-charcoal rounded-lg overflow-hidden border border-gold-500/20 hover:border-gold-500 transition-all duration-300"
                  >
                    {!getVimeoId(item.videoUrl) ? (
                      <video
                        src={item.videoUrl}
                        className="w-full h-full object-cover"
                        onMouseEnter={(e) => {
                          (e.target as HTMLVideoElement).play();
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLVideoElement).pause();
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-charcoal to-charcoal/80" />
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-gold-500 p-4 rounded-full"
                      >
                        <Play className="w-6 h-6 text-ink fill-ink" />
                      </motion.div>
                    </div>
                  </div>
                ) : null}

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: MOTION.normal, delay: 0.2 }}
                  className="mt-4"
                >
                  <p className="font-sans text-xs text-gold-500 uppercase tracking-wider mb-2">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-xl font-light text-ivory mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-warmgray">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Video Lightbox */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl flex flex-col items-center"
            >
              {getVimeoId(selectedVideo) ? (
                <iframe
                  src={`https://player.vimeo.com/video/${getVimeoId(selectedVideo)}`}
                  className="w-full h-auto aspect-video rounded-lg"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedVideo}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                  autoPlay
                  controls
                />
              )}
              {/* Close button below player */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedVideo(null)}
                className="mt-8 px-8 py-3 bg-white text-ink hover:bg-gold-300 rounded-lg font-sans font-medium uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <X className="w-5 h-5" />
                Close Video
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
