"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { ButtonGroup } from "@/app/components/ui/button-group";

type DataTablePaginationProps = {
  onPrevious?: () => void;
  onNext?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
};

export function DataTablePagination({
  onPrevious,
  onNext,
  previousDisabled,
  nextDisabled,
  currentPage = 0,
  pageSize = 50,
  totalItems = 0,
}: DataTablePaginationProps) {
  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalItems);

  return (
    <div className="flex w-full items-center justify-end gap-3">
      <span className="text-muted-foreground text-sm font-medium">
        {totalItems > 0
          ? `${startItem}-${endItem} of ${totalItems}`
          : "No items"}
      </span>
      <ButtonGroup>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={onPrevious}
          disabled={previousDisabled}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={onNext}
          disabled={nextDisabled}
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
