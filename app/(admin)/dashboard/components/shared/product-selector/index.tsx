"use client";

import { useInfiniteProducts } from "@/app/(admin)/modules/products/hooks/use-infinite-products";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { HttpTypes } from "@medusajs/types";
import { Loader2, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { ProductRow } from "./product-row";

interface ProductSelectorProps {
  /** Set of selected product IDs */
  value: Set<string>;
  /** Callback when selection changes */
  onChange: (value: Set<string>) => void;
  /** Optional list of product IDs to exclude from selection */
  excludeIds?: string[];
}

export function ProductSelector({
  value,
  onChange,
  excludeIds = [],
}: ProductSelectorProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const observerTarget = useRef<HTMLDivElement>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProducts({
      q: debouncedSearch || undefined,
      limit: 20,
      fields:
        "id,title,thumbnail,variants.id,variants.inventory_quantity,variants.prices.amount,variants.prices.currency_code",
    });

  const products = useMemo(() => {
    const allProducts = data?.products as HttpTypes.AdminProduct[] | undefined;
    if (!allProducts) return [];

    // Filter out excluded products
    if (excludeIds.length > 0) {
      return allProducts.filter((p) => !excludeIds.includes(p.id));
    }
    return allProducts;
  }, [data, excludeIds]);

  // Infinite scroll with IntersectionObserver
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const toggleProduct = (productId: string) => {
    const newSelected = new Set(value);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    onChange(newSelected);
  };

  return (
    <div className="bg-background w-full rounded-lg border">
      {/* Search Header */}
      <div className="border-b p-1.5">
        <InputGroup className="border-none shadow-none">
          <InputGroupAddon>
            <SearchIcon className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* Products Table */}
      <div className="max-h-[400px] overflow-y-auto">
        <Table>
          <TableHeader className="bg-muted/30 sticky top-0">
            <TableRow>
              <TableHead className="w-10" />
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Available</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <Loader2 className="text-muted-foreground mx-auto size-6 animate-spin" />
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground h-24 text-center"
                >
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  isSelected={value.has(product.id)}
                  onToggle={toggleProduct}
                />
              ))
            )}
          </TableBody>
        </Table>

        {/* Infinite Scroll Sentinel */}
        {hasNextPage && (
          <div
            ref={observerTarget}
            className="flex h-10 items-center justify-center"
          >
            {isFetchingNextPage && (
              <Loader2 className="text-muted-foreground size-4 animate-spin" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
