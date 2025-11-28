"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { Skeleton } from "@/app/components/ui/skeleton";
import { categoryQueries } from "@/app/modules/categories/queries";
import {
  buildCategoryTree,
  findCategoryPath,
} from "@/app/modules/categories/utils/category-utils";
import { HttpTypes } from "@medusajs/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Home } from "lucide-react";
import React, { useMemo } from "react";

interface ProductCategoryBreadcrumbProps {
  categories?: HttpTypes.StoreProductCategory[];
}

export const ProductCategoryBreadcrumb = ({
  categories,
}: ProductCategoryBreadcrumbProps) => {
  const { data } = useSuspenseQuery(
    categoryQueries.listCategories.queryOptions({}),
  );

  const breadcrumbPath = useMemo(() => {
    if (!categories || categories.length === 0 || !data.product_categories) {
      return null;
    }

    // Use the first category assigned to the product
    const targetCategoryId = categories[0].id;
    const tree = buildCategoryTree(data.product_categories);
    return findCategoryPath(tree, targetCategoryId);
  }, [categories, data.product_categories]);

  if (!breadcrumbPath) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="size-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbPath.map((category, index) => {
          const isLast = index === breadcrumbPath.length - 1;

          return (
            <React.Fragment key={category.id}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{category.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={`/products?categories=${category.id}`}>
                    {category.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const ProductCategoryBreadcrumbSkeleton = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <Skeleton className="h-4 w-16" />
        <Skeleton className="mx-2 h-4 w-1" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mx-2 h-4 w-1" />
        <Skeleton className="h-4 w-32" />
      </BreadcrumbList>
    </Breadcrumb>
  );
};
