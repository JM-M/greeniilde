"use client";

import { productMutations } from "@/app/modules/products/mutations";
import { productQueries } from "@/app/modules/products/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useMutation(
    productMutations.submitReview.mutationOptions({
      onSuccess: (data, variables) => {
        // Invalidate product reviews to refetch the list
        queryClient.invalidateQueries({
          queryKey: productQueries.getProductReviews.queryKey(),
        });

        // Invalidate review stats
        queryClient.invalidateQueries({
          queryKey: productQueries.getProductReviewStats.queryKey(
            variables.productId,
          ),
        });

        if (data.success) {
          toast.success("Review submitted successfully!");
        } else {
          toast.error(data.error || "Failed to submit review");
        }
      },
      onError: (error) => {
        console.error("Failed to submit review:", error);
        toast.error("Failed to submit review. Please try again.");
      },
    }),
  );
};
