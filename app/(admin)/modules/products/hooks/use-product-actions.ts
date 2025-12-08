"use client";

import {
  batchDeleteProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/app/(admin)/lib/api/products";
import { HttpTypes } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { productQueries } from "../queries";

// Mutation hooks
export const useUpdateProduct = (
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof updateProduct>>,
    Error,
    {
      productId: string;
      updates: HttpTypes.AdminUpdateProduct;
      query?: HttpTypes.SelectParams;
    },
    unknown
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: productQueries.getProduct.queryKey(variables.productId),
      });
      queryClient.invalidateQueries({
        queryKey: productQueries.listProducts.queryKey(),
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useCreateProduct = (
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof createProduct>>,
    Error,
    {
      product: HttpTypes.AdminCreateProduct;
      query?: HttpTypes.SelectParams;
    },
    unknown
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: productQueries.listProducts.queryKey(),
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useDeleteProduct = (
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteProduct>>,
    Error,
    string,
    unknown
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: productQueries.listProducts.queryKey(),
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useBatchDeleteProducts = (
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof batchDeleteProducts>>,
    Error,
    string[], // Array of product IDs
    unknown
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchDeleteProducts,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: productQueries.listProducts.queryKey(),
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
