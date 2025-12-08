"use client";

import { DeleteConfirmationDialog } from "@/app/(admin)/dashboard/components/shared/delete-confirmation-dialog";
import { useAppBreadcrumbLabel } from "@/app/(admin)/dashboard/contexts/breadcrumb";
import { useDeleteCategory } from "@/app/(admin)/modules/categories/hooks/use-category-actions";
import { useGetCategory } from "@/app/(admin)/modules/categories/hooks/use-category-queries";
import { useListProducts } from "@/app/(admin)/modules/products/hooks/use-product-queries";
import { Button } from "@/app/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CategoryForm } from "../components/category-form";

interface CategoryDetailsViewProps {
  categoryId: string;
}

export const CategoryDetailsView = ({
  categoryId,
}: CategoryDetailsViewProps) => {
  const router = useRouter();
  const { data, isLoading } = useGetCategory(categoryId);

  const { data: productsData, isLoading: isLoadingProducts } = useListProducts(
    {
      category_id: [categoryId],
      fields: "id,title,thumbnail,status",
      limit: 50,
    },
    {
      enabled: Boolean(categoryId),
    },
  );
  const category = data?.product_category;

  useAppBreadcrumbLabel(categoryId, category?.name);

  const deleteCategoryMutation = useDeleteCategory({
    onSuccess: () => {
      toast.success("Category deleted successfully");
      router.push("/dashboard/categories");
    },
    onError: (error) => {
      toast.error(`Failed to delete category: ${error.message}`);
    },
  });

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!category) {
    return <div className="p-4">Category not found</div>;
  }

  const handleDeleteCategory = () => {
    deleteCategoryMutation.mutate(categoryId);
  };

  return (
    <div className="space-y-8">
      <CategoryForm
        categoryId={categoryId}
        initialValues={{
          name: category.name,
          handle: category.handle,
          description: category.description || "",
          isActive: category.is_active,
          isInternal: category.is_internal,
        }}
        products={productsData?.products || []}
        isLoadingProducts={isLoadingProducts}
      />

      <div className="border-t pt-4">
        <DeleteConfirmationDialog
          trigger={
            <Button
              variant="outline"
              className="border-destructive/80 text-destructive/80 hover:border-destructive hover:text-destructive w-full border hover:bg-transparent sm:w-auto"
            >
              <Trash2Icon />
              Delete category
            </Button>
          }
          title="Delete category?"
          description="This action cannot be undone. This will permanently delete this category."
          onConfirm={handleDeleteCategory}
          isDeleting={deleteCategoryMutation.isPending}
        />
      </div>
    </div>
  );
};
