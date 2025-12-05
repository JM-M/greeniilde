import {
  loadProductFilterParams,
  loadProductSortParams,
} from "@/app/modules/products/params";
import { ProductsView } from "@/app/modules/products/ui/views/products-view";
import { SearchParams } from "nuqs";

interface ProductsPageProps {
  searchParams: Promise<SearchParams>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const productFilterParams = await loadProductFilterParams(searchParams);
  const productSortParams = await loadProductSortParams(searchParams);

  return (
    <ProductsView
      productFilterParams={productFilterParams}
      productSortParams={productSortParams}
    />
  );
};

export default ProductsPage;
