"use client";

import { Badge } from "@/app/components/ui/badge";
import { Stars } from "@/app/components/shared/stars";

export type ReviewItemData = {
  id: string;
  rating: number;
  title: string;
  body: string;
  author: { name: string; verified?: boolean };
  createdAt: string;
  helpfulCount: number;
};

export function ReviewItem({ review }: { review: ReviewItemData }) {
  return (
    <article className="rounded-lg border p-4">
      <header className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Stars value={review.rating} className="text-sm" />
          <span className="text-sm font-medium">{review.author.name}</span>
          {review.author.verified && <Badge variant="outline">Verified</Badge>}
        </div>
        <time className="text-muted-foreground text-xs">2 days ago</time>
      </header>
      <h4 className="font-medium">{review.title}</h4>
      <p className="text-muted-foreground text-sm">{review.body}</p>
    </article>
  );
}


