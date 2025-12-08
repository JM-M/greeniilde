import { CategoryDetailsView } from "@/app/(admin)/modules/categories/ui/views/category-details-view";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CategoryDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return <CategoryDetailsView categoryId={id} />;
}
