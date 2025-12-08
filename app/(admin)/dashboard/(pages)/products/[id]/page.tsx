import { ProductDetailsView } from "@/app/(admin)/modules/products/ui/views/product-details-view";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return <ProductDetailsView productId={id} />;
}
