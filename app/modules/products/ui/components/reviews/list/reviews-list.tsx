"use client";

import { ReviewItem, type ReviewItemData } from "./review-item";

export function ReviewsList({ reviews }: { reviews: ReviewItemData[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((r) => (
        <ReviewItem key={r.id} review={r} />
      ))}
    </div>
  );
}


