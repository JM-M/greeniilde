"use client";

import { batchDeleteCategories } from "@/app/(admin)/lib/api/categories";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { categoryQueries } from "../queries";

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
      options?.onSuccess?.(data, variables, context);
    },
  });
};
