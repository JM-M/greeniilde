"use client";

import { AddProductsDialog } from "@/app/(admin)/dashboard/components/shared/add-products-dialog";
import { DataTable } from "@/app/(admin)/dashboard/components/shared/data-table";
import { Thumbnail } from "@/app/(admin)/dashboard/components/shared/thumbnail";
import { useUpdateCategoryProducts } from "@/app/(admin)/modules/categories/hooks/use-category-actions";
import { ProductStatusBadge } from "@/app/(admin)/modules/products/ui/components/product-status-badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { HttpTypes } from "@medusajs/types";
import { ColumnDef } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ProductRow = HttpTypes.AdminProduct;

const columns: ColumnDef<ProductRow>[] = [
  {
    accessorKey: "title",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;
      const numVariants = product.variants?.length || 0;
      return (
        <div className="flex items-center gap-2">
          <Thumbnail src={product.thumbnail} alt={product.title} />
          <div>
            <div className="font-medium">{product.title}</div>
            <div className="text-muted-foreground text-sm">
              {numVariants} variant{numVariants === 1 ? "" : "s"}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as
        | "draft"
        | "proposed"
        | "published"
        | "rejected";
      return <ProductStatusBadge status={status} />;
    },
  },
];

interface ProductsCardProps {
  categoryId: string;
  products: HttpTypes.AdminProduct[];
  isLoading?: boolean;
}

export const ProductsCard = ({
  categoryId,
  products,
  isLoading,
}: ProductsCardProps) => {
  const router = useRouter();

  const updateProductsMutation = useUpdateCategoryProducts({
    onSuccess: () => {
      toast.success("Products added to category");
    },
    onError: (error) => {
      toast.error(`Failed to add products: ${error.message}`);
    },
  });

  const handleAddProducts = (productIds: string[]) => {
    updateProductsMutation.mutate({
      categoryId,
      updates: { add: productIds },
    });
  };

  // Get IDs of already-added products to exclude from selection
  const existingProductIds = products.map((p) => p.id);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Products</CardTitle>
        <AddProductsDialog
          trigger={
            <Button size="sm">
              <PlusIcon className="size-4" /> Add product
            </Button>
          }
          onSave={handleAddProducts}
          isLoading={updateProductsMutation.isPending}
          excludeProductIds={existingProductIds}
        />
      </CardHeader>
      <CardContent>
        {products.length === 0 && !isLoading ? (
          <p className="text-muted-foreground text-sm">
            No products in this category
          </p>
        ) : (
          <DataTable
            columns={columns}
            data={products}
            isLoading={isLoading}
            getRowId={(row) => row.id}
            onRowClick={(row) =>
              router.push(`/dashboard/products/${row.original.id}`)
            }
            getRowClassName={() => "cursor-pointer"}
          />
        )}
      </CardContent>
    </Card>
  );
};
