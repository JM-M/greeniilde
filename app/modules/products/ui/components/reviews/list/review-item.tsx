"use client";

import { Stars } from "@/app/components/shared/stars";
import { Badge } from "@/app/components/ui/badge";

export type ReviewItemData = {
  id: string;
  rating: number;
  body: string;
  author: { name: string; verified?: boolean };
  createdAt: string;
  helpfulCount: number;
  isUserReview?: boolean;
};

export function ReviewItem({ review }: { review: ReviewItemData }) {
  return (
    <article
      className={`rounded-lg border p-4 ${
        review.isUserReview ? "border-primary relative" : ""
      }`}
    >
      {review.isUserReview && (
        <Badge className="absolute top-0 right-4 -translate-y-1/2 px-2">
          Your review
        </Badge>
      )}
      <header className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Stars value={review.rating} className="text-sm" />
          <span className="text-sm font-medium">{review.author.name}</span>
          {review.author.verified && <Badge variant="outline">Verified</Badge>}
        </div>
        <time className="text-muted-foreground text-xs">2 days ago</time>
      </header>
      <p className="text-muted-foreground text-sm">{review.body}</p>
    </article>
  );
}
