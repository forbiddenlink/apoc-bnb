"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Skull } from "lucide-react";
import { guestStories } from "@/lib/data/guest-stories";

export function GuestStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = guestStories[currentIndex];

  // Auto-rotate stories
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
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Guest &#34;Testimonials&#34;
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Real reviews from real survivors. Results may vary. Survival not guaranteed.
          </p>
        </div>

        {/* Story Carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Terminal-style container */}
          <div className="bg-black border-2 border-secondary/50 rounded-lg p-5 sm:p-8 relative overflow-hidden">
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

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                {/* Quote */}
                <blockquote className="text-base sm:text-xl font-mono text-secondary mb-6 leading-relaxed">
                  &#34;{currentStory.quote}&#34;
                </blockquote>

                {/* Guest Info & Rating */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-secondary">
                          {currentStory.guestName}
                        </p>
                        {!currentStory.survived && (
                          <Skull className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-sm text-secondary/70">
                        Stayed at {currentStory.bunkerRef}
                      </p>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-0.5">
                    {renderStars(currentStory.rating)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <button
                onClick={goToPrev}
                className="pointer-events-auto bg-black/80 border border-secondary/50 rounded-full p-2 hover:bg-secondary/20 transition-colors"
                aria-label="Previous story"
              >
                <ChevronLeft className="h-5 w-5 text-secondary" />
              </button>
              <button
                onClick={goToNext}
                className="pointer-events-auto bg-black/80 border border-secondary/50 rounded-full p-2 hover:bg-secondary/20 transition-colors"
                aria-label="Next story"
              >
                <ChevronRight className="h-5 w-5 text-secondary" />
              </button>
            </div>

            {/* Indicator Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {guestStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-secondary w-8"
                      : "bg-secondary/30 w-2 hover:bg-secondary/50"
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Terminal glow effect */}
          <div className="absolute inset-0 -z-10 bg-secondary/10 blur-xl rounded-lg" />
        </div>
      </div>
    </section>
  );
}
