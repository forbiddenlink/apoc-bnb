"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ShieldCheck, X, Radiation, Target, Users, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Modal } from "@/components/ui/Modal";

// Common amenities for filtering
const COMMON_AMENITIES = [
  { id: "1", name: "Air Filtration", icon: "wind" },
  { id: "2", name: "Blast Doors", icon: "shield" },
  { id: "3", name: "Ham Radio", icon: "radio" },
  { id: "4", name: "Escape Tunnel", icon: "map" },
  { id: "5", name: "Hydroponic Garden", icon: "leaf" },
  { id: "6", name: "Armory Access", icon: "crosshair" },
];

export function FilterPanel() {
  const { searchFilters, updateSearchFilters, resetSearchFilters } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(searchFilters);

  // Sync tempFilters when searchFilters changes (e.g., after reset)
  useEffect(() => {
    setTempFilters(searchFilters);
  }, [searchFilters]);

  // Reset tempFilters when modal opens
  const handleOpen = () => {
    setTempFilters(searchFilters);
    setIsOpen(true);
  };

  const handleApply = () => {
    updateSearchFilters(tempFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    resetSearchFilters();
    // tempFilters will sync via useEffect on next render
    setIsOpen(false);
  };

  const activeFiltersCount = [
    searchFilters.radFree,
    searchFilters.minRating > 0,
    searchFilters.maxPrice < 2500,
    searchFilters.minPrice > 0,
    searchFilters.guests > 2,
    searchFilters.amenities.length > 0,
    searchFilters.location.length > 0,
    searchFilters.maxRadLevel < 10,
  ].filter(Boolean).length;

  return (
    <>
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 relative group hover:border-primary/50 transition-all"
          onClick={handleOpen}
        >
          <SlidersHorizontal className="h-3 w-3 group-hover:text-primary transition-colors" />
          <span className="hidden sm:inline">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-[0_0_10px_var(--primary)]">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        <div className="w-px bg-primary/20 h-6" />

        <Button
          variant={searchFilters.radFree ? "default" : "ghost"}
          size="sm"
          className={`group transition-all ${
            searchFilters.radFree
              ? "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_rgba(57,255,20,0.2)]"
              : "hover:border-primary/30"
          }`}
          onClick={() => updateSearchFilters({ radFree: !searchFilters.radFree })}
        >
          <ShieldCheck className={`h-3 w-3 mr-1 ${searchFilters.radFree ? 'animate-pulse' : ''}`} />
          <span className="hidden sm:inline">Rad-Free</span>
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-accent hover:text-accent hover:bg-accent/10 transition-all"
            onClick={handleReset}
          >
            <X className="h-3 w-3 sm:mr-1" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Mission Parameters" size="md">
        <div className="space-y-6">
          {/* Price Range */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-secondary" />
              <label className="text-label text-foreground">
                Price Range (CAPS/night)
              </label>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <input
                  type="number"
                  value={tempFilters.minPrice}
                  onChange={(e) => setTempFilters({ ...tempFilters, minPrice: parseInt(e.target.value) || 0 })}
                  className="w-full bg-black/50 border border-border rounded p-3 text-sm font-mono focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="MIN"
                />
              </div>
              <span className="text-primary font-mono">—</span>
              <div className="flex-1 relative">
                <input
                  type="number"
                  value={tempFilters.maxPrice}
                  onChange={(e) => setTempFilters({ ...tempFilters, maxPrice: parseInt(e.target.value) || 2500 })}
                  className="w-full bg-black/50 border border-border rounded p-3 text-sm font-mono focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="MAX"
                />
              </div>
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-secondary" />
              <label className="text-label text-foreground">
                Minimum Rating
              </label>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[0, 3, 4, 4.5, 4.8].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setTempFilters({ ...tempFilters, minRating: rating })}
                  className={`p-2 rounded border text-sm font-bold transition-all ${
                    tempFilters.minRating === rating
                      ? "border-primary bg-primary/10 text-primary shadow-[0_0_10px_rgba(57,255,20,0.2)]"
                      : "border-border hover:border-primary/50 bg-black/30"
                  }`}
                >
                  {rating === 0 ? "ANY" : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Radiation Level */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Radiation className="h-4 w-4 text-accent" />
              <label className="text-label text-foreground">
                Max Radiation Level
              </label>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="10"
                value={tempFilters.maxRadLevel}
                onChange={(e) => setTempFilters({ ...tempFilters, maxRadLevel: parseInt(e.target.value) })}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_10px_var(--primary)]"
              />
              {/* Radiation bar visual */}
              <div className="absolute top-0 left-0 right-0 h-2 rounded-full overflow-hidden pointer-events-none">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${tempFilters.maxRadLevel * 10}%`,
                    background: `linear-gradient(90deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)`
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between text-mono text-xs mt-2">
              <span className="text-primary">SAFE (0)</span>
              <span className={`font-bold ${
                tempFilters.maxRadLevel <= 3 ? 'text-primary' :
                tempFilters.maxRadLevel <= 6 ? 'text-secondary' : 'text-accent'
              }`}>
                LEVEL {tempFilters.maxRadLevel}
              </span>
              <span className="text-accent">LETHAL (10)</span>
            </div>
          </div>

          {/* Rad-Free Toggle */}
          <div className="flex items-center justify-between p-3 rounded border border-border bg-black/30">
            <div className="flex items-center gap-2">
              <ShieldCheck className={`h-4 w-4 ${tempFilters.radFree ? 'text-primary' : 'text-muted-foreground'}`} />
              <label className="text-sm font-bold text-foreground">
                Radiation-Free Only
              </label>
            </div>
            <button
              role="switch"
              aria-checked={tempFilters.radFree}
              aria-label="Toggle radiation-free only"
              onClick={() => setTempFilters({ ...tempFilters, radFree: !tempFilters.radFree })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
                tempFilters.radFree ? "bg-primary shadow-[0_0_10px_var(--primary)]" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  tempFilters.radFree ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Guests */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-secondary" />
              <label className="text-label text-foreground">
                Survivors Count
              </label>
            </div>
            <div className="flex items-center justify-center gap-6 p-4 rounded border border-border bg-black/30">
              <button
                onClick={() => setTempFilters({ ...tempFilters, guests: Math.max(1, tempFilters.guests - 1) })}
                className="h-10 w-10 rounded border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center font-bold text-lg transition-all"
              >
                −
              </button>
              <span className="text-3xl font-black text-primary w-12 text-center font-mono">{tempFilters.guests}</span>
              <button
                onClick={() => setTempFilters({ ...tempFilters, guests: Math.min(50, tempFilters.guests + 1) })}
                className="h-10 w-10 rounded border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center font-bold text-lg transition-all"
              >
                +
              </button>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="text-label text-foreground mb-3 block">
              Required Systems
            </label>
            <div className="grid grid-cols-2 gap-2">
              {COMMON_AMENITIES.map((amenity) => {
                const isSelected = tempFilters.amenities.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    onClick={() => {
                      const newAmenities = isSelected
                        ? tempFilters.amenities.filter(id => id !== amenity.id)
                        : [...tempFilters.amenities, amenity.id];
                      setTempFilters({ ...tempFilters, amenities: newAmenities });
                    }}
                    className={`p-3 rounded border text-sm font-medium transition-all text-left relative overflow-hidden ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 bg-black/30"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                    {amenity.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-primary/20">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-border hover:border-accent hover:text-accent"
              onClick={handleReset}
            >
              ABORT
            </Button>
            <Button
              variant="default"
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold relative overflow-hidden group"
              onClick={handleApply}
            >
              <span className="relative z-10">EXECUTE</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
