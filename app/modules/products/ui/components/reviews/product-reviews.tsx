"use client";
import {
  useSuspenseGetProductReviews,
  useSuspenseGetProductReviewStats,
} from "../../../hooks/use-product-review-queries";
import { useProductDetailsContext } from "../../contexts/product-details-context";
import { ReviewsList } from "./list/reviews-list";
import { ReviewsDistribution } from "./summary/reviews-distribution";
import { ReviewsSummary } from "./summary/reviews-summary";

export function ProductReviews() {
  // Static placeholder content only
  const aggregate = { average: 4.6, total: 128 };
  const dist = [
    { star: 5, count: 92, pct: 72 },
    { star: 4, count: 22, pct: 17 },
    { star: 3, count: 8, pct: 6 },
    { star: 2, count: 4, pct: 3 },
    { star: 1, count: 2, pct: 2 },
  ];
  const reviews = [
    {
      id: "r1",
      rating: 5,
      title: "Great performance",
      body: "Exceeded expectations.",
      author: { name: "A. Patel", verified: true },
      createdAt: "2025-01-08",
      helpfulCount: 12,
    },
    {
      id: "r2",
      rating: 4,
      title: "Solid choice",
      body: "Install was smooth.",
      author: { name: "M. Chen" },
      createdAt: "2025-01-03",
      helpfulCount: 5,
    },
    {
      id: "r3",
      rating: 5,
      title: "Fantastic value",
      body: "Great quality for the price.",
      author: { name: "R. Gomez", verified: true },
      createdAt: "2025-01-02",
      helpfulCount: 8,
    },
    {
      id: "r4",
      rating: 3,
      title: "Works as expected",
      body: "Nothing fancy, but does the job.",
      author: { name: "K. Singh" },
      createdAt: "2024-12-28",
      helpfulCount: 2,
    },
    {
      id: "r5",
      rating: 4,
      title: "Good support",
      body: "Customer service helped with setup quickly.",
      author: { name: "E. Johnson", verified: true },
      createdAt: "2024-12-21",
      helpfulCount: 3,
    },
    {
      id: "r6",
      rating: 2,
      title: "Had some issues",
      body: "Needed replacement parts; resolved eventually.",
      author: { name: "T. Okafor" },
      createdAt: "2024-12-15",
      helpfulCount: 1,
    },
  ];

  const { product } = useProductDetailsContext();
  const productId = product?.id;

  const { data: reviewsData } = useSuspenseGetProductReviews(productId);
  const { data: statsData } = useSuspenseGetProductReviewStats(productId);

  console.log("product reviews: ", reviewsData);
  console.log("product review stats: ", statsData);

  if (!productId) return null;

  return (
    <div className="my-4 space-y-6">
      <ReviewsSummary average={aggregate.average} total={aggregate.total}>
        <ReviewsDistribution rows={dist} />
      </ReviewsSummary>
      <ReviewsList reviews={reviews} />
    </div>
  );
}
