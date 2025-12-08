import { Badge } from "@/app/components/ui/badge";
import { cn, formatStatus } from "@/app/lib/utils";
import { HttpTypes } from "@medusajs/types";

type ProductStatus = HttpTypes.AdminProduct["status"];

const getStatusStyles = (status: ProductStatus): string => {
  switch (status) {
    case "published":
      // Green - active, live products
      return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800";
    case "draft":
      // Gray - work in progress
      return "bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700";
    case "proposed":
      // Blue - awaiting review/approval
      return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800";
    case "rejected":
      // Red - not approved
      return "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800";
    default:
      return "";
  }
};

export const ProductStatusBadge = ({ status }: { status: ProductStatus }) => {
  return (
    <Badge className={cn(getStatusStyles(status))}>
      {formatStatus(status)}
    </Badge>
  );
};
