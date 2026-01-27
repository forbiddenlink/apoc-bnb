"use client";

import { useState } from "react";
import { Review } from "@/types";
import { ReviewCard } from "./ReviewCard";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ReviewsListProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export function ReviewsList({ reviews, averageRating, totalReviews }: ReviewsListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Star className="h-6 w-6 text-secondary fill-secondary" />
          <span className="text-3xl font-black">{averageRating.toFixed(2)}</span>
        </div>
        <div className="text-muted-foreground">
          <div className="font-bold text-foreground">{totalReviews} Reviews</div>
          <div className="text-xs">From verified survivors</div>
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

      {reviews.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No reviews yet. Be the first to survive and review!</p>
        </div>
      )}
    </div>
  );
}
