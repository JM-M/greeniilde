"use client";

import { listStockLocations } from "@/app/(admin)/lib/api/stock-locations";
import { createQuery } from "@/app/lib/query/create-query";
import { useQuery } from "@tanstack/react-query";

const stockLocationQueries = {
  list: createQuery(listStockLocations, ["stock-locations", "list"]),
};

/**
 * Hook to list stock locations
 */
export const useStockLocations = () => {
  return useQuery(stockLocationQueries.list.queryOptions());
};
