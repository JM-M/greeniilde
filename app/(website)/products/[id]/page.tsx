// E-commerce disabled: returning 404
// Original imports and content preserved below for re-enabling

import { notFound } from "next/navigation";

// import { ProductDetailsView } from "@/app/modules/products/ui/views/product-details-view";

// interface ProductDetailsPageProps {
//   params: Promise<{ id: string }>;
// }

// const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
//   const { id } = await params;
//   return <ProductDetailsView productId={id} />;
// };

const ProductDetailsPage = () => {
  notFound();
};

export default ProductDetailsPage;
