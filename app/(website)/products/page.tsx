// E-commerce disabled: returning 404
// Original imports and content preserved below for re-enabling

import { notFound } from "next/navigation";

// import {
//   loadProductFilterParams,
//   loadProductSortParams,
// } from "@/app/modules/products/params";
// import { ProductsView } from "@/app/modules/products/ui/views/products-view";
// import { SearchParams } from "nuqs";

// interface ProductsPageProps {
//   searchParams: Promise<SearchParams>;
// }

// const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
//   const productFilterParams = await loadProductFilterParams(searchParams);
//   const productSortParams = await loadProductSortParams(searchParams);

//   return (
//     <ProductsView
//       productFilterParams={productFilterParams}
//       productSortParams={productSortParams}
//     />
//   );
// };

const ProductsPage = () => {
  notFound();
};

export default ProductsPage;
