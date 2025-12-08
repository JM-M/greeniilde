"use client";

import {
  batchDeleteCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  updateCategoryProducts,
} from "@/app/(admin)/lib/api/categories";
import { productQueries } from "@/app/(admin)/modules/products/queries";
import { HttpTypes } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { categoryQueries } from "../queries";

export const useCreateCategory = (
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof createCategory>>,
    Error,
    HttpTypes.AdminCreateProductCategory,
    unknown
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: categoryQueries.listCategories.queryKey(),
      });
      options?.onSuccess?.(data, variables, context, undefined as any);
    },
  });
};

export const useUpdateCategory = (
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof updateCategory>>,
    Error,
    { categoryId: string; updates: HttpTypes.AdminUpdateProductCategory },
    unknown
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: categoryQueries.listCategories.queryKey(),
      });
      options?.onSuccess?.(data, variables, context, undefined as any);
    },
  });
};

export const useBatchDeleteCategories = (
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof batchDeleteCategories>>,
    Error,
    string[], // Array of category IDs
    unknown
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchDeleteCategories,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: categoryQueries.listCategories.queryKey(),
      });
      options?.onSuccess?.(data, variables, context, undefined as any);
    },
  });
};

export const useUpdateCategoryProducts = (
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof updateCategoryProducts>>,
    Error,
    {
      categoryId: string;
      updates: HttpTypes.AdminUpdateProductCategoryProducts;
    },
    unknown
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategoryProducts,
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate products list to reflect the category change
      queryClient.invalidateQueries({
        queryKey: productQueries.listProducts.queryKey(),
      });
      options?.onSuccess?.(data, variables, context, undefined as any);
    },
  });
};

export const useDeleteCategory = (
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteCategory>>,
    Error,
    string, // categoryId
    unknown
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: categoryQueries.listCategories.queryKey(),
      });
      options?.onSuccess?.(data, variables, context, undefined as any);
    },
  });
};
