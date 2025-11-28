import { submitReview } from "@/app/lib/api/product-reviews";
import { createMutationAction } from "@/app/lib/query/create-query";

// Create mutation utilities
const submitReviewMutation = createMutationAction(submitReview, [
  "products",
  "submitReview",
]);

// Export mutation utilities for easy access to mutation keys
// Usage: productMutations.submitReview.mutationKey()
export const productMutations = {
  submitReview: submitReviewMutation,
} as const;
