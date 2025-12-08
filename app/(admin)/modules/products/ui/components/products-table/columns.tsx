import { selectColumn } from "@/app/(admin)/dashboard/components/shared/data-table/columns";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { HttpTypes } from "@medusajs/types";
import { ColumnDef } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";
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
      const thumbnail = product.thumbnail;
      const title = product.title;
      const numVariants = product.variants?.length || 0;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="rounded-lg">
            <AvatarImage src={thumbnail || ""} className="rounded-lg" />
            <AvatarFallback className="rounded-lg">
              <ImageIcon
                strokeWidth={1}
                className="text-muted-foreground size-4"
              />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{title}</div>
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
