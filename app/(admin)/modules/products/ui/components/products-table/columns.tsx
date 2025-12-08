import { selectColumn } from "@/app/(admin)/dashboard/components/shared/data-table/columns";
import { Thumbnail } from "@/app/(admin)/dashboard/components/shared/thumbnail";
import { HttpTypes } from "@medusajs/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ProductStatusBadge } from "../product-status-badge";

export type ProductStatus = "draft" | "proposed" | "published" | "rejected";

export type ProductTableRow = {
  id: string;
  title: string;
  status: ProductStatus;
  thumbnail?: string | null;
  category?: HttpTypes.AdminProductCategory;
  variants: HttpTypes.AdminProductVariant[];
};

export const columns: ColumnDef<ProductTableRow>[] = [
  selectColumn<ProductTableRow>(),
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
      const status = row.original.status;
      return <ProductStatusBadge status={status} />;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      if (!category) return "--";
      return (
        <Link href={`/dashboard/categories/${category.id}`}>
          {category.name}
        </Link>
      );
    },
  },
];
