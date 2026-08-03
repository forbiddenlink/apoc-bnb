"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Skull } from "lucide-react";
import { guestStories } from "@/lib/data/guest-stories";

export function GuestStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = guestStories[currentIndex];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % guestStories.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % guestStories.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + guestStories.length) % guestStories.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-secondary text-secondary" : "text-muted"
        }`}
      />
    ));
  };

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-label text-secondary mb-2 tracking-[0.25em]">
            FIELD REPORTS · REDACTED FOR MORALE
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Guest &#34;Testimonials&#34;
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Real reviews from real survivors. Results may vary. Survival not guaranteed.
          </p>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-black border-2 border-secondary/50 rounded-sm p-5 sm:p-8 relative overflow-hidden">
            {/* CRT scanlines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  rgba(0, 255, 0, 0.15),
                  rgba(0, 255, 0, 0.15) 1px,
                  transparent 1px,
                  transparent 2px
                )`,
              }}
            />

            {/* Terminal chrome header */}
            <div className="relative z-10 flex items-center justify-between gap-3 mb-5 pb-3 border-b border-secondary/20 font-mono text-[10px] sm:text-xs tracking-wider text-secondary/70 uppercase">
              <span>LOG //{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="truncate">
                {currentStory.survived ? "STATUS: ALIVE" : "STATUS: …COMPLICATED"}
              </span>
              <span className="hidden sm:inline tabular-nums">
                {currentIndex + 1}/{guestStories.length}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="relative z-10 min-h-[9.5rem] sm:min-h-[8rem]"
              >
                <blockquote className="text-base sm:text-xl font-mono text-secondary mb-6 leading-relaxed pr-0">
                  &#34;{currentStory.quote}&#34;
                </blockquote>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-secondary">{currentStory.guestName}</p>
                      {!currentStory.survived && (
                        <Skull className="h-4 w-4 text-accent" aria-hidden="true" />
                      )}
                    </div>
                    <p className="text-sm text-secondary/70">
                      Stayed at {currentStory.bunkerRef}
                    </p>
                  </div>
                  <div className="flex gap-0.5" aria-label={`${currentStory.rating} star rating`}>
                    {renderStars(currentStory.rating)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls BELOW the quote — never over text */}
            <div className="relative z-10 mt-6 pt-4 border-t border-secondary/20 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goToPrev}
                className="inline-flex items-center gap-1.5 border border-secondary/40 bg-black/80 px-3 py-2 text-xs font-mono uppercase tracking-widest text-secondary hover:bg-secondary/15 hover:border-secondary transition-colors"
                aria-label="Previous story"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="flex justify-center gap-2 flex-wrap">
                {guestStories.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-secondary w-8"
                        : "bg-secondary/30 w-2 hover:bg-secondary/50"
                    }`}
                    aria-label={`Go to story ${index + 1}`}
                    aria-current={index === currentIndex ? "true" : undefined}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToNext}
                className="inline-flex items-center gap-1.5 border border-secondary/40 bg-black/80 px-3 py-2 text-xs font-mono uppercase tracking-widest text-secondary hover:bg-secondary/15 hover:border-secondary transition-colors"
                aria-label="Next story"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="absolute inset-0 -z-10 bg-secondary/10 blur-xl rounded-sm" />
        </div>
      </div>
    </section>
  );
}
