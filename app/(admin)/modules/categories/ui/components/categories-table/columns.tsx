import { selectColumn } from "@/app/(admin)/dashboard/components/shared/data-table/columns";
import { ColumnDef } from "@tanstack/react-table";
import {
  CategoryStatusBadge,
  CategoryVisibilityBadge,
} from "../category-status-badge";

export type CategoryTableRow = {
  id: string;
  name: string;
  handle: string;
  isActive: boolean;
  isInternal: boolean;
  productCount: number;
};

export const columns: ColumnDef<CategoryTableRow>[] = [
  selectColumn<CategoryTableRow>(),
  {
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div>
          <div className="font-medium">{category.name}</div>
          <div className="text-muted-foreground text-sm">
            {category.productCount} product
            {category.productCount === 1 ? "" : "s"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "handle",
    header: "Handle",
    cell: ({ row }) => (
      <span className="text-muted-foreground">/{row.original.handle}</span>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => <CategoryStatusBadge isActive={row.original.isActive} />,
  },
  {
    accessorKey: "isInternal",
    header: "Visibility",
    cell: ({ row }) => (
      <CategoryVisibilityBadge isInternal={row.original.isInternal} />
    ),
  },
];
