"use client";

import { DeleteConfirmationDialog } from "@/app/(admin)/dashboard/components/shared/delete-confirmation-dialog";
import { useDeleteProduct } from "@/app/(admin)/modules/products/hooks/use-product-actions";
import { useGetProduct } from "@/app/(admin)/modules/products/hooks/use-product-queries";
import { ProductFormValues } from "@/app/(admin)/modules/products/schemas";
import { Button } from "@/app/components/ui/button";
import { HttpTypes } from "@medusajs/types";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ProductForm } from "../components/product-form";
import { ProductFormSkeleton } from "../components/product-form/skeleton";

interface ProductDetailsViewProps {
  productId: string;
}

/**
 * Transform a Medusa product to ProductFormValues
 */
const transformProductToFormValues = (
  product: HttpTypes.AdminProduct,
): Partial<ProductFormValues> => ({
  title: product.title || "",
  description: product.description || "",
  status: product.status || "draft",
  category: product.categories?.[0]?.id || "",
  shipping: {
    package: "",
    weight: product.weight ? Number(product.weight) : undefined,
  },
  media: product.images?.map((img) => img.url) || [],
  tags: product.tags?.map((tag) => tag.value) || [],
  options:
    product.options?.map((opt) => ({
      name: opt.title,
      values: opt.values?.map((v) => v.value) || [],
    })) || [],
  variants:
    product.variants?.map((variant) => {
      // Extract inventory data - variant.inventory is an array of inventory items
      const inventory = (variant as any).inventory;
      const inventoryItem = inventory?.[0];
      const locationLevel = inventoryItem?.location_levels?.[0];

      return {
        id: variant.id,
        title: variant.title || "",
        sku: variant.sku || "",
        options:
          variant.options?.reduce(
            (acc, opt) => ({
              ...acc,
              [opt.option?.title || ""]: opt.value,
            }),
            {} as Record<string, string>,
          ) || {},
        prices:
          variant.prices?.map((price) => ({
            currency_code: price.currency_code || "ngn",
            amount: price.amount || 0,
          })) || [],
        // Inventory tracking
        inventory_item_id: inventoryItem?.id,
        available: locationLevel?.stocked_quantity ?? 0,
        // Track if inventory level exists (needed for create vs update)
        has_inventory_level: !!locationLevel,
      };
    }) || [],
});

export const ProductDetailsView = ({ productId }: ProductDetailsViewProps) => {
  const router = useRouter();
  const { data, isLoading } = useGetProduct(productId, {
    fields:
      "*categories,*options,*options.values,*variants,*variants.options,*variants.prices,*variants.inventory,*variants.inventory.location_levels",
  });

  const deleteProductMutation = useDeleteProduct({
    onSuccess: () => {
      toast.success("Product deleted successfully");
      router.push("/dashboard/products");
    },
    onError: (error) => {
      toast.error(`Failed to delete product: ${error.message}`);
    },
  });

  if (isLoading) {
    return <ProductFormSkeleton />;
  }

  if (!data?.product) {
    return <div className="p-4">Product not found</div>;
  }

  const product = data.product;
  const initialValues = transformProductToFormValues(product);
  const enableVariantsInitially =
    (product.variants?.length || 0) > 1 || (product.options?.length || 0) > 0;

  const handleDeleteProduct = () => {
    deleteProductMutation.mutate(productId);
  };

  return (
    <div className="space-y-8">
      <ProductForm
        productId={productId}
        initialValues={initialValues}
        enableVariantsInitially={enableVariantsInitially}
      />

      <div className="border-t pt-4">
        <DeleteConfirmationDialog
          trigger={
            <Button
              variant="outline"
              className="border-destructive/80 text-destructive/80 hover:border-destructive hover:text-destructive w-full border hover:bg-transparent sm:w-auto"
            >
              <Trash2Icon />
              Delete product
            </Button>
          }
          title="Delete product?"
          description="This action cannot be undone. This will permanently delete this product and all its variants."
          onConfirm={handleDeleteProduct}
          isDeleting={deleteProductMutation.isPending}
        />
      </div>
    </div>
  );
};
