"use client";

import { ResponsiveDialog } from "@/app/components/shared/responsive-dialog";
import { Stars } from "@/app/components/shared/stars";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { useSubmitReview } from "../../../../hooks/use-product-mutations";
import { useVerifyUserPurchasedProduct } from "../../../../hooks/use-product-review-queries";
import type { ReviewItemData } from "../list/review-item";
import { ReviewForm, type ReviewFormValues } from "../review-form";

type ReviewsSummaryProps = {
  productId: string;
  average: number;
  total: number;
  children?: React.ReactNode; // distribution slot
  userReview?: ReviewItemData;
};

export function ReviewsSummary({
  productId,
  average,
  total,
  children,
  userReview,
}: ReviewsSummaryProps) {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const { data: verification } = useVerifyUserPurchasedProduct(productId);
  const { mutate: submitReview, isPending } = useSubmitReview();

  const handleReviewSubmit = (values: ReviewFormValues) => {
    submitReview(
      {
        productId,
        data: {
          rating: values.rating,
          comment: values.comment,
        },
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            setIsReviewDialogOpen(false);
          }
        },
      },
    );
  };

  const buttonText = userReview ? "Edit your review" : "Write a review";

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-col">
        {total > 0 && (
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <div className="text-3xl font-semibold">{average.toFixed(1)}</div>
              <div className="text-muted-foreground text-sm">
                {total} ratings
              </div>
              <Stars value={average} className="text-sm" />
            </div>
            <div className="grid grid-cols-1 place-items-center gap-2">
              {children}
            </div>
          </div>
        )}
        <div className="flex justify-center gap-2">
          {verification?.hasPurchased && (
            <Button
              variant="outline"
              onClick={() => setIsReviewDialogOpen(true)}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>

      <ResponsiveDialog
        open={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        title="Your review"
      >
        <ReviewForm
          onSubmit={handleReviewSubmit}
          onCancel={() => setIsReviewDialogOpen(false)}
          isLoading={isPending}
          initialValues={
            userReview
              ? {
                  rating: userReview.rating,
                  comment: userReview.body,
                }
              : undefined
          }
        />
      </ResponsiveDialog>
    </>
  );
}
