"use client";

import { useSuspenseStoreConfig } from "@/app/modules/store/hooks/use-store-queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { regionQueries } from "../queries";

/**
 * Get a region by ID using suspense
 */
export const useSuspenseRegion = (regionId: string) => {
  return useSuspenseQuery(
    regionQueries.getSuspenseRegion.queryOptions(regionId),
  );
};

/**
 * Get the default region using the store's default_region_id
 * Combines store config query with region query
 */
export const useSuspenseDefaultRegion = () => {
  const { data: storeConfig } = useSuspenseStoreConfig();

  if (!storeConfig.default_region_id) {
    throw new Error("Store does not have a default region configured");
  }

  return useSuspenseQuery(
    regionQueries.getSuspenseRegion.queryOptions(storeConfig.default_region_id),
  );
};
