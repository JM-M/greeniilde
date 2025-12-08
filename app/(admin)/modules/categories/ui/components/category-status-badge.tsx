import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/lib/utils";

interface CategoryStatusBadgeProps {
  isActive: boolean;
}

export const CategoryStatusBadge = ({ isActive }: CategoryStatusBadgeProps) => {
  return (
    <Badge
      className={cn(
        isActive
          ? "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
          : "border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400",
      )}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
};

interface CategoryVisibilityBadgeProps {
  isInternal: boolean;
}

export const CategoryVisibilityBadge = ({
  isInternal,
}: CategoryVisibilityBadgeProps) => {
  const isPublic = !isInternal;
  return (
    <Badge
      className={cn(
        isPublic
          ? "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400"
          : "border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400",
      )}
    >
      {isPublic ? "Public" : "Private"}
    </Badge>
  );
};
