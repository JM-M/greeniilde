import { ProductGrid } from "../components/product-grid";
import { ProductViewHeader } from "../components/product-view-header";

export const ProductsView = () => {
  return (
    <div className="view-container">
      <ProductViewHeader />
      <ProductGrid />
    </div>
  );
};
