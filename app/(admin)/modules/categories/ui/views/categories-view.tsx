"use client";

import { useListCategories } from "@/app/(admin)/modules/categories/hooks/use-category-queries";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { CategoriesTable } from "../components/categories-table";
import { CategoryTableRow } from "../components/categories-table/columns";

const PAGE_SIZE = 20;

export const CategoriesView = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data, isLoading } = useListCategories({
    q: debouncedSearchTerm || undefined,
    fields: "+products.id",
    limit: PAGE_SIZE,
    offset: currentPage * PAGE_SIZE,
  });

  const tableData: CategoryTableRow[] = useMemo(() => {
    if (!data?.product_categories) return [];
    return data.product_categories.map((category) => ({
      id: category.id,
      name: category.name,
      handle: category.handle,
      isActive: category.is_active,
      isInternal: category.is_internal,
      productCount: category.products?.length || 0,
    }));
  }, [data?.product_categories]);

  const totalItems = data?.count ?? 0;
  const hasNextPage = (currentPage + 1) * PAGE_SIZE < totalItems;
  const hasPreviousPage = currentPage > 0;

  return (
    <CategoriesTable
      data={tableData}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      totalItems={totalItems}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onNextPage={() => setCurrentPage((p) => p + 1)}
      onPreviousPage={() => setCurrentPage((p) => p - 1)}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      isLoading={isLoading}
    />
  );
};
