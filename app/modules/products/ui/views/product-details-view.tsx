import { ProductConfigurations } from "../components/product-configurations";
import { ProductDetailsTabs } from "../components/product-details-tabs";
import { ProductImagesCarousel } from "../components/product-images-carousel";
import { ProductInfo } from "../components/product-info";
import { ProductPurchaseControls } from "../components/product-purchase-controls";
import { SimilarProducts } from "../components/similar-products";

export const ProductDetailsView = () => {
  return (
    <div className="view-container">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <ProductImagesCarousel />
        </div>

        <div className="space-y-6 lg:sticky lg:top-24">
          <ProductInfo />
          <ProductConfigurations />
          <ProductPurchaseControls />
        </div>
      </div>

      <div className="mt-8">
        <ProductDetailsTabs />
      </div>

      <div className="mt-10">
        <SimilarProducts />
      </div>
    </div>
  );
};
