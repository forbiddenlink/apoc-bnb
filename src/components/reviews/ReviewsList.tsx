"use client";

import { useState, useMemo } from "react";
import { Review } from "@/types";
import { ReviewCard } from "./ReviewCard";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown, Skull, AlertTriangle } from "lucide-react";

type SortOption = "newest" | "highest" | "critical";

interface ReviewsListProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

function RatingBreakdown({ reviews }: { reviews: Review[] }) {
  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        counts[review.rating as keyof typeof counts]++;
      }
    });
    return counts;
  }, [reviews]);

  const maxCount = Math.max(...Object.values(ratingCounts), 1);

  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = ratingCounts[rating as keyof typeof ratingCounts];
        const percentage = (count / maxCount) * 100;

        return (
          <div key={rating} className="flex items-center gap-2 text-sm">
            <span className="w-3 text-muted-foreground">{rating}</span>
            <Star className="h-3 w-3 text-secondary fill-secondary" />
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-6 text-right text-muted-foreground text-xs">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function ReviewsList({ reviews, averageRating, totalReviews }: ReviewsListProps) {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest First" },
    { value: "highest", label: "Highest Rated" },
    { value: "critical", label: "Most Critical" },
  ];

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case "highest":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "critical":
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted;
    }
  }, [reviews, sortBy]);

  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 6);

  if (reviews.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Skull className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">
          No Survivors Have Reviewed Yet
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Either this bunker is brand new, or everyone who stayed here is... unavailable for comment.
          Be the first to survive and tell the tale!
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="h-3 w-3" />
          <span>Reviews are accepted from verified survivors only</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Header with Rating Breakdown */}
      <div className="flex flex-col md:flex-row gap-6 pb-6 border-b border-border">
        {/* Left: Overall Rating */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-secondary fill-secondary" />
            <span className="text-3xl font-black">{averageRating.toFixed(2)}</span>
          </div>
          <div className="text-muted-foreground">
            <div className="font-bold text-foreground">{totalReviews} Reviews</div>
            <div className="text-xs">From verified survivors</div>
          </div>
        </div>

        {/* Right: Rating Breakdown */}
        <div className="flex-1 max-w-xs">
          <RatingBreakdown reviews={reviews} />
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {displayedReviews.length} of {reviews.length} reviews
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            className="flex items-center gap-2"
          >
            <span>{sortOptions.find(o => o.value === sortBy)?.label}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`} />
          </Button>

          {sortDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setSortDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-1 w-40 bg-card border border-border rounded-md shadow-lg z-20">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setSortDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-md last:rounded-b-md ${
                      sortBy === option.value ? 'text-primary font-medium' : 'text-foreground'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > 6 && (
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `Show All ${reviews.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
}
