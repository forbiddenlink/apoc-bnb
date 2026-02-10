import Image from "next/image";
import { Review } from "@/types";
import { Star, ShieldCheck } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="p-4 bg-card rounded-lg border border-border hover:border-primary/20 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        {review.userAvatar ? (
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
            <Image
              src={review.userAvatar}
              alt={`${review.userName}'s avatar`}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
            {review.userName.slice(0, 2).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="font-bold text-foreground">{review.userName}</div>
            {review.verified && (
              <span title="Verified Stay">
                <ShieldCheck className="h-4 w-4 text-primary" aria-label="Verified Stay" />
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < review.rating ? 'text-secondary fill-secondary' : 'text-muted'
                  }`}
                />
              ))}
            </div>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
}
