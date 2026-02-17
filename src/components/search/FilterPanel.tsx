"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ShieldCheck, X } from "lucide-react";
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
          className="gap-2 relative"
          onClick={handleOpen}
        >
          <SlidersHorizontal className="h-3 w-3" /> Filters
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        <div className="w-px bg-border h-6" />

        <Button
          variant={searchFilters.radFree ? "default" : "ghost"}
          size="sm"
          className={searchFilters.radFree ? "bg-primary/10 text-primary border border-primary/20" : ""}
          onClick={() => updateSearchFilters({ radFree: !searchFilters.radFree })}
        >
          <ShieldCheck className="h-3 w-3 mr-1" /> Rad-Free
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-accent"
            onClick={handleReset}
          >
            <X className="h-3 w-3 mr-1" /> Clear
          </Button>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Filters" size="md">
        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-3">
              Price Range (CAPS per night)
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                value={tempFilters.minPrice}
                onChange={(e) => setTempFilters({ ...tempFilters, minPrice: parseInt(e.target.value) || 0 })}
                className="flex-1 bg-background border border-border rounded p-2 text-sm"
                placeholder="Min"
              />
              <span className="text-muted-foreground">—</span>
              <input
                type="number"
                value={tempFilters.maxPrice}
                onChange={(e) => setTempFilters({ ...tempFilters, maxPrice: parseInt(e.target.value) || 2500 })}
                className="flex-1 bg-background border border-border rounded p-2 text-sm"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-3">
              Minimum Rating
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[0, 3, 4, 4.5, 4.8].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setTempFilters({ ...tempFilters, minRating: rating })}
                  className={`p-2 rounded border text-sm font-bold transition-all ${
                    tempFilters.minRating === rating
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {rating === 0 ? "Any" : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Radiation Level */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-3">
              Max Radiation Level
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={tempFilters.maxRadLevel}
              onChange={(e) => setTempFilters({ ...tempFilters, maxRadLevel: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Safe (0)</span>
              <span className="text-primary font-bold">{tempFilters.maxRadLevel}</span>
              <span>Lethal (10)</span>
            </div>
          </div>

          {/* Rad-Free Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-foreground">
              Radiation-Free Only
            </label>
            <button
              onClick={() => setTempFilters({ ...tempFilters, radFree: !tempFilters.radFree })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                tempFilters.radFree ? "bg-primary" : "bg-muted"
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
            <label className="block text-sm font-bold text-foreground mb-3">
              Number of Guests
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTempFilters({ ...tempFilters, guests: Math.max(1, tempFilters.guests - 1) })}
                className="h-10 w-10 rounded-full bg-muted hover:bg-primary hover:text-black flex items-center justify-center font-bold text-lg"
              >
                −
              </button>
              <span className="text-2xl font-bold">{tempFilters.guests}</span>
              <button
                onClick={() => setTempFilters({ ...tempFilters, guests: tempFilters.guests + 1 })}
                className="h-10 w-10 rounded-full bg-muted hover:bg-primary hover:text-black flex items-center justify-center font-bold text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-3">
              Required Amenities
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
                    className={`p-3 rounded border text-sm font-medium transition-all text-left ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {amenity.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button variant="outline" size="lg" className="flex-1" onClick={handleReset}>
              Reset All
            </Button>
            <Button variant="default" size="lg" className="flex-1" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
