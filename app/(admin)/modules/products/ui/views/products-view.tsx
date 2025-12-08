"use client";

import { useListProducts } from "@/app/(admin)/modules/products/hooks/use-product-queries";
import { useMemo, useState } from "react";
import { ProductsTable } from "../components/products-table";
import { ProductTableRow } from "../components/products-table/columns";

const PAGE_SIZE = 20;

export const ProductsView = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading } = useListProducts({
    fields: "*categories",
    limit: PAGE_SIZE,
    offset: currentPage * PAGE_SIZE,
  });

  const tableData: ProductTableRow[] = useMemo(() => {
    if (!data?.products) return [];
    return data.products.map((product) => ({
      id: product.id,
      title: product.title,
      status: product.status as ProductTableRow["status"],
      thumbnail: product.thumbnail,
      category: product.categories?.[0],
      variants: product.variants || [],
    }));
  }, [data?.products]);

  const totalItems = data?.count ?? 0;
  const hasNextPage = (currentPage + 1) * PAGE_SIZE < totalItems;
  const hasPreviousPage = currentPage > 0;

  if (isLoading) {
    return <div className="p-4">Loading products...</div>;
  }

  return (
    <ProductsTable
      data={tableData}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      totalItems={totalItems}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onNextPage={() => setCurrentPage((p) => p + 1)}
      onPreviousPage={() => setCurrentPage((p) => p - 1)}
    />
  );
};
