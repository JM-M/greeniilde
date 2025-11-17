"use client";

import { Progress } from "@/app/components/ui/progress";

type Row = { star: number; count: number; pct: number };

export function ReviewsDistribution({ rows }: { rows: Row[] }) {
  return (
    <div className="space-y-2">
      {rows.map(({ star, pct, count }) => (
        <div key={star} className="flex items-center gap-2">
          <span className="w-8 text-right text-xs">{star}★</span>
          <div className="w-40 sm:w-56 md:w-64">
            <Progress value={pct} aria-label={`${pct}% ${star}-star`} />
          </div>
          <span className="text-muted-foreground w-10 text-xs">{count}</span>
        </div>
      ))}
    </div>
  );
}


