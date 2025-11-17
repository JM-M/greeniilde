"use client";

import { Button } from "@/app/components/ui/button";
import { Stars } from "@/app/components/shared/stars";

type ReviewsSummaryProps = {
  average: number;
  total: number;
  children?: React.ReactNode; // distribution slot
};

export function ReviewsSummary({ average, total, children }: ReviewsSummaryProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:flex-col">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <div className="text-3xl font-semibold">{average.toFixed(1)}</div>
          <div className="text-muted-foreground text-sm">{total} ratings</div>
          <Stars value={average} className="text-sm" />
        </div>
        <div className="grid grid-cols-1 gap-2 place-items-center">{children}</div>
      </div>
      <div className="flex justify-center gap-2">
        <Button variant="outline">Write a review</Button>
      </div>
    </div>
  );
}


