"use client";
import {
  useGetUserProductReview,
  useSuspenseGetProductReviews,
  useSuspenseGetProductReviewStats,
} from "../../../hooks/use-product-review-queries";
import { useProductDetailsContext } from "../../contexts/product-details-context";
import { ReviewsList } from "./list/reviews-list";
import { ReviewsDistribution } from "./summary/reviews-distribution";
import { ReviewsSummary } from "./summary/reviews-summary";

export function ProductReviews() {
  const { product } = useProductDetailsContext();
  const productId = product?.id;

  const { data: reviewsData } = useSuspenseGetProductReviews(productId);
  const { data: statsData } = useSuspenseGetProductReviewStats(productId);

  const stats = statsData?.product_review_stats;
  const totalReviews = stats?.review_count || 0;
  const averageRating = stats?.average_rating || 0;

  // Transform backend distribution object to UI format
  // Backend returns { "5": 10, "4": 2 }
  // UI expects [{ star: 5, count: 10, pct: 83 }, ...]
  const dist = [5, 4, 3, 2, 1].map((star) => {
    const count = stats?.rating_distribution?.[star.toString()] || 0;
    const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { star, count, pct };
  });

  // Get the current user's review for this product (if they've purchased it)
  const { data: userReviewData } = useGetUserProductReview(productId);

  if (!productId) return null;

  // Get user's review ID if available
  const userReviewId = userReviewData?.product_reviews?.[0]?.id;

  // Extract user's review in ReviewItemData format for pre-filling form
  const userReview = userReviewData?.product_reviews?.[0]
    ? {
        id: userReviewData.product_reviews[0].id,
        rating: userReviewData.product_reviews[0].rating,
        body: userReviewData.product_reviews[0].content,
        author: {
          name: userReviewData.product_reviews[0].name || "Anonymous",
          verified: userReviewData.product_reviews[0].order_id ? true : false,
        },
        createdAt: userReviewData.product_reviews[0].created_at,
        helpfulCount: 0,
        isUserReview: true,
      }
    : undefined;

  // Map backend reviews to ReviewItemData format
  const reviews = (reviewsData?.product_reviews || [])
    .map((review: any) => ({
      id: review.id,
      rating: review.rating,
      body: review.content,
      author: {
        name: review.name || "Anonymous",
        verified: review.order_id ? true : false, // Has order_id means verified purchase
      },
      createdAt: review.created_at,
      helpfulCount: 0, // Backend doesn't track this yet
      isUserReview: review.id === userReviewId,
    }))
    .sort((a, b) => {
      // Sort user's review first
      if (a.isUserReview) return -1;
      if (b.isUserReview) return 1;
      return 0;
    });

  return (
    <div className="my-4 space-y-6">
      <ReviewsSummary
        productId={productId}
        userReview={userReview}
        average={averageRating}
        total={totalReviews}
      >
        <ReviewsDistribution rows={dist} />
      </ReviewsSummary>
      <ReviewsList reviews={reviews} />
    </div>
  );
}
