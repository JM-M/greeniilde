import { Checkbox } from "@/app/components/ui/checkbox";
import { Skeleton } from "@/app/components/ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";
import "./types"; // Import type augmentation

export const selectColumn = <TData,>(): ColumnDef<TData> => ({
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="cursor-pointer"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="cursor-pointer"
    />
  ),
  enableSorting: false,
  enableHiding: false,
  meta: {
    className: "w-7",
    skeleton: <Skeleton className="size-4 rounded" />,
  },
});
