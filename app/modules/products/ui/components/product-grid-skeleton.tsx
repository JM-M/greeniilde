import { ProductCardSkeleton } from "./product-card";

export const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} className="h-full" />
      ))}
    </div>
  );
};
