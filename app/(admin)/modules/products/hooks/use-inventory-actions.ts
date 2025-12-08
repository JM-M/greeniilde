"use client";

import { batchInventoryItemsLocationLevels } from "@/app/(admin)/lib/api/inventory";
import { createMutationAction } from "@/app/lib/query/create-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productQueries } from "../queries";

const batchInventoryAction = createMutationAction(
  batchInventoryItemsLocationLevels,
  ["inventory", "batchLocationLevels"],
);

export const useBatchInventoryLevels = () => {
  const queryClient = useQueryClient();

  return useMutation(
    batchInventoryAction.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: productQueries.listProducts.queryKey(),
        });
      },
    }),
  );
};
