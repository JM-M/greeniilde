"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { storeQueries } from "../queries";

export const useStoreConfig = () => {
  return useQuery(storeQueries.getStoreConfig.queryOptions());
};

export const useSuspenseStoreConfig = () => {
  return useSuspenseQuery(storeQueries.getSuspenseStoreConfig.queryOptions());
};
