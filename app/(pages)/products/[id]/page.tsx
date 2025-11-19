import { ProductDetailsView } from "@/app/modules/products/ui/views/product-details-view";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { id } = await params;
  return <ProductDetailsView productId={id} />;
};

export default ProductDetailsPage;
